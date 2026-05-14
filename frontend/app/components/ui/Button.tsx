type ButtonVariant =
  | "primary"
  | "secondary"
  | "inverted"
  | "outlined"
  | "custom";

interface Buttonprops {
  disabled?: boolean;
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  variant = "primary",
  children,
  disabled,
  onClick,
  className,
}: Buttonprops) {
  const variants = {
    primary: "bg-primary text-white font-medium px-4 py-2",
    secondary: "bg-secondary text-white font-medium px-4 py-2",
    inverted: "bg-neutral-800 text-white font-medium px-4 py-2",
    outlined:
      "bg-white text-neutral-800 border border-neutral-300 font-medium px-4 py-2",
    custom: "",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-md ${variants[variant]} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
}
