import { Icon } from "@iconify/react";
import Link from "next/link";

function EmptyState({
  icon,
  title,
  sub,
  href,
  cta,
}: {
  icon: string;
  title: string;
  sub: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
        <Icon icon={icon} width="22" className="text-gray-400" />
      </div>
      <p className="text-sm font-medium text-gray-700 mb-1">{title}</p>
      <p className="text-xs text-gray-400 mb-5">{sub}</p>
      <Link
        href={href}
        className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
      >
        {cta} →
      </Link>
    </div>
  );
}
export default EmptyState;
