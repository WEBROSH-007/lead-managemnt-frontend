// src/components/Navbar.jsx
import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-black/55 px-4 py-3 text-white backdrop-blur-xl sm:px-6">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-zinc-400">
            Lead CRM
          </p>
          <h1 className="text-sm font-semibold text-zinc-100 sm:text-base">
            Admin Panel
          </h1>
        </div>

        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="rounded-lg border border-white/25 bg-white/90 px-3 py-1.5 text-xs font-semibold text-black transition-all hover:bg-white sm:text-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
