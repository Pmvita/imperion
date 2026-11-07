import Link from "next/link";

export const metadata = { title: "Terms of Service — Imperion" };

export default function TermsPage() {
  return (
    <div style={{ maxWidth: "720px", margin: "0 auto", padding: "2rem 1.5rem", lineHeight: 1.6 }}>
      <h1 className="spartan" style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>Terms of Service</h1>
      <p style={{ color: "var(--muted-foreground)", fontSize: "0.85rem", marginBottom: "1.5rem" }}>Last updated: 2026-11-06 · Demo/sandbox product</p>
      <p>Imperion is a demonstration banking application. Balances, accounts and transactions shown are sandbox data and do not represent real funds. No FDIC insurance, no real money movement, no real financial services are provided.</p>
      <h2 style={{ fontSize: "1.15rem", marginTop: "1.5rem" }}>Acceptable use</h2>
      <p>You may not use Imperion for fraud, money laundering, or any unlawful activity. You are responsible for keeping your credentials secure.</p>
      <h2 style={{ fontSize: "1.15rem", marginTop: "1.5rem" }}>Liability</h2>
      <p>Imperion is provided "as is" without warranty. We are not liable for losses arising from use of this demo.</p>
      <h2 style={{ fontSize: "1.15rem", marginTop: "1.5rem" }}>Changes</h2>
      <p>We may update these terms; continued use constitutes acceptance.</p>
      <div style={{ marginTop: "2rem" }}>
        <Link href="/dashboard" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>← Back to app</Link>
      </div>
    </div>
  );
}