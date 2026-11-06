"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Dashboard() {
  const [balances, setBalances] = useState<any[]>([]);
  const [txs, setTxs] = useState<any[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const supabase = createClient();
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setName(user.user_metadata?.full_name || user.email || "");
      const { data: accs } = await supabase.from("accounts").select("id,type");
      const ids = (accs || []).map((a: any) => a.id);
      if (ids.length) {
        const { data: bals } = await supabase.from("balances").select("*").in("account_id", ids);
        setBalances(bals || []);
        const { data: t } = await supabase.from("transactions").select("*").order("created_at", { ascending: false }).limit(8);
        setTxs(t || []);
      }
    })();
  }, []);

  const totalUsd = balances
    .filter((b) => b.currency === "USD" || b.currency === "USDC")
    .reduce((s, b) => s + Number(b.amount), 0);

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ color: "#666662", fontSize: "1rem", marginBottom: "0.25rem" }}>Welcome back</p>
        <h1 className="spartan" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", margin: 0 }}>{name}</h1>
      </div>

      <div style={{ background: "#97aaf6", border: "2px solid #000", padding: "2rem", marginBottom: "1.5rem" }}>
        <div style={{ fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem" }}>Total balance</div>
        <div className="spartan" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.04em" }}>
          ${totalUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "0.75rem", marginTop: "1.5rem" }}>
          {balances.map((b) => (
            <div key={b.id} style={{ background: "#fff", border: "2px solid #000", padding: "1rem" }}>
              <div style={{ fontSize: "0.75rem", color: "#666662", marginBottom: "0.25rem" }}>{b.currency}</div>
              <div className="spartan" style={{ fontSize: "1.25rem" }}>{Number(b.amount).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "#fff", border: "2px solid #000", padding: "2rem" }}>
        <h2 className="spartan" style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Recent activity</h2>
        {txs.length === 0 && <p style={{ color: "#666662" }}>No transactions yet.</p>}
        {txs.map((t) => (
          <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 0", borderBottom: "1px solid #ebebe8" }}>
            <div>
              <div style={{ fontWeight: 600 }}>{t.description || t.type}</div>
              <div style={{ fontSize: "0.8rem", color: "#666662" }}>{new Date(t.created_at).toLocaleString()}</div>
            </div>
            <div className="spartan" style={{ color: Number(t.amount) < 0 ? "#ef4444" : "#22c55e" }}>
              {Number(t.amount) > 0 ? "+" : ""}{t.amount} {t.currency}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
