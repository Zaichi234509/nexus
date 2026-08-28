"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  const nav = [
    { label: "Dashboard", href: "/admin/dashboard", icon: "LayoutDashboard" },
    { label: "Clients", href: "/admin/clients", icon: "Users" },
    { label: "Projects", href: "/admin/projects", icon: "Folder" },
    { label: "Tasks", href: "/admin/tasks", icon: "CheckSquare" },
    { label: "Invoices", href: "/admin/invoices", icon: "Receipt" },
    { label: "Messages", href: "/admin/messages", icon: "MessageSquare" },
    { label: "Support", href: "/admin/support", icon: "LifeBuoy" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex">
      <aside className={`${sidebarOpen ? "w-64" : "w-16"} border-r border-slate-900 bg-slate-950/80 backdrop-blur-sm transition-all duration-300`}>
        <div className="p-4 flex items-center gap-3">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-slate-900 text-slate-400 hover:text-white transition">
            <span className="sr-only">Toggle</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
          </button>
          {sidebarOpen && <span className="font-extrabold tracking-tight text-brand-400">Nexus</span>}
        </div>
        <nav className="px-3 py-4 space-y-1">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900 transition">
              <span className="w-5 h-5 inline-block text-brand-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/></svg>
              </span>
              {sidebarOpen && item.label}
            </a>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-40 border-b border-slate-900 bg-slate-950/60 backdrop-blur-md px-8 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Dashboard</h2>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-600 to-brand-900 ring-2 ring-brand-900/40" />
          </div>
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
