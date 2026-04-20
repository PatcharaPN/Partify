"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/lib/hooks";
import { register, setUser } from "@/app/store/slices/authSlice";

type Role = "CANDIDATE" | "EMPLOYER" | null;

export default function SetupProfilePage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [role, setRole] = useState<Role>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const isValid = role && email && password;

  const handleSubmit = async () => {
    if (!isValid) return;

    try {
      setLoading(true);
      await dispatch(register({ email, password, role })).unwrap();
      router.push("/setup-profile");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="grid grid-cols-[0.5fr_0.8fr]">
        {/* ── Left Panel ── */}
        <div className="hidden md:flex w-full shrink-0 flex-col justify-between bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 px-8 py-10 overflow-hidden rounded-l-2xl">
          <div>
            <p className="text-white text-xl font-bold tracking-tight mb-3">
              Partify
            </p>
            <p className="text-blue-200 text-sm leading-relaxed">
              Curating the world's most prestigious part-time opportunities for
              elite talent.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14l-4-4 1.41-1.41L11 13.17l6.59-6.59L19 8l-8 8z" />
                </svg>
              </div>
              <span className="text-blue-100 text-sm">
                Curated editorial roles
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13 2.05v2.02c3.95.49 7 3.85 7 7.93 0 3.21-1.81 6-4.72 7.72L13 17v5h5l-1.22-1.22C19.91 19.07 22 15.76 22 12c0-5.18-3.94-9.45-9-9.95zM11 2.05C5.95 2.55 2 6.82 2 12c0 3.76 2.09 7.07 5.22 8.78L6 22h5v-5l-2.28 2.28C7.81 18 6 15.21 6 12c0-4.08 3.05-7.44 7-7.93V2.05z" />
                </svg>
              </div>
              <span className="text-blue-100 text-sm">
                Fast-track recruitment
              </span>
            </div>
          </div>

          {/* Desk illustration */}
          <div className="opacity-30 mt-6">
            <svg viewBox="0 0 220 140" fill="none" className="w-full">
              <rect x="20" y="80" width="180" height="8" rx="4" fill="white" />
              <rect x="30" y="88" width="8" height="40" rx="3" fill="white" />
              <rect x="182" y="88" width="8" height="40" rx="3" fill="white" />
              <rect
                x="50"
                y="40"
                width="120"
                height="42"
                rx="6"
                fill="white"
                fillOpacity="0.9"
              />
              <rect
                x="56"
                y="47"
                width="108"
                height="28"
                rx="3"
                fill="#3b5bdb"
                fillOpacity="0.5"
              />
              <rect
                x="62"
                y="52"
                width="60"
                height="4"
                rx="2"
                fill="white"
                fillOpacity="0.7"
              />
              <rect
                x="62"
                y="60"
                width="40"
                height="3"
                rx="1.5"
                fill="white"
                fillOpacity="0.4"
              />
              <circle cx="110" cy="82" r="3" fill="#3b5bdb" fillOpacity="0.6" />
              <rect
                x="85"
                y="30"
                width="16"
                height="12"
                rx="2"
                fill="white"
                fillOpacity="0.3"
              />
              <rect
                x="115"
                y="25"
                width="12"
                height="17"
                rx="2"
                fill="white"
                fillOpacity="0.2"
              />
            </svg>
          </div>
        </div>

        {/* ── Right Panel ── */}
        <div className="flex flex-1 items-center justify-center p-10 bg-white shadow-lg rounded-r-2xl">
          <div className="w-full  rounded-2xl  shadow-slate-200">
            <p className="text-xs font-semibold tracking-widest text-blue-600 mb-2">
              STEP 1 OF 3
            </p>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-1">
              Create your account
            </h1>
            <p className="text-sm text-slate-500 mb-7">
              Join our community of professionals and employers.
            </p>
            {/* Role */}
            <div className="mb-5">
              <label className="block text-[11px] font-semibold tracking-widest text-slate-400 mb-2.5">
                I AM A...
              </label>
              <div className="flex gap-3">
                {/* Job Seeker */}
                <button
                  type="button"
                  onClick={() => setRole("CANDIDATE")}
                  className={`flex-1 relative text-left rounded-xl border p-4 transition-all duration-150 cursor-pointer
                  ${
                    role === "CANDIDATE"
                      ? "border-blue-600 bg-white ring-2 ring-blue-100"
                      : "border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/40"
                  }`}
                >
                  <span
                    className={`absolute top-3 right-3 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all
                  ${role === "CANDIDATE" ? "border-blue-600 bg-blue-600" : "border-slate-300 bg-white"}`}
                  >
                    {role === "CANDIDATE" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white block" />
                    )}
                  </span>
                  <svg
                    className="w-5 h-5 text-blue-600 mb-2.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                  </svg>
                  <p className="text-sm font-semibold text-slate-800 mb-0.5">
                    Job Seeker
                  </p>
                  <p className="text-xs text-slate-400 leading-snug">
                    I want to find premium part-time work.
                  </p>
                </button>

                {/* Employer */}
                <button
                  type="button"
                  onClick={() => setRole("EMPLOYER")}
                  className={`flex-1 relative text-left rounded-xl border p-4 transition-all duration-150 cursor-pointer
                  ${
                    role === "EMPLOYER"
                      ? "border-blue-600 bg-white ring-2 ring-blue-100"
                      : "border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/40"
                  }`}
                >
                  <span
                    className={`absolute top-3 right-3 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all
                  ${role === "EMPLOYER" ? "border-blue-600 bg-blue-600" : "border-slate-300 bg-white"}`}
                  >
                    {role === "EMPLOYER" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white block" />
                    )}
                  </span>
                  <svg
                    className="w-5 h-5 text-slate-400 mb-2.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 7h-4V5l-2-2h-4L8 5v2H4c-1.1 0-2 .9-2 2v5c0 .75.4 1.38 1 1.73V19c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2v-3.28c.59-.35 1-.99 1-1.72V9c0-1.1-.9-2-2-2zm-8-2h4l1 1v1h-6V6l1-1zm7 13H5v-3h14v3zm1-5H4V9h4v2h2V9h4v2h2V9h4v4z" />
                  </svg>
                  <p className="text-sm font-semibold text-slate-800 mb-0.5">
                    Employer
                  </p>
                  <p className="text-xs text-slate-400 leading-snug">
                    I want to hire elite talent.
                  </p>
                </button>
              </div>
            </div>
            {/* Full Name
            <div className="mb-4">
              <label className="block text-[11px] font-semibold tracking-widest text-slate-400 mb-2">
                FULL NAME
              </label>
              <input
                type="text"
                placeholder="Johnathan Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl placeholder:text-slate-300 outline-none focus:border-blue-500 focus:bg-white transition-all"
              />
            </div> */}
            {/* Email */}
            <div className="mb-4">
              <label className="block text-[11px] font-semibold tracking-widest text-slate-400 mb-2">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl placeholder:text-slate-300 outline-none focus:border-blue-500 focus:bg-white transition-all"
              />
            </div>
            {/* Password */}
            <div className="mb-6">
              <label className="block text-[11px] font-semibold tracking-widest text-slate-400 mb-2">
                PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 pr-10 text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl placeholder:text-slate-300 outline-none focus:border-blue-500 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <svg
                      className="w-[18px] h-[18px]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" />
                    </svg>
                  ) : (
                    <svg
                      className="w-[18px] h-[18px]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            {/* Submit */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isValid || loading}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold tracking-wide transition-all duration-150 flex items-center justify-center gap-2"
            >
              {loading && (
                <svg
                  className="w-4 h-4 animate-spin"
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
              )}
              {loading ? "Creating account..." : "Create Account"}
            </button>
            <p className="text-center text-sm text-slate-400 mt-4">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
