"use client";
import Button from "@/app/components/ui/Button";
import InputField from "@/app/components/ui/InputField";
import PersonaCard from "@/app/components/ui/PersonaCard";
import SocialLoginButton from "@/app/components/ui/SocialLoginButton";
import { useAppDispatch } from "@/app/lib/hooks";
import { login } from "@/app/store/slices/authSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const navigate = useRouter();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    try {
      await dispatch(login({ email, password })).unwrap();
      navigate.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const lineApiLogin = () => {
    window.location.href = "http://localhost:3001/auth/line";
  };
  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <main className="z-10 bg-white shadow-xl grid grid-cols-2 w-full max-w-5xl min-h-100 rounded-2xl overflow-hidden">
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
                  Your time,
                  <br />
                  <span className="text-white">your terms.</span>
                </span>
                <p className="text-md w-2/3 text-white">
                  Join a community of high-caliber professionals and premium
                  recruiters redefining part-time excellence.
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
            <h1 className="text-2xl font-bold mb-2">Welcome.</h1>
            <p>Please enter your details to sign In</p>
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
          <div className="flex items-center gap-4 py-5">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-400 tracking-widest">
              OR CONTINUE WITH
            </span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          <div className="py-5 flex flex-col gap-5">
            <InputField
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputField
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button onClick={handleLogin} classname="w-full py-3">
            Sign In
          </Button>
          <div className="flex items-center justify-start gap-2 mt-4">
            <input type="checkbox" />
            <p className="text-xs">Remember this account for 30 days</p>
          </div>
          <span className="text-xs text-center mt-6 block">
            Don't have an account?{" "}
            <Link
              className="text-blue-600 font-semibold hover:underline"
              href={"/register"}
            >
              Sign Up
            </Link>
          </span>
        </div>
      </main>
      <div className="left-25 bottom-10 z-0 opacity-20 absolute rounded-full bg-primary blur-3xl w-50 h-50"></div>
      <div className="right-25 top-10 z-0 opacity-20 absolute rounded-full bg-primary blur-3xl w-50 h-50"></div>
    </div>
  );
}
