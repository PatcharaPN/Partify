"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/lib/hooks";
import { fetchCurrentUser, register } from "@/app/store/slices/authSlice";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Button from "@/app/components/ui/Button";

type Role = "CANDIDATE" | "EMPLOYER" | null;

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);

  const [role, setRole] = useState<Role>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);

  const isStep1Valid = role && email && password;
  const isStep2Valid = firstName && lastName && phone;

  const handleSubmit = async () => {
    if (!isStep2Valid || !isStep1Valid) return;
    try {
      setLoading(true);
      await dispatch(
        register({
          email,
          password,
          role,
          profile: {
            firstName,
            lastName,
            phone,
          },
        }),
      ).unwrap();
      dispatch(fetchCurrentUser()).unwrap();
      router.push("/");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const stepVariants = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-70px)]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -24 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="grid grid-cols-[0.5fr_0.8fr]"
      >
        {/* ── Left Panel ── */}
        <div className="hidden md:flex w-full shrink-0 flex-col justify-between bg-linear-to-br from-blue-600 via-blue-700 to-blue-900 px-8 py-10 overflow-hidden rounded-l-2xl">
          <div>
            <p className="text-white text-xl font-bold tracking-tight mb-3">
              Partify
            </p>
            <p className="text-blue-200 text-sm leading-relaxed">
              คัดสรรโอกาสงานพาร์ทไทม์ที่ดีที่สุดสำหรับคุณ
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                <Icon
                  icon="solar:verified-check-linear"
                  className="w-4 h-4 text-white"
                />
              </div>
              <span className="text-blue-100 text-sm">งานคุณภาพคัดสรรแล้ว</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                <Icon icon="solar:bolt-linear" className="w-4 h-4 text-white" />
              </div>
              <span className="text-blue-100 text-sm">จับคู่งานได้รวดเร็ว</span>
            </div>
          </div>
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
          <div className="w-full">
            {/* Step Indicator */}
            <div className="flex items-center gap-2 mb-6">
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
                    ${step >= s ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"}`}
                  >
                    {step > s ? (
                      <Icon
                        icon="solar:check-circle-bold"
                        className="w-3.5 h-3.5"
                      />
                    ) : (
                      s
                    )}
                  </div>
                  {s < 2 && (
                    <div
                      className={`w-8 h-0.5 transition-all duration-300 ${step > s ? "bg-blue-600" : "bg-slate-200"}`}
                    />
                  )}
                </div>
              ))}
              <span className="text-xs text-slate-400 ml-1">
                ขั้นตอนที่ {step} จาก 2
              </span>
            </div>

            {/* Steps — fixed height to prevent layout shift */}
            <div className="relative">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    variants={stepVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.22, ease: "easeOut" }}
                  >
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-1">
                      สร้างบัญชีของคุณ
                    </h1>
                    <p className="text-sm text-slate-500 mb-7">
                      เข้าร่วมชุมชนของผู้หางานและนายจ้างมืออาชีพ
                    </p>

                    {/* Role */}
                    <div className="mb-5">
                      <label className="block text-[11px] font-semibold tracking-widest text-slate-400 mb-2.5">
                        ฉันคือ...
                      </label>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setRole("CANDIDATE")}
                          className={`flex-1 relative text-left rounded-xl border p-4 transition-all duration-150 cursor-pointer
                          ${role === "CANDIDATE" ? "border-blue-600 bg-white ring-2 ring-blue-100" : "border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/40"}`}
                        >
                          <span
                            className={`absolute top-3 right-3 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all
                            ${role === "CANDIDATE" ? "border-blue-600 bg-blue-600" : "border-slate-300 bg-white"}`}
                          >
                            {role === "CANDIDATE" && (
                              <span className="w-1.5 h-1.5 rounded-full bg-white block" />
                            )}
                          </span>
                          <Icon
                            icon="solar:users-group-rounded-linear"
                            className="w-5 h-5 text-blue-600 mb-2.5"
                          />
                          <p className="text-sm font-semibold text-slate-800 mb-0.5">
                            ผู้หางาน
                          </p>
                          <p className="text-xs text-slate-400 leading-snug">
                            ฉันต้องการหางานพาร์ทไทม์
                          </p>
                        </button>

                        <button
                          type="button"
                          onClick={() => setRole("EMPLOYER")}
                          className={`flex-1 relative text-left rounded-xl border p-4 transition-all duration-150 cursor-pointer
                          ${role === "EMPLOYER" ? "border-blue-600 bg-white ring-2 ring-blue-100" : "border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/40"}`}
                        >
                          <span
                            className={`absolute top-3 right-3 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all
                            ${role === "EMPLOYER" ? "border-blue-600 bg-blue-600" : "border-slate-300 bg-white"}`}
                          >
                            {role === "EMPLOYER" && (
                              <span className="w-1.5 h-1.5 rounded-full bg-white block" />
                            )}
                          </span>
                          <Icon
                            icon="solar:buildings-2-linear"
                            className="w-5 h-5 text-slate-400 mb-2.5"
                          />
                          <p className="text-sm font-semibold text-slate-800 mb-0.5">
                            นายจ้าง
                          </p>
                          <p className="text-xs text-slate-400 leading-snug">
                            ฉันต้องการจ้างพนักงานพาร์ทไทม์
                          </p>
                        </button>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                      <label className="block text-[11px] font-semibold tracking-widest text-slate-400 mb-2">
                        อีเมล
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
                        รหัสผ่าน
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
                          <Icon
                            icon={
                              showPassword
                                ? "solar:eye-closed-linear"
                                : "solar:eye-linear"
                            }
                            className="w-4.5 h-4.5"
                          />
                        </button>
                      </div>
                    </div>

                    <Button
                      disabled={!isStep1Valid}
                      onClick={() => setStep(2)}
                      className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white text-sm font-semibold tracking-wide transition-all duration-150"
                    >
                      ถัดไป
                    </Button>

                    <div className="w-full flex justify-center">
                      <span className="text-center text-sm text-slate-400 mt-4">
                        มีบัญชีอยู่แล้ว?{" "}
                        <Link
                          className="text-blue-600 px-2 hover:underline"
                          href="/login"
                        >
                          เข้าสู่ระบบ
                        </Link>
                      </span>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    variants={stepVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.22, ease: "easeOut" }}
                  >
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-1">
                      บอกเราเพิ่มเติมเกี่ยวกับคุณ
                    </h1>
                    <p className="text-sm text-slate-500 mb-7">
                      ข้อมูลเหล่านี้จะช่วยให้นายจ้างรู้จักคุณมากขึ้น
                    </p>

                    {/* ชื่อ + นามสกุล */}
                    <div className="flex gap-3 mb-4">
                      <div className="flex-1">
                        <label className="block text-[11px] font-semibold tracking-widest text-slate-400 mb-2">
                          ชื่อ
                        </label>
                        <input
                          type="text"
                          placeholder="สมชาย"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl placeholder:text-slate-300 outline-none focus:border-blue-500 focus:bg-white transition-all"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-[11px] font-semibold tracking-widest text-slate-400 mb-2">
                          นามสกุล
                        </label>
                        <input
                          type="text"
                          placeholder="ใจดี"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl placeholder:text-slate-300 outline-none focus:border-blue-500 focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    {/* เบอร์ */}
                    <div className="mb-6">
                      <label className="block text-[11px] font-semibold tracking-widest text-slate-400 mb-2">
                        เบอร์โทรศัพท์
                      </label>
                      <input
                        type="tel"
                        placeholder="08X-XXX-XXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl placeholder:text-slate-300 outline-none focus:border-blue-500 focus:bg-white transition-all"
                      />
                    </div>

                    {/* padding เพื่อให้สูงเท่า step 1 */}
                    <div className="mb-15" />

                    <div className="flex gap-3">
                      <Button
                        onClick={() => setStep(1)}
                        variant="outlined"
                        className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-150"
                      >
                        ย้อนกลับ
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        disabled={!isStep2Valid || loading}
                        className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white text-sm font-semibold tracking-wide transition-all duration-150 flex items-center justify-center gap-2"
                      >
                        {loading && (
                          <Icon
                            icon="line-md:loading-twotone-loop"
                            width={20}
                            height={20}
                          />
                        )}
                        {loading ? "กำลังสร้างบัญชี..." : "สร้างบัญชี"}
                      </Button>
                    </div>

                    <div className="w-full flex justify-center">
                      <span className="text-center text-sm text-slate-400 mt-4">
                        มีบัญชีอยู่แล้ว?{" "}
                        <Link
                          className="text-blue-600 px-2 hover:underline"
                          href="/login"
                        >
                          เข้าสู่ระบบ
                        </Link>
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
