import { Sidebar } from "@/components/layout/sidebar";
import { BottomNav } from "@/components/layout/bottom-nav";
import Link from "next/link";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f7f7f5" }}>
      <Sidebar />
      <main style={{ flex: 1, paddingBottom: "4rem" }} className="md:pb-0">
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 1.5rem" }}>{children}</div>
        <footer style={{ maxWidth: "1100px", margin: "0 auto", padding: "1.5rem", display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "space-between", alignItems: "center", fontSize: "0.75rem", color: "var(--muted-foreground)", borderTop: "1px solid var(--muted)" }}>
          <div>© 2026 Imperion · Demo product, not a real bank.</div>
          <nav style={{ display: "flex", gap: "1rem" }}>
            <Link href="/terms" style={{ color: "inherit", textDecoration: "none" }}>Terms</Link>
            <Link href="/privacy" style={{ color: "inherit", textDecoration: "none" }}>Privacy</Link>
            <Link href="/security" style={{ color: "inherit", textDecoration: "none" }}>Security</Link>
          </nav>
        </footer>
      </main>
      <BottomNav />
    </div>
  );
}
