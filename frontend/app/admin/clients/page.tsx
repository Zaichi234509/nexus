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

export default function ClientsPage() {
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
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Clients</h1>
        <a href="#" className="rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium px-4 py-2.5 transition shadow-lg shadow-brand-600/20">Add Client</a>
      </div>
      <div className="rounded-2xl border border-slate-800/60 bg-slate-900/20 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-900/60 text-slate-300">
            <tr>
              <th className="text-left px-6 py-3 font-medium">Name</th>
              <th className="text-left px-6 py-3 font-medium">Email</th>
              <th className="text-left px-6 py-3 font-medium">Company</th>
              <th className="text-left px-6 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {loading ? (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-500">Loading clients...</td></tr>
            ) : clients.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-12 text-center text-slate-500">No clients found. Create your first client to get started.</td></tr>
            ) : (
              clients.map((c) => (
                <tr key={c.id} className="hover:bg-slate-900/40 transition">
                  <td className="px-6 py-3 font-medium text-white">{c.first_name} {c.last_name}</td>
                  <td className="px-6 py-3 text-slate-400">{c.email}</td>
                  <td className="px-6 py-3 text-slate-400">{c.company || "—"}</td>
                  <td className="px-6 py-3"><span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${c.status === "active" ? "bg-emerald-900/40 text-emerald-300" : c.status === "lead" ? "bg-amber-900/40 text-amber-300" : "bg-slate-800 text-slate-400"}`}>{c.status}</span></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
