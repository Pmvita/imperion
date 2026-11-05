"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Crypto</h1>
      <Card>
        <CardTitle>Portfolio</CardTitle>
        <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
          {balances.map((b) => (
            <div key={b.id} className="rounded-lg bg-muted p-3">
              <div className="text-xs text-muted-foreground">{b.currency}</div>
              <div className="font-mono font-semibold">{Number(b.amount).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <CardTitle>Actions</CardTitle>
        <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
          {["Buy", "Sell", "Swap", "Send"].map((a) => (
            <button key={a} className="rounded-lg bg-muted p-4 text-sm font-medium hover:bg-muted/70">{a}</button>
          ))}
        </div>
      </Card>
      <Card>
        <CardTitle>Wallets</CardTitle>
        <div className="mt-3 space-y-2">
          {wallets.length === 0 && <p className="text-sm text-muted-foreground">No external wallets connected.</p>}
          {wallets.map((w) => (
            <div key={w.id} className="flex items-center justify-between py-2">
              <div>
                <div className="text-sm font-medium">{w.label || w.chain}</div>
                <div className="font-mono text-xs text-muted-foreground">{w.address}</div>
              </div>
              <span className="text-xs text-muted-foreground">{w.chain}</span>
            </div>
          ))}
        </div>
        <Button className="mt-3" variant="secondary">Connect wallet (WalletConnect)</Button>
      </Card>
    </div>
  );
}