import Link from "next/link";

const fields = [
  { color: "#97aaf6", title: "One account", body: "Fiat and crypto, one identity, one balance. No switching apps, no juggling wallets." },
  { color: "#bbf697", title: "Send money", body: "P2P, domestic, international. A unified ledger that records every move." },
  { color: "#fed878", title: "Cards", body: "Virtual and physical. Freeze, limits, merchant controls — in one tap." },
  { color: "#6ef8fb", title: "Crypto", body: "Buy, sell, swap, send, receive. Custodial wallet plus WalletConnect." },
];

export default function Home() {
  return (
    <div style={{ fontFamily: "var(--font-figtree), system-ui, sans-serif", background: "#f7f7f5", color: "#000" }}>
      <style>{`
        .spartan { font-family: var(--font-spartan), system-ui, sans-serif; font-weight: 700; letter-spacing: -0.04em; line-height: 0.88; }
        .hero-band { display: grid; grid-template-columns: repeat(6, 1fr); grid-template-rows: repeat(2, 1fr); height: 52vh; width: 100%; }
        .sheet { position: sticky; top: 0; min-height: 86vh; border-radius: 28px 28px 0 0; padding: 4rem 2rem; }
        @media (max-width: 768px) { .sheet { min-height: 70vh; padding: 2rem 1.25rem; } .hero-title { font-size: 13vw !important; } .grid4 { grid-template-columns: 1fr !important; } }
      `}</style>

      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 2rem", background: "#000", color: "#fff" }}>
        <div className="spartan" style={{ fontSize: "1.25rem" }}>Imperion</div>
        <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <a href="#features" style={{ color: "#fff", textDecoration: "none", fontSize: "0.95rem" }}>Features</a>
          <a href="#how" style={{ color: "#fff", textDecoration: "none", fontSize: "0.95rem" }}>How it works</a>
          <Link href="/login" style={{ color: "#d0106f", textDecoration: "none", fontSize: "0.95rem", fontWeight: 600 }}>Log in</Link>
        </nav>
      </header>

      <section style={{ background: "#f7f7f5" }}>
        <div className="hero-band">
          <div style={{ gridColumn: "1 / 3", gridRow: "1 / 3", background: "#97aaf6" }} />
          <div style={{ gridColumn: "3 / 5", gridRow: "1", overflow: "hidden" }}>
            <img src="https://picsum.photos/id/1015/800/400" alt="Mountain landscape" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1) contrast(1.05)" }} />
          </div>
          <div style={{ gridColumn: "5 / 6", gridRow: "1", background: "#bbf697" }} />
          <div style={{ gridColumn: "6 / 7", gridRow: "1 / 3", background: "#fed878" }} />
          <div style={{ gridColumn: "3 / 5", gridRow: "2", background: "#6ef8fb" }} />
          <div style={{ gridColumn: "5 / 6", gridRow: "2", overflow: "hidden" }}>
            <img src="https://picsum.photos/id/1016/400/400" alt="Lake and mountains" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1) contrast(1.05)" }} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "42% 1fr", gap: "0", padding: "2.75rem 2rem 4rem" }}>
          <div style={{ fontSize: "1.25rem", maxWidth: "30ch", lineHeight: 1.4 }}>
            One identity. One balance. Fiat and crypto, cards and crypto, in a single account.
          </div>
          <h1 className="spartan hero-title" style={{ fontSize: "clamp(64px, 8.3vw, 128px)", margin: 0 }}>
            Imperion
            <br />
            in one account.
          </h1>
        </div>

        <div style={{ padding: "0 2rem 4rem", display: "flex", gap: "1rem", alignItems: "center" }}>
          <Link href="/signup">
            <button style={{ background: "#d0106f", color: "#fff", border: "none", padding: "0.875rem 1.75rem", fontSize: "1rem", fontWeight: 600, cursor: "pointer" }}>
              Get started
            </button>
          </Link>
          <Link href="/login" style={{ color: "#d0106f", fontWeight: 600, textDecoration: "none" }}>Log in →</Link>
        </div>
      </section>

      <section id="features" style={{ background: "#f7f7f5", padding: "4rem 2rem 0" }}>
        <h2 className="spartan" style={{ fontSize: "clamp(40px, 5vw, 80px)", marginBottom: "3rem" }}>
          Built for how you actually move money.
        </h2>
        <div style={{ position: "relative" }}>
          {fields.map((f, i) => (
            <div key={f.title} className="sheet" style={{ background: f.color, color: "#000", top: `${i * 72}px`, zIndex: i + 1 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", height: "100%", alignItems: "end" }}>
                <div>
                  <h3 className="spartan" style={{ fontSize: "clamp(28px, 3vw, 44px)", margin: "0 0 1rem" }}>{f.title}</h3>
                  <p style={{ fontSize: "1.125rem", maxWidth: "40ch", lineHeight: 1.5 }}>{f.body}</p>
                </div>
                <div style={{ background: "rgba(0,0,0,0.08)", minHeight: "60%" }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="how" style={{ background: "#000", color: "#fff", padding: "6rem 2rem", minHeight: "80vh" }}>
        <h2 className="spartan" style={{ fontSize: "clamp(40px, 5vw, 80px)", marginBottom: "3rem", color: "#fff" }}>
          One account. Four steps.
        </h2>
        <div className="grid4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem" }}>
          {["Sign up", "Verify", "Deposit", "Spend"].map((s, i) => (
            <div key={s} style={{ borderTop: "2px solid #d0106f", paddingTop: "1.5rem" }}>
              <h3 className="spartan" style={{ fontSize: "1.5rem", margin: "0 0 0.5rem", color: "#fff" }}>{s}</h3>
              <p style={{ fontSize: "1rem", color: "#aaa", lineHeight: 1.5 }}>Step of the onboarding flow.</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "#d0106f", color: "#fff", padding: "6rem 2rem", textAlign: "center" }}>
        <h2 className="spartan" style={{ fontSize: "clamp(40px, 6vw, 96px)", margin: "0 0 1.5rem" }}>
          Start with Imperion.
        </h2>
        <p style={{ fontSize: "1.25rem", marginBottom: "2rem", opacity: 0.9 }}>Create your account in minutes.</p>
        <Link href="/signup">
          <button style={{ background: "#fff", color: "#d0106f", border: "none", padding: "1rem 2.5rem", fontSize: "1.125rem", fontWeight: 700, cursor: "pointer" }}>
            Create account
          </button>
        </Link>
      </section>

      <footer style={{ background: "#000", color: "#fff", padding: "3rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="spartan" style={{ fontSize: "2rem" }}>Imperion</div>
        <div style={{ fontSize: "0.875rem", color: "#888" }}>© 2026 Imperion. MIT License.</div>
      </footer>
    </div>
  );
}
