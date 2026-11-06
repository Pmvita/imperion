"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SettingsPage() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const supabase = createClient();
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setEmail(user.email || "");
    })();
  }, []);

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  const items = ["Profile", "Security", "Device management", "Notifications", "Help & support", "Legal & privacy", "About"];

  return (
    <div>
      <h1 className="spartan" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "2rem" }}>Settings</h1>
      <div style={{ background: "#97aaf6", border: "2px solid #000", padding: "2rem", marginBottom: "1.5rem" }}>
        <h2 className="spartan" style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Account</h2>
        <p style={{ fontSize: "1rem" }}>{email}</p>
      </div>
      <div style={{ background: "#fff", border: "2px solid #000", padding: "2rem", marginBottom: "1.5rem" }}>
        <h2 className="spartan" style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Sections</h2>
        <div>
          {items.map((i) => (
            <button key={i} style={{ display: "flex", width: "100%", justifyContent: "space-between", padding: "1rem 0", background: "none", border: "none", borderBottom: "1px solid #ebebe8", cursor: "pointer", fontSize: "1rem", textAlign: "left" }}>
              <span>{i}</span>
              <span style={{ color: "#d0106f", fontWeight: 700 }}>→</span>
            </button>
          ))}
        </div>
      </div>
      <button onClick={signOut} style={{ background: "#ef4444", color: "#fff", border: "none", padding: "0.875rem 1.75rem", fontWeight: 700, cursor: "pointer" }}>Sign out</button>
    </div>
  );
}
