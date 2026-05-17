"use client";
import Button from "@/app/components/ui/Button";
import InputField from "@/app/components/ui/InputField";
import PersonaCard from "@/app/components/ui/PersonaCard";
import SocialLoginButton from "@/app/components/ui/SocialLoginButton";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { fetchCurrentUser, login } from "@/app/store/slices/authSlice";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const navigate = useRouter();
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  const { isAuthenticated } = useAppSelector((state) => state.AuthReducer);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate.push("/");
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate.push("/");
    }
  }, [isAuthenticated]);

  const handleLogin = async () => {
    try {
      await dispatch(login({ email, password })).unwrap();
      await dispatch(fetchCurrentUser());
    } catch (error) {
      console.log(error);
    }
  };
  const lineApiLogin = () => {
    window.location.href = "http://localhost:3001/auth/line";
  };
  return (
    <div className="relative flex items-center justify-center h-[calc(100vh-70px)]">
      <motion.main
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -24 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="z-10 bg-white shadow-xl grid grid-cols-2 w-full max-w-5xl min-h-100 rounded-2xl overflow-hidden"
      >
        <div
          className={`relative bg-cover p-10 bg-[url(/images/bg/office_BG.webp)]`}
        >
          {" "}
          <div className="absolute inset-0 bg-linear-to-r from-blue-700 to-blue-600/95" />
          <div className="relative z-10 h-full">
            <div className="flex flex-col justify-between h-full gap-10">
              <p className="text-white font-bold text-2xl">Partify</p>
              {/* {Persona Card} */}
              <div className="">
                <span className="text-3xl font-bold text-blue-100">
                  งานดี,
                  <br />
                  <span className="text-white">ในแบบที่คุณเลือก</span>
                </span>
                <p className="text-md w-2/3 text-white">
                  ร่วมเป็นส่วนหนึ่งของชุมชนผู้หางานและนายจ้างมืออาชีพ
                  ที่กำลังเปลี่ยนโลกของงานพาร์ทไทม์
                </p>
              </div>
              <div>
                {/* {Persona Card} */}
                <PersonaCard />
              </div>
            </div>
          </div>
        </div>
        <div className="p-10">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">ยินดีต้อนรับ</h1>
            <p>กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบ</p>
          </div>
          <div className="py-5 flex flex-col gap-5">
            <InputField
              label="อีเมล"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              {" "}
              <InputField
                type={visiblePassword ? "text" : "password"}
                placeholder="••••••••"
                label="รหัสผ่าน"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />{" "}
              <button
                type="button"
                onClick={() => setVisiblePassword(!visiblePassword)}
                className="absolute right-3 top-13 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <Icon
                  icon={
                    visiblePassword
                      ? "solar:eye-closed-linear"
                      : "solar:eye-linear"
                  }
                  className="w-4.5 h-4.5"
                />
              </button>
            </div>
          </div>{" "}
          <Button
            onClick={handleLogin}
            disabled={!email || !password}
            className="w-full py-3"
          >
            เข้าสู่ระบบ
          </Button>
          <div className="flex items-center gap-4 py-5">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-400 tracking-widest">
              หรือเข้าสู่ระบบด้วย
            </span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          <div className="flex items-center justify-center gap-4">
            {" "}
            <SocialLoginButton
              className="w-full"
              variant="grayed"
              icon={"devicon:google"}
            >
              Google
            </SocialLoginButton>
            <SocialLoginButton
              onClick={lineApiLogin}
              className="w-full bg-[#00B800] hover:bg-[#007200] text-white"
              variant="custom"
              icon={"simple-icons:line"}
            >
              Line
            </SocialLoginButton>
          </div>
          <div className="flex items-center justify-start gap-2 mt-4">
            <input type="checkbox" />
            <p className="text-xs">จดจำบัญชีนี้เป็นเวลา 30 วัน</p>
          </div>
          <div className="w-full flex justify-center">
            <span className="text-center text-sm text-slate-400 mt-4">
              ยังไม่มีบัญชี?
              <Link
                className="text-blue-600 px-2 hover:underline"
                href={"/register"}
              >
                สมัครสมาชิก
              </Link>
            </span>
          </div>
        </div>
      </motion.main>
      <div className="left-25 bottom-10 z-0 opacity-20 absolute rounded-full bg-primary blur-3xl w-50 h-50"></div>
      <div className="right-25 top-10 z-0 opacity-20 absolute rounded-full bg-primary blur-3xl w-50 h-50"></div>
    </div>
  );
}
