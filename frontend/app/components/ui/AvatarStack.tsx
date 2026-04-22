export default function AvatarStack({
  avatars,
  count,
}: {
  avatars: string[];
  count: number;
}) {
  const shown = avatars.slice(0, 3);
  const extra = count - shown.length;

  return (
    <div className="flex items-center">
      {shown.map((url, i) => (
        <img
          key={i}
          src={url}
          alt="avatar"
          className="w-7 h-7 rounded-full border-2 border-white -ml-2 first:ml-0 object-cover"
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
