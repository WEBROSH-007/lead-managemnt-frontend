// src/pages/Login.jsx
import { useState } from "react";
import API from "../services/api";
import { setToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const res = await API.post("/auth/login", form);
      setToken(res.data.token);
      navigate("/dashboard");
    } catch {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-shell relative min-h-screen overflow-hidden bg-black px-4 py-10 sm:py-14">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="login-orb login-orb-one" />
        <div className="login-orb login-orb-two" />
        <div className="login-grid" />
      </div>

      {/* Card */}
      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center justify-center sm:min-h-[calc(100vh-7rem)]">
        <div className="login-card w-full rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-2xl sm:p-10">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/40 bg-white/20 shadow-lg shadow-black/40">
              <svg
                className="h-7 w-7 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Welcome back
            </h2>
            <p className="mt-1 text-sm text-zinc-300/90">
              Sign in to your admin account
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 flex items-center gap-2 rounded-xl border border-red-300/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
              <svg
                className="h-4 w-4 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="group">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-zinc-300/85">
                Email
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-white">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  disabled={loading}
                  className="w-full rounded-xl border border-white/15 bg-black/35 py-3 pl-10 pr-4 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:border-white/55 focus:ring-2 focus:ring-white/15"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="group">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-zinc-300/85">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-white">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </span>
                <input
                  type="password"
                  placeholder="••••••••"
                  disabled={loading}
                  className="w-full rounded-xl border border-white/15 bg-black/35 py-3 pl-10 pr-4 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:border-white/55 focus:ring-2 focus:ring-white/15"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/85 py-3 text-sm font-semibold text-black transition-all duration-200 hover:-translate-y-0.5 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60 active:scale-95"
            >
              {loading ? (
                <>
                  <svg
                    className="h-4 w-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </>
              )}
            </button>

            <p className="pt-1 text-center text-xs text-zinc-400/90">
              Secure admin access only
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
