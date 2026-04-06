import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const { idea, why, selectedPathIndex } = await req.json();

    if (!idea || !why) {
      return NextResponse.json(
        { error: 'Idea and why are required' },
        { status: 400 }
      );
    }

    const systemPrompt = `You are an expert execution coach and product architect. Your job is to generate ultra-specific, actionable 7-day sprint plans.

Your output MUST be a JSON object with this exact structure:
{
  "sprint": [
    { "day": 1, "focus": "string", "tasks": ["task1", "task2", "task3"] },
    { "day": 2, "focus": "string", "tasks": ["task1", "task2"] },
    ...
    { "day": 7, "focus": "string", "tasks": ["task1", "task2", "task3"] }
  ],
  "warnings": ["warning1", "warning2"],
  "successMetrics": ["metric1", "metric2"]
}

Rules:
- Each day must have 2-4 specific, measurable tasks
- No fluff. Every task must be executable in 2-4 hours
- Day 7 is always "SHIP" - make it happen
- Be brutally honest about constraints`;

    const userPrompt = `Generate a 7-day sprint for this idea:

IDEA: ${idea}

WHY: ${why}

PATH APPROACH: ${
      ['Lean MVP build', 'Validation-first', 'Partner co-creation'][
        selectedPathIndex || 0
      ]
    }

Make this sprint achievable for ONE person in 7 days. Focus on speed over perfection.`;

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      system: systemPrompt,
    });

    const textContent = response.content[0];
    if (textContent.type !== 'text') {
      return NextResponse.json(
        { error: 'Unexpected response type from Claude' },
        { status: 500 }
      );
    }

    let sprintData;
    try {
      const jsonMatch = textContent.text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      sprintData = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error('Parse error:', parseError);
      sprintData = {
        sprint: generateFallbackSprint(),
        warnings: ['AI generation failed, using fallback sprint'],
        successMetrics: ['Launch on Day 7'],
      };
    }

    return NextResponse.json(sprintData);
  } catch (error) {
    console.error('Sprint generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate sprint' },
      { status: 500 }
    );
  }
}

function generateFallbackSprint() {
  return [
    {
      day: 1,
      focus: 'Define & wireframe',
      tasks: [
        'Write the ONE thing this does in one sentence',
        'Sketch the main user flow',
        'List the minimum features required',
      ],
    },
    {
      day: 2,
      focus: 'Build core',
      tasks: [
        'Set up development environment',
        'Build the main feature',
        'Get it working end-to-end',
      ],
    },
    {
      day: 3,
      focus: 'Test & iterate',
      tasks: [
        'Get one real user to test it',
        'Record their reaction',
        'Fix the top 3 friction points',
      ],
    },
    {
      day: 4,
      focus: 'Polish critical path',
      tasks: [
        'Make the happy path smooth',
        'Add basic error handling',
        'Create simple documentation',
      ],
    },
    {
      day: 5,
      focus: 'Prep for launch',
      tasks: [
        'Write launch post',
        'Create demo video or screenshots',
        'Set up landing page',
      ],
    },
    {
      day: 6,
      focus: 'Final checks',
      tasks: [
        'Test everything works',
        'Get feedback from 2 friends',
        'Make last-minute fixes',
      ],
    },
    {
      day: 7,
      focus: 'SHIP',
      tasks: [
        'Post to Product Hunt / Hacker News',
        'Share with your network',
        'Ship. No excuses. No extensions.',
      ],
    },
  ];
}
