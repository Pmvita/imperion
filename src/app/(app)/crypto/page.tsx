"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function CryptoPage() {
  const [balances, setBalances] = useState<any[]>([]);
  const [wallets, setWallets] = useState<any[]>([]);

  useEffect(() => {
    const supabase = createClient();
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: accs } = await supabase.from("accounts").select("id").eq("user_id", user.id).eq("type", "crypto").single();
      if (accs) {
        const { data: b } = await supabase.from("balances").select("*").eq("account_id", accs.id);
        setBalances(b || []);
      }
      const { data: w } = await supabase.from("wallets").select("*");
      setWallets(w || []);
    })();
  }, []);

  return (
    <div>
      <h1 className="spartan" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "2rem" }}>Crypto</h1>
      <div style={{ background: "#6ef8fb", border: "2px solid #000", padding: "2rem", marginBottom: "1.5rem" }}>
        <h2 className="spartan" style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Portfolio</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "0.75rem" }}>
          {balances.map((b) => (
            <div key={b.id} style={{ background: "#fff", border: "2px solid #000", padding: "1rem" }}>
              <div style={{ fontSize: "0.75rem", color: "#666662", marginBottom: "0.25rem" }}>{b.currency}</div>
              <div className="spartan" style={{ fontSize: "1.25rem" }}>{Number(b.amount).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: "#fff", border: "2px solid #000", padding: "2rem", marginBottom: "1.5rem" }}>
        <h2 className="spartan" style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Actions</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.75rem" }}>
          {["Buy", "Sell", "Swap", "Send"].map((a) => (
            <button key={a} style={{ background: "#f7f7f5", border: "2px solid #000", padding: "1.25rem", fontSize: "1rem", fontWeight: 600, cursor: "pointer" }}>{a}</button>
          ))}
        </div>
      </div>
      <div style={{ background: "#97aaf6", border: "2px solid #000", padding: "2rem" }}>
        <h2 className="spartan" style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Wallets</h2>
        {wallets.length === 0 && <p style={{ color: "#000", marginBottom: "1rem" }}>No external wallets connected.</p>}
        {wallets.map((w) => (
          <div key={w.id} style={{ display: "flex", justifyContent: "space-between", padding: "0.75rem 0", borderBottom: "1px solid rgba(0,0,0,0.15)" }}>
            <div>
              <div style={{ fontWeight: 600 }}>{w.label || w.chain}</div>
              <div style={{ fontSize: "0.8rem", fontFamily: "var(--font-mono)" }}>{w.address}</div>
            </div>
            <span style={{ fontSize: "0.8rem" }}>{w.chain}</span>
          </div>
        ))}
        <button style={{ marginTop: "1rem", background: "#000", color: "#fff", border: "none", padding: "0.75rem 1.25rem", fontWeight: 600, cursor: "pointer" }}>Connect wallet (WalletConnect)</button>
      </div>
    </div>
  );
}
