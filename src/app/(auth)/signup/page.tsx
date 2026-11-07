"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr("");
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });
    setLoading(false);
    if (error) setErr(error.message);
    else router.push("/dashboard");
  }

  return (
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", background: "#f7f7f5" }}>
      <div style={{ background: "#bbf697", borderRight: "2px solid #000", padding: "3rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }} className="hidden md:flex">
        <div className="spartan" style={{ fontSize: "2rem" }}>Imperion</div>
        <div>
          <h2 className="spartan" style={{ fontSize: "clamp(2rem, 3vw, 3rem)", marginBottom: "1rem", lineHeight: 0.95 }}>
            Create your unified account.
          </h2>
          <p style={{ fontSize: "1.125rem", maxWidth: "40ch", lineHeight: 1.5 }}>
            Fiat and crypto, cards and crypto, in minutes. No credit check, no fees to open.
          </p>
        </div>
        <div style={{ fontSize: "0.8rem", color: "#000", opacity: 0.7 }}>
          © 2026 Imperion. Secured by Supabase Auth.
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <form onSubmit={onSubmit} style={{ width: "100%", maxWidth: "400px" }}>
          <div className="spartan" style={{ fontSize: "2rem", marginBottom: "0.25rem" }}>Create account</div>
          <p style={{ color: "#666662", marginBottom: "2rem" }}>Start banking, payments, and crypto today.</p>

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
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", border: "2px solid #000", padding: "0.875rem 1rem", fontSize: "1rem", marginBottom: "1rem", background: "#f7f7f5" }}
            required
          />
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
            placeholder="Password (min 8 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", border: "2px solid #000", padding: "0.875rem 1rem", fontSize: "1rem", marginBottom: "1rem", background: "#f7f7f5" }}
            required
            minLength={8}
          />
          {err && <p style={{ color: "#ef4444", fontSize: "0.875rem", marginBottom: "1rem" }}>{err}</p>}
          <button type="submit" disabled={loading} style={{ width: "100%", background: "#d0106f", color: "#fff", border: "none", padding: "0.875rem", fontSize: "1rem", fontWeight: 700, cursor: "pointer" }}>
            {loading ? "Creating..." : "Create account"}
          </button>
          <p style={{ marginTop: "1.25rem", fontSize: "0.875rem", color: "#666662", textAlign: "center" }}>
            Have an account? <Link href="/login" style={{ color: "#d0106f", fontWeight: 600 }}>Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
