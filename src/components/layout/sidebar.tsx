"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Wallet, CreditCard, Coins, Settings } from "lucide-react";

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
    <aside style={{ width: "240px", background: "#000", color: "#fff", display: "flex", flexDirection: "column", minHeight: "100vh" }} className="hidden md:flex">
      <div className="spartan" style={{ padding: "1.5rem", fontSize: "1.5rem", letterSpacing: "-0.04em" }}>
        Imperion
      </div>
      <nav style={{ flex: 1, padding: "1rem 0.75rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        {items.map((it) => {
          const active = pathname?.startsWith(it.href);
          return (
            <Link
              key={it.href}
              href={it.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 1rem",
                textDecoration: "none",
                color: active ? "#d0106f" : "#fff",
                fontWeight: active ? 700 : 400,
                background: active ? "rgba(208,16,111,0.12)" : "transparent",
              }}
            >
              <it.icon size={18} />
              {it.label}
            </Link>
          );
        })}
      </nav>
      <div style={{ padding: "1rem 1.5rem", fontSize: "0.75rem", color: "#888" }}>v0.1.0</div>
    </aside>
  );
}
