"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function CardsPage() {
  const [cards, setCards] = useState<any[]>([]);

  useEffect(() => {
    const supabase = createClient();
    (async () => {
      const { data } = await supabase.from("cards").select("*");
      setCards(data || []);
    })();
  }, []);

  async function toggleFreeze(id: string, status: string) {
    const supabase = createClient();
    await supabase.from("cards").update({ status: status === "active" ? "frozen" : "active" }).eq("id", id);
    const { data } = await supabase.from("cards").select("*");
    setCards(data || []);
  }

  return (
    <div>
      <h1 className="spartan" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "2rem" }}>Cards</h1>
      {cards.length === 0 && (
        <div style={{ background: "#fff", border: "2px solid #000", padding: "2rem", marginBottom: "1.5rem" }}>
          <h2 className="spartan" style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>No cards yet</h2>
          <p style={{ color: "#666662" }}>A virtual card is provisioned on signup.</p>
        </div>
      )}
      {cards.map((c) => (
        <div key={c.id} style={{ background: "#fed878", border: "2px solid #000", padding: "2rem", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <div>
              <div className="spartan" style={{ fontSize: "1.5rem" }}>{c.brand.toUpperCase()} •••• {c.last4}</div>
              <div style={{ fontSize: "0.875rem", color: "#666662" }}>{c.type} · expires {c.expiry_month}/{c.expiry_year}</div>
            </div>
            <div style={{ background: c.status === "active" ? "#22c55e" : "#ef4444", color: "#fff", padding: "0.25rem 0.75rem", fontSize: "0.75rem", fontWeight: 700 }}>
              {c.status}
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button onClick={() => toggleFreeze(c.id, c.status)} style={{ background: "#000", color: "#fff", border: "none", padding: "0.75rem 1.25rem", fontWeight: 600, cursor: "pointer" }}>
              {c.status === "active" ? "Freeze" : "Unfreeze"}
            </button>
            <button style={{ background: "#fff", color: "#000", border: "2px solid #000", padding: "0.75rem 1.25rem", fontWeight: 600, cursor: "pointer" }}>Controls</button>
            <button style={{ background: "#fff", color: "#000", border: "2px solid #000", padding: "0.75rem 1.25rem", fontWeight: 600, cursor: "pointer" }}>Details</button>
          </div>
        </div>
      ))}
      <button style={{ background: "#d0106f", color: "#fff", border: "none", padding: "0.875rem 1.75rem", fontWeight: 700, cursor: "pointer" }}>Order physical card</button>
    </div>
  );
}
