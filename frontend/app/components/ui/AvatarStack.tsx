export default function AvatarStack({
  colors,
  count,
}: {
  colors: string[];
  count: number;
}) {
  const shown = colors.slice(0, 3);
  const extra = count - shown.length;
  return (
    <div className="flex items-center">
      {shown.map((color, i) => (
        <div
          key={i}
          className={`w-7 h-7 rounded-full border-2 border-white ${color} -ml-2 first:ml-0 flex items-center justify-center text-white text-[9px] font-semibold shadow-sm`}
        />
      ))}
      {extra > 0 && (
        <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-100 -ml-2 flex items-center justify-center text-gray-500 text-[9px] font-medium">
          +{extra}
        </div>
      )}
    </div>
  );
}
