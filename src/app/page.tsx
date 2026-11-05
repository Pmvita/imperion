import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";

const features = [
  { title: "Unified account", desc: "One identity, one balance across fiat and crypto." },
  { title: "Multi-currency", desc: "USD, EUR, GBP, BTC, ETH, USDC and more." },
  { title: "Send money", desc: "P2P, domestic, and international transfers." },
  { title: "Card control", desc: "Freeze, limits, and merchant controls." },
  { title: "Crypto", desc: "Buy, sell, swap, send, receive." },
  { title: "Secure", desc: "Supabase Auth, RLS, 2FA-ready." },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between px-6 py-5 md:px-12">
        <div className="text-xl font-bold">
          <span className="text-accent">Imperion</span>
        </div>
        <div className="flex gap-2">
          <Link href="/login"><Button variant="ghost">Log in</Button></Link>
          <Link href="/signup"><Button>Create account</Button></Link>
        </div>
      </header>

      <section className="px-6 py-20 text-center md:px-12">
        <h1 className="text-4xl font-bold md:text-6xl">
          Banking, payments, and crypto
          <br />
          <span className="text-accent">in one account.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
          Imperion unifies neobank, payments, and Web3 into a single identity and balance.
          Web and mobile, one experience.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/signup"><Button size="lg">Get started</Button></Link>
          <Link href="/login"><Button size="lg" variant="secondary">Log in</Button></Link>
        </div>
      </section>

      <section className="px-6 py-12 md:px-12">
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title}>
              <CardTitle>{f.title}</CardTitle>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      <footer className="px-6 py-8 text-center text-xs text-muted-foreground md:px-12">
        © 2026 Imperion. MIT License.
      </footer>
    </div>
  );
}
