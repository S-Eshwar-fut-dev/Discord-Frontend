"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2, Calendar } from "lucide-react";
import DateSelect from "./DateSelect";

export default function SignUpPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    displayName: "",
    username: "",
    password: "",
    day: "",
    month: "",
    year: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Generate arrays for date dropdowns
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const formatDOB = () => {
    if (!form.day || !form.month || !form.year) return null;
    // Map month name to index (1-based)
    const monthIndex = months.indexOf(form.month) + 1;
    const mm = String(monthIndex).padStart(2, "0");
    const dd = String(form.day).padStart(2, "0");
    return `${form.year}-${mm}-${dd}`;
  };

  const validateDOB = () => {
    const dobStr = formatDOB();
    if (!dobStr) {
      setError("Please select your full date of birth.");
      return false;
    }

    const dob = new Date(dobStr);
    const now = new Date();

    if (dob > now) {
      setError("Date of birth cannot be in the future.");
      return false;
    }

    // Age calculation
    let age = now.getFullYear() - dob.getFullYear();
    const m = now.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) {
      age--;
    }

    if (age < 13) {
      setError("You must be at least 13 years old to register.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.email || !form.username || !form.password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!validateDOB()) return;

    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const payload = {
        email: form.email,
        displayName: form.displayName,
        username: form.username,
        password: form.password,
        dob: formatDOB(),
      };

      console.log("Signup payload:", payload);
      // router.push("/dashboard");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const inputClasses =
    "w-full rounded bg-[#1e1f22] text-white placeholder-[#87888c] px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#00a8fc] transition border-none";
  const labelClasses = "block text-xs font-bold uppercase text-[#b5bac1] mb-2";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#5865f2] px-4 relative overflow-hidden font-sans">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-[#4752c4] rounded-full blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-[#7289da] rounded-full blur-3xl"
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-[480px] relative z-10 my-8"
      >
        <div className="bg-[#313338] rounded-lg shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">
              Create an account
            </h1>
            <p className="text-[#b5bac1]">We're excited to have you join us!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className={labelClasses}>
                Email <span className="text-[#f23f43]">*</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="you@example.com"
                className={inputClasses}
                required
              />
            </div>

            {/* Display Name */}
            <div>
              <label className={labelClasses}>Display Name</label>
              <input
                type="text"
                value={form.displayName}
                onChange={(e) => handleChange("displayName", e.target.value)}
                placeholder="What should we call you?"
                className={inputClasses}
              />
            </div>

            {/* Username */}
            <div>
              <label className={labelClasses}>
                Username <span className="text-[#f23f43]">*</span>
              </label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => handleChange("username", e.target.value)}
                placeholder="unique_username"
                className={inputClasses}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className={labelClasses}>
                Password <span className="text-[#f23f43]">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="••••••••"
                  className={`${inputClasses} pr-10`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b5bac1] hover:text-white transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className={labelClasses}>
                Date of Birth <span className="text-[#f23f43]">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {/* Month */}
                <div className="relative">
                  <select
                    value={form.month}
                    onChange={(e) => handleChange("month", e.target.value)}
                    className={`${inputClasses} appearance-none cursor-pointer`}
                    required
                  >
                    <option value="" disabled>
                      Month
                    </option>
                    {months.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Day */}
                <div className="relative">
                  <select
                    value={form.day}
                    onChange={(e) => handleChange("day", e.target.value)}
                    className={`${inputClasses} appearance-none cursor-pointer`}
                    required
                  >
                    <option value="" disabled>
                      Day
                    </option>
                    {days.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Year */}
                <div className="relative">
                  <select
                    value={form.year}
                    onChange={(e) => handleChange("year", e.target.value)}
                    className={`${inputClasses} appearance-none cursor-pointer`}
                    required
                  >
                    <option value="" disabled>
                      Year
                    </option>
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Marketing Checkbox */}
            <div className="flex items-start gap-3 mt-2">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-[#1e1f22] bg-[#1e1f22] checked:bg-[#5865f2] checked:border-[#5865f2] transition-all"
                  id="marketing"
                  defaultChecked
                />
                <svg
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M10 3L4.5 8.5L2 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <label
                htmlFor="marketing"
                className="text-xs text-[#b5bac1] cursor-pointer select-none leading-5"
              >
                (Optional) It’s okay to send me emails with updates, tips, and
                special offers. You can opt out at any time.
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-[#f23f43]/10 border border-[#f23f43]/20 rounded text-sm text-[#f23f43]"
              >
                {error}
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded bg-[#5865f2] hover:bg-[#4752c4] text-white font-medium py-2.5 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}
              {loading ? "Creating Account..." : "Continue"}
            </button>

            {/* Terms Footer */}
            <p className="text-xs text-[#949ba4] mt-4">
              By registering, you agree to Eoncord's{" "}
              <Link href="#" className="text-[#00a8fc] hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-[#00a8fc] hover:underline">
                Privacy Policy
              </Link>
              .
            </p>

            {/* Sign In Link */}
            <div className="mt-4 pt-4 border-t border-[#3f4147]">
              <Link
                href="/sign-in"
                className="block text-sm text-[#00a8fc] hover:underline"
              >
                Already have an account?
              </Link>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
