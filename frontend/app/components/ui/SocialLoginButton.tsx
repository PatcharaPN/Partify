import { Icon, IconifyIcon } from "@iconify/react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "inverted"
  | "outlined"
  | "grayed"
  | "custom";

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
    primary: "bg-primary text-white hover:bg-primary/80",
    secondary: "bg-secondary text-white hover:bg-secondary/80",
    inverted: "bg-neutral-800 text-white hover:bg-neutral-700",
    outlined:
      "bg-white text-neutral-800 border border-neutral-300 hover:bg-neutral-50",
    grayed: "bg-[#F3F4F5] text-neutral-800 hover:bg-neutral-200",
    custom: "",
  };
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer flex items-center justify-center gap-3 min-w-10 px-4 py-2 rounded-md font-medium transition-colors ${variants[variant]} ${className}`}
    >
      {icon && <Icon icon={icon} />}
      {children}
    </button>
  );
}
