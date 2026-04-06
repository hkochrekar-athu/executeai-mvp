import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import twilio from 'twilio';

const client = new Anthropic();
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const from = formData.get('From') as string;
    const messageBody = formData.get('Body') as string;

    if (!from || !messageBody) {
      return NextResponse.json(
        { error: 'Missing required WhatsApp message data' },
        { status: 400 }
      );
    }

    const coachingResponse = await generateCoachingResponse(messageBody);

    await twilioClient.messages.create({
      body: coachingResponse,
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: from,
    });

    return NextResponse.json({
      success: true,
      message: 'Coaching response sent',
    });
  } catch (error) {
    console.error('WhatsApp webhook error:', error);
    return NextResponse.json(
      { error: 'Failed to process WhatsApp message' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const verify_token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (verify_token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Verification failed' }, { status: 403 });
}

async function generateCoachingResponse(userMessage: string): Promise<string> {
  try {
    const systemPrompt = `You are an accountability coach running a 7-day execution sprint.

Your job:
1. Acknowledge their update briefly
2. Detect excuses and call them out
3. Give 1-2 specific next actions for today
4. Keep it under 150 words
5. Use friendly but direct language`;

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      messages: [
        {
          role: 'user',
          content: `Daily check-in: "${userMessage}"`,
        },
      ],
      system: systemPrompt,
    });

    const textContent = response.content[0];
    if (textContent.type !== 'text') {
      return "Keep shipping! What's your next move today?";
    }

    return textContent.text;
  } catch (error) {
    console.error('Claude coaching error:', error);
    return "Keep pushing! One step at a time. What's blocking you right now?";
  }
}
