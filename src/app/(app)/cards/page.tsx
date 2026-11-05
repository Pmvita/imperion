"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Cards</h1>
      {cards.length === 0 && (
        <Card>
          <CardTitle>No cards yet</CardTitle>
          <p className="mt-2 text-sm text-muted-foreground">A virtual card is provisioned on signup.</p>
        </Card>
      )}
      {cards.map((c) => (
        <Card key={c.id}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-bold">{c.brand.toUpperCase()} •••• {c.last4}</div>
              <div className="text-sm text-muted-foreground">{c.type} · expires {c.expiry_month}/{c.expiry_year}</div>
            </div>
            <div className={`rounded-full px-3 py-1 text-xs ${c.status === "active" ? "bg-success/20 text-success" : "bg-danger/20 text-danger"}`}>
              {c.status}
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button variant="secondary" onClick={() => toggleFreeze(c.id, c.status)}>
              {c.status === "active" ? "Freeze" : "Unfreeze"}
            </Button>
            <Button variant="ghost">Controls</Button>
            <Button variant="ghost">Details</Button>
          </div>
        </Card>
      ))}
      <Button>Order physical card</Button>
    </div>
  );
}