type ButtonVariant = "primary" | "secondary" | "inverted" | "outlined";

interface Buttonprops {
  variant?: ButtonVariant;
  children: React.ReactNode;
  classname?: string;
  onClick?: () => void;
}

export default function Button({
  variant = "primary",
  children,
  onClick,
  classname,
}: Buttonprops) {
  const variants = {
    primary: "bg-primary text-white",
    secondary: "bg-secondary text-white",
    inverted: "bg-neutral-800 text-white",
    outlined: "bg-white text-neutral-800 border border-neutral-300",
  };
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md font-medium ${variants[variant]} ${classname}`}
    >
      {children}
    </button>
  );
}
