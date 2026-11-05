"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatMoney } from "@/lib/utils";

export default function MoneyPage() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  async function send() {
    setStatus("Sending...");
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setStatus("Not logged in"); return; }
    const { data: accs } = await supabase.from("accounts").select("id").eq("user_id", user.id).eq("type", "fiat").single();
    const { error } = await supabase.from("transactions").insert({
      user_id: user.id,
      account_id: accs?.id,
      type: "p2p",
      status: "completed",
      amount: -Number(amount),
      currency: "USD",
      counterparty: recipient,
      description: `P2P to ${recipient}`,
    });
    setStatus(error ? error.message : "Sent!");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Money</h1>
      <Card>
        <CardTitle>Send money</CardTitle>
        <div className="mt-3 space-y-3">
          <input placeholder="Recipient email or phone" value={recipient} onChange={(e) => setRecipient(e.target.value)} className="w-full rounded-lg border border-border bg-card px-4 py-3" />
          <input type="number" placeholder="Amount (USD)" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full rounded-lg border border-border bg-card px-4 py-3" />
          <Button onClick={send} className="w-full">Send</Button>
          {status && <p className="text-sm text-muted-foreground">{status}</p>}
        </div>
      </Card>
      <Card>
        <CardTitle>Quick actions</CardTitle>
        <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
          {["Request", "Exchange", "Direct deposit", "Vaults"].map((a) => (
            <button key={a} className="rounded-lg bg-muted p-4 text-sm font-medium hover:bg-muted/70">{a}</button>
          ))}
        </div>
      </Card>
    </div>
  );
}