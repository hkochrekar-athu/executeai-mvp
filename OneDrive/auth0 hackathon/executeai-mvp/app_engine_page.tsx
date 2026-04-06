'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Stage = 1 | 2 | 3 | 4 | 5;

interface SprintDay {
  day: number;
  focus: string;
  tasks: string[];
}

interface SprintData {
  sprint: SprintDay[];
  warnings: string[];
  successMetrics: string[];
}

export default function ExecutionEngine() {
  const [stage, setStage] = useState<Stage>(1);
  const [idea, setIdea] = useState('');
  const [why, setWhy] = useState('');
  const [selectedPath, setSelectedPath] = useState<number | null>(null);
  const [sprintData, setSprintData] = useState<SprintData | null>(null);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90);
  const [aiClarification, setAiClarification] = useState('');

  useEffect(() => {
    if (stage !== 3) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (selectedPath === null) {
            setSelectedPath(0);
          }
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [stage, selectedPath]);

  const paths = [
    {
      title: 'MVP in 7 days',
      description: 'Build the minimum version that proves core value. Cut every feature that isn\'t essential.',
    },
    {
      title: 'Validate before building',
      description: 'Skip the build. Create landing page, run smoke test, get 50 email signups. Prove demand exists.',
    },
    {
      title: 'Partner-first launch',
      description: 'Find 3 users right now. Build only what they need. Co-create it with them over 7 days.',
    },
  ];

  const processIdea = () => {
    if (!idea.trim()) return;
    setAiClarification(
      `You said: "${idea}"\n\nNow tell me why this actually matters. Who is this for? What pain are you solving?`
    );
    setStage(2);
  };

  const processWhy = async () => {
    if (!why.trim()) return;
    setStage(3);
    setTimeLeft(90);
  };

  const lockPath = async () => {
    if (selectedPath === null) return;

    setLoading(true);
    setStage(4);

    try {
      const response = await fetch('/api/sprint/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idea,
          why,
          selectedPathIndex: selectedPath,
        }),
      });

      if (!response.ok) throw new Error('Failed to generate sprint');

      const data: SprintData = await response.json();
      setSprintData(data);

      setTimeout(() => {
        setStage(5);
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Sprint generation error:', error);
      setLoading(false);
      alert('Failed to generate sprint. Please try again.');
      setStage(3);
    }
  };

  const downloadSprint = () => {
    if (!sprintData) return;

    let content = `EXECUTION SPRINT - 7 DAYS\n\n`;
    content += `IDEA: ${idea}\n\n`;
    content += `WHY: ${why}\n\n`;
    content += `PATH: ${paths[selectedPath || 0].title}\n\n`;
    content += `SPRINT PLAN:\n\n`;

    sprintData.sprint.forEach((day) => {
      content += `DAY ${day.day}: ${day.focus}\n`;
      day.tasks.forEach((task) => {
        content += `  • ${task}\n`;
      });
      content += `\n`;
    });

    if (sprintData.warnings.length > 0) {
      content += `WARNINGS:\n`;
      sprintData.warnings.forEach((warning) => {
        content += `⚠️  ${warning}\n`;
      });
      content += `\n`;
    }

    content += `RULES:\n`;
    content += `• No new ideas until this sprint completes\n`;
    content += `• No pivoting mid-sprint\n`;
    content += `• Ship on day 7, no extensions\n`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `execution-sprint-${Date.now()}.txt`;
    a.click();
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f7f5f0' }}>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '1rem 3rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(13,15,20,0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: '1.2rem',
            fontWeight: 700,
            color: '#f7f5f0',
            textDecoration: 'none',
          }}
        >
          Execute<span style={{ color: '#667eea' }}>AI</span>
        </Link>
      </nav>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '100px 20px 20px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <div
          style={{
            background: 'white',
            borderRadius: '16px',
            maxWidth: '700px',
            width: '100%',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '32px',
            }}
          >
            <h1 style={{ fontSize: '28px', marginBottom: '8px', fontWeight: 600 }}>
              Execution Engine
            </h1>
            <p style={{ opacity: 0.9, fontSize: '15px' }}>
              Turn your idea into a 7-day sprint. No overthinking allowed.
            </p>
          </div>

          <div style={{ padding: '32px' }}>
            {/* Progress dots */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '32px',
              }}
            >
              {[1, 2, 3, 4, 5].map((dot) => (
                <div
                  key={dot}
                  style={{
                    height: '8px',
                    flex: 1,
                    background: dot <= stage ? '#667eea' : '#e2e8f0',
                    borderRadius: '4px',
                    transition: 'background 0.3s',
                  }}
                />
              ))}
            </div>

            {/* Stage 1: Idea Input */}
            {stage === 1 && (
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px', color: '#1a202c' }}>
                  What's the idea you keep putting off?
                </h2>
                <div
                  style={{
                    background: '#f7fafc',
                    borderLeft: '4px solid #667eea',
                    padding: '16px 20px',
                    marginBottom: '24px',
                    borderRadius: '8px',
                    fontSize: '15px',
                    lineHeight: '1.6',
                    color: '#2d3748',
                  }}
                >
                  Be specific — what are you actually trying to build or launch?
                </div>
                <textarea
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="e.g., A mobile app that helps freelancers track invoices..."
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '15px',
                    marginBottom: '16px',
                    minHeight: '120px',
                    fontFamily: 'inherit',
                  }}
                />
                <button
                  onClick={processIdea}
                  style={{
                    background: '#667eea',
                    color: 'white',
                    border: 'none',
                    padding: '14px 28px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    width: '100%',
                  }}
                >
                  Lock it in →
                </button>
              </div>
            )}

            {/* Stage 2: Why Input */}
            {stage === 2 && (
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px', color: '#1a202c' }}>
                  Why does this matter to you?
                </h2>
                <div
                  style={{
                    background: '#f7fafc',
                    borderLeft: '4px solid #667eea',
                    padding: '16px 20px',
                    marginBottom: '24px',
                    borderRadius: '8px',
                    fontSize: '15px',
                    lineHeight: '1.6',
                    color: '#2d3748',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {aiClarification}
                </div>
                <textarea
                  value={why}
                  onChange={(e) => setWhy(e.target.value)}
                  placeholder="What problem does this solve? Who needs this?"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '15px',
                    marginBottom: '16px',
                    minHeight: '120px',
                    fontFamily: 'inherit',
                  }}
                />
                <button
                  onClick={processWhy}
                  style={{
                    background: '#667eea',
                    color: 'white',
                    border: 'none',
                    padding: '14px 28px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    width: '100%',
                  }}
                >
                  Continue →
                </button>
              </div>
            )}

            {/* Stage 3: Path Selection */}
            {stage === 3 && (
              <div>
                <div
                  style={{
                    background: timeLeft <= 30 ? '#fc8181' : '#fed7d7',
                    color: '#9b2c2c',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    fontWeight: 600,
                    textAlign: 'center',
                    marginBottom: '20px',
                  }}
                >
                  ⏱ Decision in {timeLeft} seconds
                </div>
                <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px', color: '#1a202c' }}>
                  Choose your path.
                </h2>
                <div style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
                  {paths.map((path, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedPath(i)}
                      style={{
                        border:
                          selectedPath === i
                            ? '2px solid #667eea'
                            : '2px solid #e2e8f0',
                        borderRadius: '8px',
                        padding: '20px',
                        cursor: 'pointer',
                        background:
                          selectedPath === i ? '#eef2ff' : 'white',
                      }}
                    >
                      <h3 style={{ fontSize: '17px', marginBottom: '6px', color: '#1a202c' }}>
                        {path.title}
                      </h3>
                      <p style={{ fontSize: '14px', color: '#4a5568' }}>
                        {path.description}
                      </p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={lockPath}
                  disabled={selectedPath === null && timeLeft > 0}
                  style={{
                    background:
                      selectedPath === null && timeLeft > 0
                        ? '#cbd5e0'
                        : '#667eea',
                    color: 'white',
                    border: 'none',
                    padding: '14px 28px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor:
                      selectedPath === null && timeLeft > 0
                        ? 'not-allowed'
                        : 'pointer',
                    width: '100%',
                  }}
                >
                  Lock path →
                </button>
              </div>
            )}

            {/* Stage 4: Loading */}
            {stage === 4 && (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    border: '4px solid #e2e8f0',
                    borderTopColor: '#667eea',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                    margin: '0 auto 16px',
                  }}
                />
                <p style={{ color: '#4a5568' }}>
                  Generating your 7-day execution sprint...
                </p>
              </div>
            )}

            {/* Stage 5: Sprint Result */}
            {stage === 5 && sprintData && (
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px', color: '#1a202c' }}>
                  Your 7-day sprint is locked
                </h2>
                <div style={{ marginBottom: '24px' }}>
                  {sprintData.sprint.map((day) => (
                    <div
                      key={day.day}
                      style={{
                        border: '2px solid #e2e8f0',
                        borderRadius: '8px',
                        padding: '16px 20px',
                        marginBottom: '12px',
                      }}
                    >
                      <h3
                        style={{
                          fontSize: '16px',
                          marginBottom: '8px',
                          color: '#1a202c',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        <span
                          style={{
                            display: 'inline-block',
                            background: '#667eea',
                            color: 'white',
                            padding: '4px 10px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: 600,
                          }}
                        >
                          Day {day.day}
                        </span>
                        {day.focus}
                      </h3>
                      <ul
                        style={{
                          marginLeft: '20px',
                          color: '#4a5568',
                          fontSize: '14px',
                        }}
                      >
                        {day.tasks.map((task, i) => (
                          <li key={i}>{task}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <button
                  onClick={downloadSprint}
                  style={{
                    background: '#667eea',
                    color: 'white',
                    border: 'none',
                    padding: '14px 28px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    width: '100%',
                    marginTop: '20px',
                  }}
                >
                  Download sprint plan
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
