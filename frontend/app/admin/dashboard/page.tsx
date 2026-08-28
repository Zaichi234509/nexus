"use client";
import { useEffect, useState } from "react";

interface Client {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    fetch("http://localhost:8080/api/clients", {
      headers: { Authorization: `Bearer ${token || ""}` },
    })
      .then((r) => r.json())
      .then((data) => setClients(data.clients || []))
      .catch(() => setClients([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight mb-2">Welcome back</h1>
      <p className="text-slate-400 mb-8">Manage clients, projects, tasks, and business operations.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Total Clients", value: clients.length, color: "text-brand-400" },
          { label: "Active Projects", value: 12, color: "text-emerald-400" },
          { label: "Open Tickets", value: 3, color: "text-amber-400" },
          { label: "Revenue", value: "₱482,000", color: "text-rose-400" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-slate-900/40 border border-slate-800/60 p-6 backdrop-blur-sm hover:border-brand-700/40 transition">
            <div className="text-sm text-slate-400 mb-1">{stat.label}</div>
            <div className={`text-3xl font-extrabold ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-800/60 bg-slate-900/30 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800/60">
          <h3 className="font-semibold text-white">Recent Clients</h3>
        </div>
        <div className="divide-y divide-slate-800/50">
          {loading ? (
            <div className="p-6 text-slate-500">Loading...</div>
          ) : clients.length === 0 ? (
            <div className="p-6 text-slate-500">No clients yet. Create your first client to get started.</div>
          ) : (
            clients.map((c) => (
              <a key={c.id} href={`/admin/clients/${c.id}`} className="flex items-center justify-between px-6 py-4 hover:bg-slate-900/60 transition">
                <div>
                  <div className="font-medium text-white">{c.first_name} {c.last_name}</div>
                  <div className="text-xs text-slate-400">{c.email} · {c.company || "No company"}</div>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${c.status === "active" ? "bg-emerald-900/40 text-emerald-300" : c.status === "lead" ? "bg-amber-900/40 text-amber-300" : "bg-slate-800 text-slate-400"}`}>{c.status}</span>
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
