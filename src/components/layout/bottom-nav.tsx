"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Wallet, CreditCard, Coins, Settings } from "lucide-react";

const tabs = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/money", label: "Money", icon: Wallet },
  { href: "/cards", label: "Cards", icon: CreditCard },
  { href: "/crypto", label: "Crypto", icon: Coins },
  { href: "/settings", label: "More", icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 40, borderTop: "1px solid #000", background: "#fff" }} className="md:hidden">
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {tabs.map((t) => {
          const active = pathname?.startsWith(t.href);
          return (
            <Link
              key={t.href}
              href={t.href}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.25rem",
                padding: "0.5rem 0",
                fontSize: "0.75rem",
                textDecoration: "none",
                color: active ? "#d0106f" : "#000",
                fontWeight: active ? 700 : 400,
              }}
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
