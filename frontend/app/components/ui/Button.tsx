type ButtonVariant =
  | "primary"
  | "secondary"
  | "inverted"
  | "outlined"
  | "custom";

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
      className={` rounded-md ${variants[variant]} ${classname}`}
    >
      {children}
    </button>
  );
}
