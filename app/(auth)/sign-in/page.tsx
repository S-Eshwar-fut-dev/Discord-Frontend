"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function SignInPage() {
  const { login, loading, error: authError } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!identifier.trim() || !password) {
      setError("Please fill in both fields.");
      return;
    }

    try {
      // Mock server only needs username for login
      await login(identifier);
    } catch (err) {
      setError(authError || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#1b1930] via-[#222226] to-[#12225c] px-4">
      <div className="w-full max-w-5xl px-4">
        <div className="bg-[#3a3b3f] rounded-2xl shadow-2xl ring-1 ring-black/30 p-8 md:p-10 grid md:grid-cols-[1fr_0.9fr] gap-8">
          {/* LEFT: Login form */}
          <div className="flex flex-col">
            <div className="mb-6 text-center">
              <h1 className="text-3xl font-extrabold text-white">
                Welcome back!
              </h1>
              <p className="mt-2 text-sm text-gray-300">
                We're so excited to see you again!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Email or Phone Number <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg bg-[#2b2d31] text-white placeholder-gray-400 px-4 py-3 outline-none ring-1 ring-[#404244] focus:ring-indigo-500 transition"
                  autoComplete="username"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Password <span className="text-rose-400">*</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg bg-[#2b2d31] text-white placeholder-gray-400 px-4 py-3 outline-none ring-1 ring-[#404244] focus:ring-indigo-500 transition"
                  autoComplete="current-password"
                  required
                  disabled={loading}
                />
              </div>

              <div className="flex items-center justify-between text-sm text-indigo-300">
                <button
                  type="button"
                  onClick={() => alert("Password-reset flow placeholder")}
                  className="text-indigo-300 hover:underline"
                >
                  Forgot your password?
                </button>
              </div>

              {error && <p className="text-rose-400 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className={`w-full mt-2 rounded-lg py-3 font-semibold text-white transition ${
                  loading
                    ? "bg-indigo-400/60 cursor-not-allowed"
                    : "bg-indigo-500 hover:bg-indigo-600"
                }`}
              >
                {loading ? "Logging in..." : "Log In"}
              </button>

              <p className="text-center text-sm text-gray-300 mt-3">
                Need an account?{" "}
                <Link
                  href="/sign-up"
                  className="text-indigo-300 hover:underline"
                >
                  Register
                </Link>
              </p>
            </form>
          </div>

          {/* RIGHT: QR + info */}
          <div className="flex flex-col items-center justify-center">
            <div className="bg-[#fff] p-3 rounded-md shadow-sm mb-4">
              {/* replace /qr-placeholder.png with your QR image */}
              <img
                src="/qr-placeholder.png"
                alt="QR code"
                className="w-40 h-40 object-contain"
              />
            </div>

            <h2 className="text-lg font-semibold text-white">
              Log in with QR Code
            </h2>
            <p className="text-center text-gray-300 mt-2 max-w-xs">
              Scan this with the{" "}
              <span className="font-semibold text-white">
                Discord mobile app
              </span>{" "}
              to log in instantly.
            </p>

            <button
              type="button"
              onClick={() => alert("passkey login placeholder")}
              className="mt-4 text-sm text-indigo-300 hover:underline"
            >
              Or, sign in with passkey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
