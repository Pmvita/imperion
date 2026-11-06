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
    <div style={{ minHeight: "100vh", background: "#f7f7f5", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
      <form onSubmit={onSubmit} style={{ width: "100%", maxWidth: "400px", background: "#fff", border: "2px solid #000", padding: "2.5rem" }}>
        <div className="spartan" style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Imperion</div>
        <h1 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1.5rem", color: "#666662" }}>Welcome back</h1>
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
          style={{ width: "100%", border: "2px solid #000", padding: "0.875rem 1rem", fontSize: "1rem", marginBottom: "1rem", background: "#f7f7f5" }}
          required
        />
        {err && <p style={{ color: "#ef4444", fontSize: "0.875rem", marginBottom: "1rem" }}>{err}</p>}
        <button type="submit" disabled={loading} style={{ width: "100%", background: "#d0106f", color: "#fff", border: "none", padding: "0.875rem", fontSize: "1rem", fontWeight: 700, cursor: "pointer" }}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
        <p style={{ marginTop: "1.25rem", fontSize: "0.875rem", color: "#666662" }}>
          No account? <Link href="/signup" style={{ color: "#d0106f", fontWeight: 600 }}>Sign up</Link>
        </p>
      </form>
    </div>
  );
}
