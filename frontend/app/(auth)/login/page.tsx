export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <main className="shadow-xl grid grid-cols-2 w-full max-w-5xl min-h-100 rounded-2xl overflow-hidden">
        <div
          className={`relative bg-cover p-10 bg-[url(/images/bg/office_BG.webp)]`}
        >
          <div className="absolute inset-0 bg-linear-to-b from-white/80 to-gray-500/95" />
          <div className="relative z-10">
            <p className="text-primary font-bold text-xl">Partify</p>
          </div>
          <div className=""></div>
        </div>
        <div>2</div>
      </main>
    </div>
  );
}
