import { ReactNode } from "react";
import { cn } from "@/lib/utiles";
import { Navigation } from "./Navigation";

type DashboardLayoutProps = {
  children: ReactNode;
  className?: string;
};

export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-slate-100">
          <div className="flex h-16 items-center border-b px-6">
            <h1 className="text-xl font-semibold">oi.DECS</h1>
          </div>
          <div className="p-4">
            <Navigation />
          </div>
        </aside>

        {/* Main content */}
        <main className={cn("flex-1 overflow-auto", className)}>
          <div className="container mx-auto p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
