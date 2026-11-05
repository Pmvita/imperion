"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Wallet, CreditCard, Coins, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/money", label: "Money", icon: Wallet },
  { href: "/cards", label: "Cards", icon: CreditCard },
  { href: "/crypto", label: "Crypto", icon: Coins },
  { href: "/settings", label: "More", icon: MoreHorizontal },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 backdrop-blur md:hidden">
      <div className="flex justify-around">
        {tabs.map((t) => {
          const active = pathname?.startsWith(t.href);
          return (
            <Link
              key={t.href}
              href={t.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-2 text-xs",
                active ? "text-accent" : "text-muted-foreground"
              )}
            >
              <t.icon size={20} />
              {t.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}