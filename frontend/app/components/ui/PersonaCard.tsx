export default function DemoAccountCard() {
  return (
    <div className="backdrop-blur-md w-full max-w-70 rounded-2xl border border-white/30 bg-white/15 p-5">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-xs font-medium uppercase tracking-wider text-white/70">
          Demo accounts
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <div className="rounded-xl bg-white/10 px-3 py-2.5">
          <p className="mb-1 text-[11px] font-medium text-white/60">
            บัญชีผู้สมัคร
          </p>
          <p className="text-sm font-medium text-white">john@example.com</p>
        </div>
        <div className="rounded-xl bg-white/10 px-3 py-2.5">
          <p className="mb-1 text-[11px] font-medium text-white/60">
            บัญชีนายจ้าง
          </p>
          <p className="text-sm font-medium text-white">
            employer1@syntech.com
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 border-t border-white/20 pt-3">
        <span className="text-xs text-white/60">รหัสผ่าน:</span>
        <span className="font-mono text-sm font-medium text-white">
          password123
        </span>
      </div>
    </div>
  );
}
