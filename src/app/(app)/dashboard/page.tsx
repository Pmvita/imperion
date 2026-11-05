"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardTitle } from "@/components/ui/card";
import { formatMoney } from "@/lib/utils";

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
    <div className="space-y-6">
      <div>
        <p className="text-muted-foreground text-sm">Welcome back</p>
        <h1 className="text-2xl font-bold">{name}</h1>
      </div>
      <Card>
        <CardTitle>Total balance</CardTitle>
        <div className="mt-2 text-4xl font-bold font-mono">{formatMoney(totalUsd)}</div>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {balances.map((b) => (
            <div key={b.id} className="rounded-lg bg-muted p-3">
              <div className="text-xs text-muted-foreground">{b.currency}</div>
              <div className="font-mono font-semibold">{Number(b.amount).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <CardTitle>Recent activity</CardTitle>
        <div className="mt-3 space-y-2">
          {txs.length === 0 && <p className="text-sm text-muted-foreground">No transactions yet.</p>}
          {txs.map((t) => (
            <div key={t.id} className="flex items-center justify-between border-b border-border py-2 last:border-0">
              <div>
                <div className="text-sm font-medium">{t.description || t.type}</div>
                <div className="text-xs text-muted-foreground">{new Date(t.created_at).toLocaleString()}</div>
              </div>
              <div className={`font-mono text-sm ${Number(t.amount) < 0 ? "text-danger" : "text-success"}`}>
                {Number(t.amount) > 0 ? "+" : ""}{t.amount} {t.currency}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}