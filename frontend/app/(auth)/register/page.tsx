"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/lib/hooks";
import { fetchCurrentUser, register } from "@/app/store/slices/authSlice";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Button from "@/app/components/ui/Button";
import { Role } from "@/app/types/job.type";
import { Controller, useForm } from "react-hook-form";
import { registerSchema, RegisterValues } from "@/app/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const {
    register: registeredField,
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: undefined,
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      phone: "",
    },
  });

  const [step, setStep] = useState<1 | 2>(1);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    const isValid = await trigger([
      "role",
      "email",
      "password",
      "confirmPassword",
    ]);
    if (isValid) setStep(2);
  };

  const onSubmit = async (data: RegisterValues) => {
    try {
      setLoading(true);
      await dispatch(
        register({
          email: data.email,
          password: data.password,
          role: data.role,
          profile: {
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
          },
        }),
      ).unwrap();

      await dispatch(fetchCurrentUser()).unwrap();
      router.push("/");
    } catch (error) {
      console.log(error);
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

        {/* Right Panel */}
        <div className="flex flex-1 items-center justify-center p-5 bg-white shadow-lg rounded-r-2xl">
          <div className="w-full">
            {/* Step Indicator */}
            <div className="flex items-center gap-2 mb-3">
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
                    <p className="text-sm text-slate-500 mb-4">
                      เข้าร่วมชุมชนของผู้หางานและนายจ้างมืออาชีพ
                    </p>
                    {/* Role */}
                    <Controller
                      name="role"
                      control={control}
                      render={({ field }) => (
                        <div className="mb-2">
                          <label className="block text-[11px] font-semibold tracking-widest text-slate-400 mb-2.5">
                            ฉันคือ...
                          </label>
                          <div className="flex gap-3">
                            {[
                              {
                                value: "CANDIDATE",
                                label: "ผู้หางาน",
                                desc: "ฉันต้องการหางานพาร์ทไทม์",
                                icon: "solar:users-group-rounded-linear",
                              },
                              {
                                value: "EMPLOYER",
                                label: "นายจ้าง",
                                desc: "ฉันต้องการจ้างพนักงานพาร์ทไทม์",
                                icon: "solar:buildings-2-linear",
                              },
                            ].map((item) => (
                              <button
                                key={item.value}
                                type="button"
                                onClick={() => field.onChange(item.value)}
                                className={`flex-1 relative text-left rounded-xl border p-4 transition-all duration-150 cursor-pointer
                          ${field.value === item.value ? "border-blue-600 bg-white ring-2 ring-blue-100" : "border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/40"}`}
                              >
                                <span
                                  className={`absolute top-3 right-3 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all
                            ${field.value === item.value ? "border-blue-600 bg-blue-600" : "border-slate-300 bg-white"}`}
                                >
                                  {field.value === item.value && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-white block" />
                                  )}
                                </span>
                                <Icon
                                  icon={item.icon}
                                  className="w-5 h-5 text-blue-600 mb-2.5"
                                />
                                <p className="text-sm font-semibold text-slate-800 mb-0.5">
                                  {item.label}
                                </p>
                                <p className="text-xs text-slate-400 leading-snug">
                                  {item.desc}
                                </p>
                              </button>
                            ))}
                          </div>
                          {errors.role && (
                            <p className="text-xs text-red-500 mt-1">
                              {errors.role.message}
                            </p>
                          )}
                        </div>
                      )}
                    ></Controller>
                    {/* Email */}
                    <div className="mb-2">
                      <label className="block text-[11px] font-semibold tracking-widest text-slate-400 mb-2">
                        อีเมล
                      </label>
                      <input
                        {...registeredField("email")}
                        type="email"
                        placeholder="john@example.com"
                        className="w-full px-3.5 py-2.5 text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl placeholder:text-slate-300 outline-none focus:border-blue-500 focus:bg-white transition-all"
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    {/* Password */}
                    <div className="mb-2">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-[11px] font-semibold tracking-widest text-slate-400">
                          รหัสผ่าน
                        </label>
                        {errors.password && (
                          <p className="text-[11px] text-red-500">
                            {errors.password.message}
                          </p>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          {...registeredField("password")}
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
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

                    {/* Confirm Password */}
                    <div className="mb-2">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-[11px] font-semibold tracking-widest text-slate-400">
                          ยืนยันรหัสผ่าน
                        </label>
                        {errors.confirmPassword && (
                          <p className="text-[11px] text-red-500">
                            {errors.confirmPassword.message}
                          </p>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          {...registeredField("confirmPassword")}
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="w-full px-3.5 py-2.5 pr-10 text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl placeholder:text-slate-300 outline-none focus:border-blue-500 focus:bg-white transition-all"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          <Icon
                            icon={
                              showConfirmPassword
                                ? "solar:eye-closed-linear"
                                : "solar:eye-linear"
                            }
                            className="w-4.5 h-4.5"
                          />
                        </button>
                      </div>
                    </div>
                    <Button
                      onClick={handleNext}
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
                          {...registeredField("firstName")}
                          type="text"
                          placeholder="สมชาย"
                          className="w-full px-3.5 py-2.5 text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl placeholder:text-slate-300 outline-none focus:border-blue-500 focus:bg-white transition-all"
                        />
                        {errors.firstName && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>
                      <div className="flex-1">
                        <label className="block text-[11px] font-semibold tracking-widest text-slate-400 mb-2">
                          นามสกุล
                        </label>
                        <input
                          {...registeredField("lastName")}
                          type="text"
                          placeholder="ใจดี"
                          className="w-full px-3.5 py-2.5 text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl placeholder:text-slate-300 outline-none focus:border-blue-500 focus:bg-white transition-all"
                        />
                        {errors.lastName && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* เบอร์ */}
                    <div className="mb-6">
                      <label className="block text-[11px] font-semibold tracking-widest text-slate-400 mb-2">
                        เบอร์โทรศัพท์
                      </label>
                      <input
                        {...registeredField("phone")}
                        type="tel"
                        placeholder="08X-XXX-XXXX"
                        className="w-full px-3.5 py-2.5 text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl placeholder:text-slate-300 outline-none focus:border-blue-500 focus:bg-white transition-all"
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
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
                        onClick={handleSubmit(onSubmit)}
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
                        มีบัญชีอยู่แล้ว?
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
