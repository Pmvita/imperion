import Link from "next/link";

export const metadata = { title: "Security — Imperion" };

export default function SecurityPage() {
  return (
    <div style={{ maxWidth: "720px", margin: "0 auto", padding: "2rem 1.5rem", lineHeight: 1.6 }}>
      <h1 className="spartan" style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>Security</h1>
      <p style={{ color: "var(--muted-foreground)", fontSize: "0.85rem", marginBottom: "1.5rem" }}>Last updated: 2026-11-06</p>
      <p>Imperion is a demo product. Authentication and data storage are provided by Supabase (Postgres with row-level security). Payments, if enabled, are processed by Stripe.</p>
      <h2 style={{ fontSize: "1.15rem", marginTop: "1.5rem" }}>Reporting vulnerabilities</h2>
      <p>If you find a security issue, please email <a href="mailto:security@imperion.app" style={{ color: "var(--accent)" }}>security@imperion.app</a>. Do not disclose publicly until we have had a chance to fix it.</p>
      <h2 style={{ fontSize: "1.15rem", marginTop: "1.5rem" }}>Data handling</h2>
      <p>Passwords are hashed by Supabase Auth. Sensitive data is transmitted over HTTPS. We do not store raw card numbers.</p>
      <div style={{ marginTop: "2rem" }}>
        <Link href="/dashboard" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>← Back to app</Link>
      </div>
    </div>
  );
}