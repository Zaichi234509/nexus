import './globals.css';

export const metadata = {
  title: 'Nexus — CRM + Client Portal',
  description: 'A production-quality CRM and Client Portal SaaS platform.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-slate-950 text-slate-50 antialiased">
      <body className="min-h-screen font-sans selection:bg-brand-500/30">
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
