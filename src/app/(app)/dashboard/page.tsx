"use client";
import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { ArrowUpRight, ArrowDownRight, Send, Plus } from "lucide-react";

type Balance = { id: string; account_id: string; currency: string; amount: number };
type Account = { id: string; name: string; type: string; status: string; account_number?: string };
type Tx = { id: string; amount: number; currency: string; description?: string; type: string; created_at: string };

const CUR_COLORS: Record<string, string> = {
  USD: "#97aaf6", USDC: "#6ef8fb", EUR: "#bbf697", GBP: "#fed878", BTC: "#f7931a", ETH: "#627eea",
};

function MiniArea({ values, color = "#d0106f" }: { values: number[]; color?: string }) {
  if (values.length < 2) return null;
  const w = 280, h = 64;
  const min = Math.min(...values), max = Math.max(...values);
  const range = max - min || 1;
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 6) - 3;
    return `${x},${y}`;
  });
  const line = `M ${pts.join(" L ")}`;
  const area = `${line} L ${w},${h} L 0,${h} Z`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: "block" }} aria-hidden>
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.18" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#g)" />
      <path d={line} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

export default function Dashboard() {
  const [balances, setBalances] = useState<Balance[]>([]);
  const [txs, setTxs] = useState<Tx[]>([]);
  const [name, setName] = useState("");
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    const supabase = createClient();
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setName(user.user_metadata?.full_name || user.email || "");
      const { data: accs } = await supabase.from("accounts").select("*");
      setAccounts(accs || []);
      const ids = (accs || []).map((a: Account) => a.id);
      if (ids.length) {
        const { data: bals } = await supabase.from("balances").select("*").in("account_id", ids);
        setBalances(bals || []);
        const { data: t } = await supabase.from("transactions").select("*").order("created_at", { ascending: false }).limit(12);
        setTxs(t || []);
      }
    })();
  }, []);

  const totalUsd = useMemo(
    () => balances.filter((b) => b.currency === "USD" || b.currency === "USDC").reduce((s, b) => s + Number(b.amount), 0),
    [balances]
  );

  const series = useMemo(() => {
    if (txs.length < 2) return Array(12).fill(totalUsd);
    const asc = [...txs].reverse();
    let running = totalUsd - asc.reduce((s, t) => s + Number(t.amount), 0);
    const pts: number[] = [];
    for (const t of asc) { running += Number(t.amount); pts.push(running); }
    while (pts.length < 12) pts.unshift(pts[0] ?? totalUsd);
    return pts.slice(-12);
  }, [txs, totalUsd]);

  const delta = series.length > 1 ? series[series.length - 1] - series[0] : 0;
  const deltaPct = series[0] ? (delta / series[0]) * 100 : 0;
  const fmt = (n: number) => n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const accountBal = (a: Account) =>
    balances.filter((b) => b.account_id === a.id).reduce((s, b) => s + Number(b.amount), 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
        <div>
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem", margin: 0 }}>Dashboard</p>
          <h1 className="spartan" style={{ fontSize: "1.75rem", margin: "0.25rem 0 0", letterSpacing: "-0.03em" }}>
            {name || "Your money"}
          </h1>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {["Send", "Request", "Deposit"].map((a) => (
            <button key={a} style={{ background: a === "Send" ? "#000" : "#fff", color: a === "Send" ? "#fff" : "#000", border: "1px solid #000", padding: "0.5rem 1rem", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", borderRadius: "6px" }}>
              {a}
            </button>
          ))}
        </div>
      </div>

      <div style={{ background: "#fff", border: "1px solid #000", padding: "1.5rem 1.75rem", borderRadius: "8px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1.5rem", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 260px", minWidth: 0 }}>
            <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Net worth</div>
            <div className="spartan" style={{ fontSize: "2.25rem", lineHeight: 1, marginTop: "0.5rem", letterSpacing: "-0.04em" }}>
              ${fmt(totalUsd)}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.6rem", fontSize: "0.85rem" }}>
              <span style={{ color: delta >= 0 ? "var(--success)" : "var(--danger)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "0.15rem" }}>
                {delta >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {delta >= 0 ? "+" : ""}{fmt(delta)} ({deltaPct.toFixed(2)}%)
              </span>
              <span style={{ color: "var(--muted-foreground)" }}>vs 30 days ago</span>
            </div>
          </div>
          <div style={{ flex: "0 0 auto" }}>
            <MiniArea values={series} color="#d0106f" />
            <div style={{ fontSize: "0.7rem", color: "var(--muted-foreground)", textAlign: "right", marginTop: "0.25rem" }}>30-day trend</div>
          </div>
        </div>
      </div>

      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
          <h2 className="spartan" style={{ fontSize: "1.1rem", margin: 0 }}>Accounts</h2>
          <button style={{ background: "transparent", border: "none", color: "var(--muted-foreground)", fontSize: "0.8rem", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
            <Plus size={14} /> Add
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.75rem" }}>
          {accounts.map((a) => {
            const b = balances.find((x) => x.account_id === a.id);
            const color = b ? (CUR_COLORS[b.currency] || "#97aaf6") : "#97aaf6";
            return (
              <div key={a.id} style={{ background: "#fff", border: "1px solid #000", borderRadius: "8px", padding: "1.1rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--muted-foreground)" }}>{a.name}</span>
                  <span style={{ fontSize: "0.7rem", padding: "0.15rem 0.5rem", borderRadius: "999px", background: a.status === "active" ? "#dcfae5" : "#f3f4f6", color: a.status === "active" ? "#04250e" : "#666", fontWeight: 500 }}>
                    {a.status}
                  </span>
                </div>
                <div className="spartan" style={{ fontSize: "1.35rem", letterSpacing: "-0.03em" }}>
                  {b ? `${Number(b.amount).toLocaleString(undefined, { maximumFractionDigits: 6 })} ${b.currency}` : "—"}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
                  <span style={{ textTransform: "capitalize" }}>{a.type}</span>
                  {a.account_number && <span style={{ fontFamily: "var(--font-mono)" }}>••••{a.account_number.slice(-4)}</span>}
                </div>
                <div style={{ height: "4px", background: "var(--muted)", borderRadius: "999px", overflow: "hidden" }}>
                  <div style={{ width: "60%", height: "100%", background: color, borderRadius: "999px" }} />
                </div>
              </div>
            );
          })}
          {accounts.length === 0 && (
            <div style={{ gridColumn: "1 / -1", border: "1px dashed #ccc", borderRadius: "8px", padding: "2rem", textAlign: "center", color: "var(--muted-foreground)", fontSize: "0.9rem" }}>
              No accounts yet. Add one to get started.
            </div>
          )}
        </div>
      </div>

      {balances.length > 0 && (
        <div>
          <h2 className="spartan" style={{ fontSize: "1.1rem", margin: "0 0 0.75rem" }}>Balances</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "0.75rem" }}>
            {balances.map((b) => {
              const color = CUR_COLORS[b.currency] || "#97aaf6";
              return (
                <div key={b.id} style={{ background: color, border: "1px solid #000", borderRadius: "8px", padding: "1rem 1.1rem" }}>
                  <div style={{ fontSize: "0.7rem", fontWeight: 600, marginBottom: "0.4rem", opacity: 0.8 }}>{b.currency}</div>
                  <div className="spartan" style={{ fontSize: "1.3rem", letterSpacing: "-0.02em" }}>
                    {Number(b.amount).toLocaleString(undefined, { maximumFractionDigits: 6 })}
                  </div>
                  <div style={{ fontSize: "0.7rem", marginTop: "0.4rem", opacity: 0.7 }}>
                    {accounts.find((a) => a.id === b.account_id)?.type === "fiat" ? "Fiat" : "Crypto"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div style={{ background: "#fff", border: "1px solid #000", borderRadius: "8px", overflow: "hidden" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.25rem", borderBottom: "1px solid var(--muted)" }}>
          <h2 className="spartan" style={{ fontSize: "1.1rem", margin: 0 }}>Recent activity</h2>
          <button style={{ background: "transparent", border: "none", color: "var(--muted-foreground)", fontSize: "0.8rem", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
            View all <ArrowUpRight size={13} />
          </button>
        </div>
        {txs.length === 0 && (
          <div style={{ padding: "2rem", textAlign: "center", color: "var(--muted-foreground)", fontSize: "0.9rem" }}>No transactions yet.</div>
        )}
        {txs.map((t, i) => (
          <div key={t.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.85rem 1.25rem", borderBottom: i < txs.length - 1 ? "1px solid var(--muted)" : "none", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", minWidth: 0 }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: Number(t.amount) < 0 ? "#ffedea" : "#dcfae5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: Number(t.amount) < 0 ? "#831c1e" : "#04250e" }}>
                {Number(t.amount) < 0 ? <ArrowDownRight size={16} /> : <ArrowUpRight size={16} />}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: "0.9rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.description || t.type}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{new Date(t.created_at).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</div>
              </div>
            </div>
            <div className="spartan num" style={{ color: Number(t.amount) < 0 ? "var(--danger)" : "var(--success)", textAlign: "right", whiteSpace: "nowrap", fontSize: "0.95rem" }}>
              {Number(t.amount) > 0 ? "+" : ""}{Number(t.amount).toLocaleString(undefined, { maximumFractionDigits: 4 })} {t.currency}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

