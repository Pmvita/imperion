"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function NotificationsPage() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => {
    const supabase = createClient();
    (async () => {
      const { data } = await supabase.from("notifications").select("*").order("created_at", { ascending: false });
      setItems(data || []);
    })();
  }, []);
  return (
    <div>
      <h1 className="spartan" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "2rem" }}>Notifications</h1>
      <div style={{ background: "#fff", border: "2px solid #000", padding: "2rem" }}>
        {items.length === 0 && <p style={{ color: "#666662" }}>You're all caught up.</p>}
        {items.map((n) => (
          <div key={n.id} style={{ padding: "1rem 0", borderBottom: "1px solid #ebebe8" }}>
            <div style={{ fontWeight: 600 }}>{n.title}</div>
            <div style={{ fontSize: "0.875rem", color: "#666662" }}>{n.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
