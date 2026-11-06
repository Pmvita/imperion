import { Sidebar } from "@/components/layout/sidebar";
import { BottomNav } from "@/components/layout/bottom-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f7f7f5" }}>
      <Sidebar />
      <main style={{ flex: 1, paddingBottom: "4rem" }} className="md:pb-0">
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 1.5rem" }}>{children}</div>
      </main>
      <BottomNav />
    </div>
  );
}
