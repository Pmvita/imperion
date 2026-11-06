"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

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

  const inputStyle = { width: "100%", border: "2px solid #000", padding: "0.875rem 1rem", fontSize: "1rem", marginBottom: "1rem", background: "#f7f7f5" };

  return (
    <div>
      <h1 className="spartan" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "2rem" }}>Money</h1>
      <div style={{ background: "#bbf697", border: "2px solid #000", padding: "2rem", marginBottom: "1.5rem" }}>
        <h2 className="spartan" style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Send money</h2>
        <input placeholder="Recipient email or phone" value={recipient} onChange={(e) => setRecipient(e.target.value)} style={inputStyle} />
        <input type="number" placeholder="Amount (USD)" value={amount} onChange={(e) => setAmount(e.target.value)} style={inputStyle} />
        <button onClick={send} style={{ width: "100%", background: "#d0106f", color: "#fff", border: "none", padding: "0.875rem", fontSize: "1rem", fontWeight: 700, cursor: "pointer" }}>
          Send
        </button>
        {status && <p style={{ marginTop: "1rem", fontSize: "0.875rem" }}>{status}</p>}
      </div>
      <div style={{ background: "#fff", border: "2px solid #000", padding: "2rem" }}>
        <h2 className="spartan" style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Quick actions</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.75rem" }}>
          {["Request", "Exchange", "Direct deposit", "Vaults"].map((a) => (
            <button key={a} style={{ background: "#f7f7f5", border: "2px solid #000", padding: "1.25rem", fontSize: "1rem", fontWeight: 600, cursor: "pointer" }}>{a}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
