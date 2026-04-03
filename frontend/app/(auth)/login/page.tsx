import Button from "@/app/components/ui/Button";
import InputField from "@/app/components/ui/InputField";
import SocialLoginButton from "@/app/components/ui/SocialLoginButton";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <main className="shadow-xl grid grid-cols-2 w-full max-w-5xl min-h-160 rounded-2xl overflow-hidden">
        <div
          className={`relative bg-cover p-10 bg-[url(/images/bg/office_BG.webp)]`}
        >
          <div className="absolute inset-0 bg-linear-to-b from-white/80 to-gray-500/95" />
          <div className="relative z-10">
            <p className="text-primary font-bold text-xl">Partify</p>
          </div>
          <div className=""></div>
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
              className="w-full"
              variant="grayed"
              icon={"skill-icons:linkedin"}
            >
              LinkedIn
            </SocialLoginButton>
          </div>{" "}
          <div className="py-5 flex flex-col gap-5">
            <InputField label={"Email Address"} />
            <InputField label={"Password"} forgotPassword />
          </div>
        </div>
      </main>
    </div>
  );
}
