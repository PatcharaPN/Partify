import { Icon, IconifyIcon } from "@iconify/react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "inverted"
  | "outlined"
  | "grayed";

interface Buttonprops {
  variant?: ButtonVariant;
  icon?: string | IconifyIcon;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function SocialLoginButton({
  variant = "primary",
  children,
  icon,
  onClick,
  className,
}: Buttonprops) {
  const variants = {
    primary: "bg-primary text-white",
    secondary: "bg-secondary text-white",
    inverted: "bg-neutral-800 text-white",
    outlined: "bg-white text-neutral-800 border border-neutral-300",
    grayed: "bg-[#F3F4F5] text-neutral-800",
  };
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-3 min-w-10 px-4 py-2 rounded-md font-medium ${variants[variant]} ${className}`}
    >
      {icon && <Icon icon={icon} />}
      {children}
    </button>
  );
}
