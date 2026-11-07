"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setErr(error.message);
    else router.push("/dashboard");
  }

  return (
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", background: "#f7f7f5" }}>
      {/* Left brand panel */}
      <div style={{ background: "#97aaf6", borderRight: "2px solid #000", padding: "3rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }} className="hidden md:flex">
        <div className="spartan" style={{ fontSize: "2rem" }}>Imperion</div>
        <div>
          <h2 className="spartan" style={{ fontSize: "clamp(2rem, 3vw, 3rem)", marginBottom: "1rem", lineHeight: 0.95 }}>
            Banking, payments, and crypto in one account.
          </h2>
          <p style={{ fontSize: "1.125rem", maxWidth: "40ch", lineHeight: 1.5 }}>
            One identity. One balance. Fiat and crypto, cards and crypto, in a single unified account.
          </p>
        </div>
        <div style={{ fontSize: "0.8rem", color: "#000", opacity: 0.7 }}>
          © 2026 Imperion. Secured by Supabase Auth.
        </div>
      </div>

      {/* Right form panel */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <form onSubmit={onSubmit} style={{ width: "100%", maxWidth: "400px" }}>
          <div className="spartan" style={{ fontSize: "2rem", marginBottom: "0.25rem" }}>Welcome back</div>
          <p style={{ color: "#666662", marginBottom: "2rem" }}>Sign in to your Imperion account.</p>

          <button type="button" style={{ width: "100%", background: "#000", color: "#fff", border: "2px solid #000", padding: "0.875rem", fontSize: "1rem", fontWeight: 600, cursor: "pointer", marginBottom: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
            Continue with Apple
          </button>
          <button type="button" style={{ width: "100%", background: "#fff", color: "#000", border: "2px solid #000", padding: "0.875rem", fontSize: "1rem", fontWeight: 600, cursor: "pointer", marginBottom: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
            Continue with Google
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ flex: 1, height: "1px", background: "#ebebe8" }} />
            <span style={{ fontSize: "0.8rem", color: "#666662" }}>or</span>
            <div style={{ flex: 1, height: "1px", background: "#ebebe8" }} />
          </div>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", border: "2px solid #000", padding: "0.875rem 1rem", fontSize: "1rem", marginBottom: "1rem", background: "#f7f7f5" }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", border: "2px solid #000", padding: "0.875rem 1rem", fontSize: "1rem", marginBottom: "0.5rem", background: "#f7f7f5" }}
            required
          />
          <div style={{ textAlign: "right", marginBottom: "1rem" }}>
            <a href="#" style={{ fontSize: "0.8rem", color: "#d0106f", fontWeight: 600 }}>Forgot password?</a>
          </div>
          {err && <p style={{ color: "#ef4444", fontSize: "0.875rem", marginBottom: "1rem" }}>{err}</p>}
          <button type="submit" disabled={loading} style={{ width: "100%", background: "#d0106f", color: "#fff", border: "none", padding: "0.875rem", fontSize: "1rem", fontWeight: 700, cursor: "pointer" }}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
          <p style={{ marginTop: "1.25rem", fontSize: "0.875rem", color: "#666662", textAlign: "center" }}>
            No account? <Link href="/signup" style={{ color: "#d0106f", fontWeight: 600 }}>Create one</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
