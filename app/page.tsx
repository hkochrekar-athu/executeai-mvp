import Link from 'next/link';

export default function Home() {
  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '1rem 3rem',
        display: 'flex',
        justifyContent: 'space-between',
        background: '#0d0f14',
        color: '#f7f5f0',
        zIndex: 100
      }}>
        <div style={{ fontWeight: 'bold' }}>
          Execute<span style={{ color: '#667eea' }}>AI</span>
        </div>

        <div>
          <Link href="/engine" style={{
            background: '#667eea',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            color: 'white',
            textDecoration: 'none'
          }}>
            Start Free Sprint
          </Link>
        </div>
      </nav>

      <main style={{
        minHeight: '100vh',
        padding: '6rem 2rem',
        background: '#0d0f14',
        color: '#f7f5f0',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '3rem',
          marginBottom: '1rem'
        }}>
          Turn your idea into a <span style={{ color: '#667eea' }}>shipped product</span> in 7 days.
        </h1>

        <p style={{
          maxWidth: '600px',
          margin: '0 auto 2rem',
          opacity: 0.7
        }}>
          ExecuteAI forces you to commit, execute, and ship. No more unfinished ideas.
        </p>

        <Link href="/engine" style={{
          background: '#667eea',
          padding: '1rem 2rem',
          borderRadius: '8px',
          color: 'white',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}>
          Start Free Sprint
        </Link>
      </main>

      <footer style={{
        textAlign: 'center',
        padding: '2rem',
        opacity: 0.5,
        fontSize: '0.8rem'
      }}>
        © 2026 ExecuteAI
      </footer>
    </>
  );
}