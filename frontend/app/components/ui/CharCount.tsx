export const charCount = (val: string, max: number) => (
  <span
    className={`text-[11px] ${val.length > max * 0.9 ? "text-amber-500" : "text-neutral-300"}`}
  >
    {val.length}/{max}
  </span>
);
