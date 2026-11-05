"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardTitle } from "@/components/ui/card";

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
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Notifications</h1>
      <Card>
        {items.length === 0 && <p className="text-sm text-muted-foreground">You're all caught up.</p>}
        {items.map((n) => (
          <div key={n.id} className="border-b border-border py-3 last:border-0">
            <div className="text-sm font-medium">{n.title}</div>
            <div className="text-xs text-muted-foreground">{n.body}</div>
          </div>
        ))}
      </Card>
    </div>
  );
}