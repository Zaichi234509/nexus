"use client";
import { useState } from "react";
import { login } from "../../lib/services/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@nexus.local");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await login(email, password);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-950 via-slate-950 to-brand-900 px-6">
      <div className="w-full max-w-md rounded-2xl bg-slate-900/60 border border-slate-800/60 backdrop-blur-xl p-8 shadow-2xl shadow-brand-950/40">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-br from-white to-brand-300 bg-clip-text text-transparent mb-2">Nexus</h1>
          <p className="text-slate-400 text-sm">CRM + Client Portal</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-200 mb-1">Email</label>
            <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full rounded-lg bg-slate-950 border border-slate-800 text-slate-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent transition" required />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-200 mb-1">Password</label>
            <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full rounded-lg bg-slate-950 border border-slate-800 text-slate-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent transition" required />
          </div>
          {error && <div className="text-red-400 text-sm">{error}</div>}
          <button type="submit" disabled={loading} className="w-full rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-semibold px-4 py-3 transition shadow-lg shadow-brand-600/20">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <div className="mt-6 text-xs text-slate-500 text-center space-y-1">
          <p>Demo Admin: admin@nexus.local / admin123</p>
          <p>Demo Staff: staff@nexus.local / staff123</p>
          <p>Demo Client: client@nexus.local / client123</p>
        </div>
      </div>
    </div>
  );
}
