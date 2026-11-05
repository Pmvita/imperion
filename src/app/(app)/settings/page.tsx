"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const supabase = createClient();
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setEmail(user.email || "");
    })();
  }, []);

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  const items = ["Profile", "Security", "Device management", "Notifications", "Help & support", "Legal & privacy", "About"];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      <Card>
        <CardTitle>Account</CardTitle>
        <p className="mt-2 text-sm">{email}</p>
      </Card>
      <Card>
        <CardTitle>Sections</CardTitle>
        <div className="mt-3 divide-y divide-border">
          {items.map((i) => (
            <button key={i} className="flex w-full items-center justify-between py-3 text-sm hover:text-accent">
              {i} <span className="text-muted-foreground">›</span>
            </button>
          ))}
        </div>
      </Card>
      <Button variant="danger" onClick={signOut}>Sign out</Button>
    </div>
  );
}