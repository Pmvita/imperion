"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Wallet, CreditCard, Coins, Settings, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/money", label: "Money", icon: Wallet },
  { href: "/cards", label: "Cards", icon: CreditCard },
  { href: "/crypto", label: "Crypto", icon: Coins },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-border bg-card">
      <div className="flex h-16 items-center px-6 text-xl font-bold">
        <span className="text-accent">Imperion</span>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {items.map((it) => {
          const active = pathname?.startsWith(it.href);
          return (
            <Link
              key={it.href}
              href={it.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm",
                active ? "bg-accent/15 text-accent" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <it.icon size={18} />
              {it.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 text-xs text-muted-foreground">v0.1.0 · Imperion</div>
    </aside>
  );
}