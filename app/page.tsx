import Link from 'next/link';

export default function Home() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>ExecuteAI — Turn Ideas Into Launches in 7 Days</title>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
        <style>{`
          :root{--ink:#0d0f14;--paper:#f7f5f0;--sage:#7a9e7e;--gold:#c9a84c;--midnight:#1a1f2e;--accent:#d4a853;--purple:#667eea;--green:#28c840;}
          *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
          html{scroll-behavior:smooth;}
          body{font-family:'DM Sans',sans-serif;background:var(--ink);color:var(--paper);overflow-x:hidden;}
          a{text-decoration:none;}
          nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:1rem 3rem;display:flex;align-items:center;justify-content:space-between;background:rgba(13,15,20,0.95);backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,0.06);}
          .nav-logo{font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:700;color:var(--paper);}
          .nav-logo span{color:var(--purple);}
          .nav-links{display:flex;gap:2rem;align-items:center;}
          .nav-link{font-size:0.85rem;color:rgba(247,245,240,0.6);transition:color 0.3s;}
          .nav-link:hover{color:var(--purple);}
          .nav-cta{background:var(--purple);color:white;padding:0.6rem 1.2rem;border-radius:6px;font-size:0.85rem;font-weight:600;transition:all 0.3s;}
          .nav-cta:hover{background:#5568d3;transform:translateY(-1px);}
          .hero{min-height:100vh;display:flex;align-items:center;padding:6rem 3rem 4rem;position:relative;background:var(--ink);overflow:hidden;}
          .hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 70% 60% at 65% 45%,rgba(102,126,234,0.15) 0%,transparent 65%),radial-gradient(ellipse 40% 50% at 20% 70%,rgba(201,168,76,0.08) 0%,transparent 55%);pointer-events:none;}
          .hero-inner{max-width:1200px;margin:0 auto;text-align:center;position:relative;z-index:1;}
          .badge{display:inline-flex;align-items:center;gap:0.5rem;font-family:'Space Mono',monospace;font-size:0.68rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--purple);border:1px solid rgba(102,126,234,0.3);padding:0.3rem 0.8rem;border-radius:2px;margin-bottom:1.5rem;background:rgba(102,126,234,0.06);}
          h1{font-family:'Playfair Display',serif;font-size:clamp(2.8rem,5vw,4.5rem);font-weight:900;line-height:1.05;letter-spacing:-0.03em;margin-bottom:1.2rem;}
          h1 em{font-style:italic;color:var(--purple);}
          .hero-desc{font-size:1.15rem;line-height:1.75;color:rgba(247,245,240,0.65);margin-bottom:2.5rem;max-width:680px;margin-left:auto;margin-right:auto;}
          .cta-row{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-bottom:3rem;}
          .btn-primary{background:var(--purple);color:white;padding:1rem 2.5rem;font-family:'DM Sans',sans-serif;font-size:0.95rem;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;border:none;cursor:pointer;border-radius:8px;transition:all 0.3s;}
          .btn-primary:hover{background:#5568d3;transform:translateY(-2px);box-shadow:0 12px 40px rgba(102,126,234,0.4);}
          .btn-secondary{background:transparent;color:var(--paper);padding:1rem 2.5rem;font-size:0.95rem;font-weight:600;border:1px solid rgba(247,245,240,0.2);border-radius:8px;transition:all 0.3s;}
          .btn-secondary:hover{border-color:var(--purple);color:var(--purple);}
          .stats-row{display:flex;gap:3rem;justify-content:center;margin-top:4rem;}
          .stat{text-align:center;}
          .stat-number{font-family:'Playfair Display',serif;font-size:2.5rem;font-weight:900;color:var(--purple);display:block;margin-bottom:0.3rem;}
          .stat-label{font-size:0.8rem;color:rgba(247,245,240,0.45);text-transform:uppercase;letter-spacing:0.1em;}
          footer{background:rgba(13,15,20,0.9);border-top:1px solid rgba(255,255,255,0.06);padding:3rem;text-align:center;}
          .footer-copy{font-size:0.8rem;color:rgba(247,245,240,0.25);margin-top:1.5rem;}
        `}</style>
      </head>
      <body>
        <nav>
          <div className="nav-logo">Execute<span>AI</span></div>
          <div className="nav-links">
            <a href="#how" className="nav-link">How It Works</a>
            <a href="/engine" className="nav-cta">Start Free Sprint</a>
          </div>
        </nav>

        <section className="hero">
          <div className="hero-inner">
            <div className="badge">🚀 AI-POWERED EXECUTION</div>
            <h1>Turn your idea into a <em>shipped product</em> in 7 days.</h1>
            <p className="hero-desc">
              No more idea graveyard. ExecuteAI forces you to commit, pick a path, execute relentlessly, and ship by Day 7. Daily AI check-ins catch your excuses. Sprint lock prevents pivoting.
            </p>
            <div className="cta-row">
              <Link href="/engine" className="btn-primary">Start Free Sprint</Link>
            </div>
            <div className="stats-row">
              <div className="stat">
                <span className="stat-number">7</span>
                <span className="stat-label">Days to Launch</span>
              </div>
              <div className="stat">
                <span className="stat-number">1</span>
                <span className="stat-label">Path to Execute</span>
              </div>
              <div className="stat">
                <span className="stat-number">∞</span>
                <span className="stat-label">No Extensions</span>
              </div>
            </div>
          </div>
        </section>

        <footer>
          <p className="footer-copy">© 2026 ExecuteAI · Built for founders who ship · Powered by Claude</p>
        </footer>
      </body>
    </html>
  );
}
