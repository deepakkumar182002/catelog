"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ArrowRight, Loader2, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed.");
      }

      const isSubdomain =
        typeof window !== "undefined" &&
        (window.location.hostname.startsWith("admin.") ||
          window.location.hostname.startsWith("admin-"));

      if (isSubdomain) {
        router.push("/");
      } else {
        router.push("/admin");
      }
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Invalid credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#101010] flex items-center justify-center p-6 text-stone-100">
      <div className="max-w-md w-full">
        {/* Brand header */}
        <div className="text-center mb-8">
          <span className="text-[10px] font-mono tracking-widest uppercase text-amber-500 font-semibold">
            Administrative Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-editorial font-bold tracking-tight uppercase mt-1 text-white">
            EXPERIENCE LIFE
          </h1>
          <p className="text-xs font-mono text-stone-500 mt-2">
            Secure studio content management access
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#181818] border border-stone-800 rounded-3xl p-8 shadow-2xl">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/50 border border-red-800 text-red-300 text-xs font-mono flex items-center gap-3">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-mono uppercase text-stone-400 mb-2">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-4 h-4 text-stone-500" />
                <input
                  type="email"
                  required
                  placeholder="admin@experiencelife.design"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-stone-900 border border-stone-700 text-white text-sm focus:outline-none focus:border-amber-600 transition-colors font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-stone-400 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-4 h-4 text-stone-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-stone-900 border border-stone-700 text-white text-sm focus:outline-none focus:border-amber-600 transition-colors font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-[#FAF8F5] hover:bg-stone-200 text-stone-950 font-semibold text-xs font-mono uppercase tracking-widest py-3.5 px-6 rounded-xl transition-all shadow-md disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Quick Fill Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setEmail("admin@experiencelife.design");
                  setPassword("ExperienceLife#2026");
                }}
                className="w-full py-2 px-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-[11px] font-mono text-stone-400 hover:text-amber-400 border border-stone-800 transition-colors"
              >
                Click to Auto-Fill Studio Master Credentials
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-stone-800/80 text-center text-xs font-mono text-stone-500">
            <Link href="/" className="hover:text-stone-300 transition-colors">
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
