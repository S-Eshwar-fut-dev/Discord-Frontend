"use client";

import Link from "next/link";
import { useState } from "react";
import DateSelect from "@/app/(auth)/sign-up/DateSelect";

export default function SignUpPage() {
  const [form, setForm] = useState({
    email: "",
    displayName: "",
    username: "",
    password: "",
    day: "",
    month: "",
    year: "",
  });

  const [error, setError] = useState<string>("");

  const handleDateChange = (d: {
    day: string;
    month: string;
    year: string;
  }) => {
    setForm((s) => ({ ...s, ...d }));
    setError("");
  };

  const formatDOB = () => {
    if (!form.day || !form.month || !form.year) return "";
    const mm = String(form.month).padStart(2, "0");
    const dd = String(form.day).padStart(2, "0");
    return `${form.year}-${mm}-${dd}`; // YYYY-MM-DD
  };

  const validateDOB = () => {
    const dobStr = formatDOB();
    if (!dobStr) {
      setError("Please select day, month and year.");
      return false;
    }
    const dob = new Date(dobStr + "T00:00:00Z"); // treat as UTC to avoid timezone drift
    const now = new Date();
    if (dob > now) {
      setError("Date of birth cannot be in the future.");
      return false;
    }
    const minAge = 13;
    // Calculate age properly
    let age = now.getFullYear() - dob.getFullYear();
    const m = now.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age--;
    if (age < minAge) {
      setError(`You must be at least ${minAge} years old to register.`);
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!validateDOB()) return;

    const payload = {
      email: form.email,
      displayName: form.displayName,
      username: form.username,
      password: form.password,
      dob: formatDOB(),
    };

    console.log("Signup payload:", payload);
    // TODO: call your signup API, handle response, redirect to onboarding/dashboard
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-[#1b1930] via-[#222226] to-[#12225c] text-white px-4">
      <div className="bg-[#313338] w-full max-w-lg rounded-2xl shadow-lg ring-1 ring-black/30 p-8 md:p-10">
        <h1 className="text-2xl font-bold text-center">Create an account</h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold uppercase text-white">
              Email<span className="text-rose-400">*</span>
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-2 w-full rounded-md bg-[#1e1f22] text-white placeholder-gray-500 outline-none ring-1 ring-gray-700 focus:ring-indigo-500 px-3 py-3"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Display Name */}
          <div>
            <label className="block text-xs font-semibold uppercase text-white">
              Display Name
            </label>
            <input
              type="text"
              value={form.displayName}
              onChange={(e) =>
                setForm({ ...form, displayName: e.target.value })
              }
              className="mt-2 w-full rounded-md bg-[#1e1f22] text-white placeholder-gray-500 outline-none ring-1 ring-gray-700 focus:ring-indigo-500 px-3 py-3"
              placeholder="(optional)"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-xs font-semibold uppercase text-white">
              Username<span className="text-rose-400">*</span>
            </label>
            <input
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="mt-2 w-full rounded-md bg-[#1e1f22] text-white placeholder-gray-500 outline-none ring-1 ring-gray-700 focus:ring-indigo-500 px-3 py-3"
              placeholder="yourhandle"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold uppercase text-white">
              Password<span className="text-rose-400">*</span>
            </label>
            <input
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              type="password"
              className="mt-2 w-full rounded-md bg-[#1e1f22] text-white placeholder-gray-500 outline-none ring-1 ring-gray-700 focus:ring-indigo-500 px-3 py-3"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-xs font-semibold uppercase text-white mb-2">
              Date of Birth<span className="text-rose-400">*</span>
            </label>

            <DateSelect
              day={form.day}
              month={form.month}
              year={form.year}
              onChange={({ day, month, year }) =>
                handleDateChange({ day, month, year })
              }
            />

            {error ? (
              <p className="mt-2 text-rose-400 text-sm">{error}</p>
            ) : null}
          </div>

          {/* Marketing opt-in */}
          <div>
            <label className="inline-flex items-start gap-3">
              <input
                type="checkbox"
                defaultChecked
                className="mt-1 h-4 w-4 accent-indigo-500"
              />
              <span className="text-sm text-gray-300">
                (Optional) It’s okay to send me emails with updates and tips.
              </span>
            </label>
          </div>

          <p className="text-gray-400 text-sm mt-3 text-center">
            By clicking “Create Account,” you agree to the Terms of Service and
            Privacy Policy.
          </p>

          <button
            className="w-full bg-indigo-500 hover:bg-indigo-600 rounded-md py-3 font-semibold"
            type="submit"
          >
            Create Account
          </button>

          <p className="text-gray-400 text-sm mt-3 text-center">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-indigo-400 hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
