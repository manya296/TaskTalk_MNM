import { useState } from "react";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "⬡" },
  { id: "chat", label: "Chat Orders", icon: "◈", badge: 3 },
  { id: "orders", label: "Orders", icon: "◎" },
  { id: "inventory", label: "Inventory", icon: "▦" },
  { id: "invoices", label: "Invoices", icon: "◻" },
  { id: "workflows", label: "Workflows", icon: "⬡" },
  { id: "analytics", label: "Analytics", icon: "◈" },
];

export default function Sidebar({ activePage, setActivePage, isOpen, setIsOpen }) {
  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      {/* Logo */}
      <div className="sidebar-logo" onClick={() => setIsOpen(!isOpen)}>
        <div className="logo-mark">
          <span className="logo-icon">⬡</span>
        </div>
        {isOpen && (
          <div className="logo-text">
            <span className="logo-name">FlowChat</span>
            <span className="logo-sub">Workflow OS</span>
          </div>
        )}
        <button className="toggle-btn">{isOpen ? "‹" : "›"}</button>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {isOpen && <p className="nav-label">MAIN</p>}
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activePage === item.id ? "active" : ""}`}
            onClick={() => setActivePage(item.id)}
            title={!isOpen ? item.label : ""}
          >
            <span className="nav-icon">{item.icon}</span>
            {isOpen && <span className="nav-label-text">{item.label}</span>}
            {isOpen && item.badge && (
              <span className="nav-badge">{item.badge}</span>
            )}
          </button>
        ))}
      </nav>

      {/* Bottom user */}
      {isOpen && (
        <div className="sidebar-user">
          <div className="user-avatar">A</div>
          <div className="user-info">
            <p className="user-name">Admin</p>
            <p className="user-role">Business Owner</p>
          </div>
          <span className="user-status">●</span>
        </div>
      )}

      <style>{`
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          background: var(--navy-mid);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          transition: width var(--transition);
          z-index: 100;
          overflow: hidden;
        }
        .sidebar.open { width: var(--sidebar-w); }
        .sidebar.closed { width: 64px; }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 20px 16px;
          border-bottom: 1px solid var(--border);
          cursor: pointer;
          min-height: 68px;
        }

        .logo-mark {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, var(--teal), var(--teal-dark));
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 12px var(--teal-glow);
        }
        .logo-icon { color: #fff; font-size: 18px; }

        .logo-text { flex: 1; }
        .logo-name {
          display: block;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 15px;
          color: var(--white);
          letter-spacing: -0.3px;
        }
        .logo-sub {
          display: block;
          font-size: 10px;
          color: var(--teal-light);
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .toggle-btn {
          background: none;
          border: none;
          color: var(--slate);
          cursor: pointer;
          font-size: 18px;
          padding: 0;
          line-height: 1;
          transition: color var(--transition);
          flex-shrink: 0;
        }
        .toggle-btn:hover { color: var(--teal-light); }

        .sidebar-nav {
          flex: 1;
          padding: 12px 8px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          overflow-y: auto;
        }

        .nav-label {
          font-size: 9px;
          letter-spacing: 1.5px;
          color: var(--slate);
          padding: 8px 10px 4px;
          font-family: var(--font-display);
          font-weight: 600;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 10px;
          border: none;
          background: none;
          color: var(--slate);
          cursor: pointer;
          transition: all var(--transition);
          text-align: left;
          white-space: nowrap;
          width: 100%;
          position: relative;
        }
        .nav-item:hover {
          background: rgba(13,148,136,0.1);
          color: var(--slate-light);
        }
        .nav-item.active {
          background: rgba(13,148,136,0.15);
          color: var(--teal-light);
          border: 1px solid var(--border);
        }
        .nav-item.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 18px;
          background: var(--teal);
          border-radius: 0 3px 3px 0;
        }

        .nav-icon { font-size: 16px; flex-shrink: 0; width: 20px; text-align: center; }
        .nav-label-text {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 500;
          flex: 1;
        }
        .nav-badge {
          background: var(--teal);
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 20px;
          font-family: var(--font-display);
        }

        .sidebar-user {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 16px;
          border-top: 1px solid var(--border);
        }
        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--teal-dark), var(--accent-violet));
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 13px;
          color: #fff;
          flex-shrink: 0;
        }
        .user-info { flex: 1; }
        .user-name {
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 600;
          color: var(--white);
        }
        .user-role { font-size: 10px; color: var(--slate); }
        .user-status { color: #22c55e; font-size: 10px; }
      `}</style>
    </aside>
  );
}
