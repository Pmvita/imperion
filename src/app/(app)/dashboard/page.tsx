"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Dashboard() {
  const [balances, setBalances] = useState<any[]>([]);
  const [txs, setTxs] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [accounts, setAccounts] = useState<any[]>([]);

  useEffect(() => {
    const supabase = createClient();
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setName(user.user_metadata?.full_name || user.email || "");
      const { data: accs } = await supabase.from("accounts").select("*");
      setAccounts(accs || []);
      const ids = (accs || []).map((a: any) => a.id);
      if (ids.length) {
        const { data: bals } = await supabase.from("balances").select("*").in("account_id", ids);
        setBalances(bals || []);
        const { data: t } = await supabase.from("transactions").select("*").order("created_at", { ascending: false }).limit(10);
        setTxs(t || []);
      }
    })();
  }, []);

  const totalUsd = balances
    .filter((b) => b.currency === "USD" || b.currency === "USDC")
    .reduce((s, b) => s + Number(b.amount), 0);

  const fmt = (n: number) => n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ color: "#666662", fontSize: "1rem", marginBottom: "0.25rem" }}>Welcome back</p>
        <h1 className="spartan" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", margin: 0 }}>{name}</h1>
      </div>

      {/* Total balance hero */}
      <div style={{ background: "#97aaf6", border: "2px solid #000", padding: "2.5rem", marginBottom: "1.5rem" }}>
        <div style={{ fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem" }}>Total balance</div>
        <div className="spartan" style={{ fontSize: "clamp(3rem, 6vw, 5rem)", letterSpacing: "-0.04em", lineHeight: 0.9 }}>
          ${fmt(totalUsd)}
        </div>
        <div style={{ display: "flex", gap: "0.75rem", marginTop: "2rem", flexWrap: "wrap" }}>
          {["Send", "Request", "Deposit", "Withdraw"].map((a) => (
            <button key={a} style={{ background: "#000", color: "#fff", border: "none", padding: "0.75rem 1.5rem", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer" }}>
              {a}
            </button>
          ))}
        </div>
      </div>

      {/* Balances grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
        {balances.map((b, i) => {
          const colors = ["#bbf697", "#fed878", "#6ef8fb", "#97aaf6"];
          return (
            <div key={b.id} style={{ background: colors[i % colors.length], border: "2px solid #000", padding: "1.5rem" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 600, marginBottom: "0.5rem" }}>{b.currency}</div>
              <div className="spartan" style={{ fontSize: "1.75rem" }}>{Number(b.amount).toLocaleString(undefined, { maximumFractionDigits: 6 })}</div>
              <div style={{ fontSize: "0.75rem", marginTop: "0.5rem", opacity: 0.7 }}>
                {accounts.find((a) => a.id === b.account_id)?.type === "fiat" ? "Fiat" : "Crypto"}
              </div>
            </div>
          );
        })}
      </div>

      {/* Accounts */}
      <div style={{ background: "#fff", border: "2px solid #000", padding: "2rem", marginBottom: "1.5rem" }}>
        <h2 className="spartan" style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Accounts</h2>
        {accounts.map((a) => (
          <div key={a.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 0", borderBottom: "1px solid #ebebe8" }}>
            <div>
              <div style={{ fontWeight: 600 }}>{a.name}</div>
              <div style={{ fontSize: "0.8rem", color: "#666662" }}>{a.type} · {a.status}</div>
            </div>
            {a.account_number && (
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "#666662" }}>
                ••••{a.account_number.slice(-4)}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div style={{ background: "#fff", border: "2px solid #000", padding: "2rem" }}>
        <h2 className="spartan" style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Recent activity</h2>
        {txs.length === 0 && <p style={{ color: "#666662" }}>No transactions yet.</p>}
        {txs.map((t) => (
          <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 0", borderBottom: "1px solid #ebebe8" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ width: "40px", height: "40px", background: Number(t.amount) < 0 ? "#fed878" : "#bbf697", border: "2px solid #000", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                {Number(t.amount) < 0 ? "−" : "+"}
              </div>
              <div>
                <div style={{ fontWeight: 600 }}>{t.description || t.type}</div>
                <div style={{ fontSize: "0.8rem", color: "#666662" }}>{new Date(t.created_at).toLocaleString()}</div>
              </div>
            </div>
            <div className="spartan" style={{ color: Number(t.amount) < 0 ? "#ef4444" : "#22c55e" }}>
              {Number(t.amount) > 0 ? "+" : ""}{Number(t.amount).toLocaleString(undefined, { maximumFractionDigits: 4 })} {t.currency}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
