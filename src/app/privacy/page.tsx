import Link from "next/link";

export const metadata = { title: "Privacy Policy — Imperion" };

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: "720px", margin: "0 auto", padding: "2rem 1.5rem", lineHeight: 1.6 }}>
      <h1 className="spartan" style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>Privacy Policy</h1>
      <p style={{ color: "var(--muted-foreground)", fontSize: "0.85rem", marginBottom: "1.5rem" }}>Last updated: 2026-11-06</p>
      <p>We collect only what is needed to run your account: email, name, and the financial records you create. Data is stored in Supabase (Postgres) and is not sold or shared with third parties.</p>
      <h2 style={{ fontSize: "1.15rem", marginTop: "1.5rem" }}>Your rights</h2>
      <p>You may request deletion of your account and all associated data at any time by contacting support.</p>
      <h2 style={{ fontSize: "1.15rem", marginTop: "1.5rem" }}>Cookies</h2>
      <p>We use only essential session cookies for authentication. No tracking or advertising cookies are set.</p>
      <h2 style={{ fontSize: "1.15rem", marginTop: "1.5rem" }}>Security</h2>
      <p>See our <Link href="/security" style={{ color: "var(--accent)" }}>security page</Link> for details on how data is protected.</p>
      <div style={{ marginTop: "2rem" }}>
        <Link href="/dashboard" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>← Back to app</Link>
      </div>
    </div>
  );
}