import Sidebar from "@/components/main/Sidebar";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};
export default function Dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-background text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed">
      <Sidebar />
      {children}
    </main>
  );
}
