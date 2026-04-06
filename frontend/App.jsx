import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ChatOrders from "./pages/ChatOrders";
import Orders from "./pages/Orders";
import Inventory from "./pages/Inventory";
import Invoices from "./pages/Invoices";
import Workflows from "./pages/Workflows";
import Analytics from "./pages/Analytics";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const pages = {
    dashboard: <Dashboard />,
    chat: <ChatOrders />,
    orders: <Orders />,
    inventory: <Inventory />,
    invoices: <Invoices />,
    workflows: <Workflows />,
    analytics: <Analytics />,
  };

  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      <main className={`main-content ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
        {pages[activePage]}
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --teal: #0d9488;
          --teal-dark: #0f766e;
          --teal-light: #14b8a6;
          --teal-glow: #0d948833;
          --navy: #0c1a2e;
          --navy-mid: #112240;
          --navy-light: #1a3355;
          --navy-card: #162035;
          --slate: #8ba3c7;
          --slate-light: #b8cfe8;
          --white: #f0f6ff;
          --accent-amber: #f59e0b;
          --accent-rose: #f43f5e;
          --accent-violet: #8b5cf6;
          --border: rgba(13,148,136,0.18);
          --font-display: 'Syne', sans-serif;
          --font-body: 'DM Sans', sans-serif;
          --radius: 14px;
          --sidebar-w: 240px;
          --transition: 0.25s cubic-bezier(0.4,0,0.2,1);
        }

        html, body, #root { height: 100%; }

        body {
          background: var(--navy);
          color: var(--white);
          font-family: var(--font-body);
          overflow-x: hidden;
        }

        .app-shell {
          display: flex;
          min-height: 100vh;
        }

        .main-content {
          flex: 1;
          min-height: 100vh;
          transition: margin-left var(--transition);
          overflow-y: auto;
        }

        .main-content.sidebar-open { margin-left: var(--sidebar-w); }
        .main-content.sidebar-closed { margin-left: 64px; }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: var(--navy-mid); }
        ::-webkit-scrollbar-thumb { background: var(--teal-dark); border-radius: 3px; }

        /* Shared card */
        .card {
          background: var(--navy-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 24px;
        }

        .card-hover {
          transition: transform var(--transition), border-color var(--transition), box-shadow var(--transition);
        }
        .card-hover:hover {
          transform: translateY(-2px);
          border-color: var(--teal);
          box-shadow: 0 8px 32px var(--teal-glow);
        }

        /* Page wrapper */
        .page { padding: 32px; max-width: 1400px; }

        .page-header {
          margin-bottom: 32px;
        }
        .page-header h1 {
          font-family: var(--font-display);
          font-size: 28px;
          font-weight: 700;
          color: var(--white);
          letter-spacing: -0.5px;
        }
        .page-header p {
          color: var(--slate);
          font-size: 14px;
          margin-top: 4px;
          font-weight: 300;
        }

        /* Teal badge / tag */
        .tag {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          font-family: var(--font-display);
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .tag-teal { background: var(--teal-glow); color: var(--teal-light); border: 1px solid var(--teal-dark); }
        .tag-amber { background: rgba(245,158,11,0.12); color: #fbbf24; border: 1px solid rgba(245,158,11,0.3); }
        .tag-rose { background: rgba(244,63,94,0.12); color: #fb7185; border: 1px solid rgba(244,63,94,0.3); }
        .tag-violet { background: rgba(139,92,246,0.12); color: #a78bfa; border: 1px solid rgba(139,92,246,0.3); }

        /* Btn */
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 10px;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          border: none;
          transition: all var(--transition);
          letter-spacing: 0.3px;
        }
        .btn-primary {
          background: var(--teal);
          color: #fff;
        }
        .btn-primary:hover { background: var(--teal-light); box-shadow: 0 4px 20px var(--teal-glow); }
        .btn-ghost {
          background: transparent;
          color: var(--slate-light);
          border: 1px solid var(--border);
        }
        .btn-ghost:hover { border-color: var(--teal); color: var(--teal-light); }

        /* Grid helpers */
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
        .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.4s ease both; }
        .fade-up-1 { animation-delay: 0.05s; }
        .fade-up-2 { animation-delay: 0.1s; }
        .fade-up-3 { animation-delay: 0.15s; }
        .fade-up-4 { animation-delay: 0.2s; }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        input, textarea, select {
          font-family: var(--font-body);
          background: var(--navy-mid);
          border: 1px solid var(--border);
          border-radius: 10px;
          color: var(--white);
          padding: 10px 14px;
          font-size: 14px;
          outline: none;
          transition: border-color var(--transition);
          width: 100%;
        }
        input:focus, textarea:focus, select:focus {
          border-color: var(--teal);
          box-shadow: 0 0 0 3px var(--teal-glow);
        }
        input::placeholder, textarea::placeholder { color: var(--slate); }

        table { width: 100%; border-collapse: collapse; }
        th {
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--slate);
          padding: 12px 16px;
          text-align: left;
          border-bottom: 1px solid var(--border);
        }
        td {
          padding: 14px 16px;
          font-size: 14px;
          border-bottom: 1px solid rgba(13,148,136,0.08);
          color: var(--slate-light);
        }
        tr:last-child td { border-bottom: none; }
        tr:hover td { background: rgba(13,148,136,0.04); }

        @media (max-width: 900px) {
          .main-content.sidebar-open { margin-left: 0; }
          .grid-4 { grid-template-columns: 1fr 1fr; }
          .grid-3 { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </div>
  );
}
