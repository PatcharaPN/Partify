interface InputFieldProps {
  label: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  forgotPassword?: boolean;
}

export default function InputField({
  label,
  type = "text",
  forgotPassword,
  value,
  onChange,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <label className="font-bold text-sm text-neutral-600">{label}</label>
        {forgotPassword && (
          <a href="#" className="text-sm text-blue-600 font-semibold">
            Forgot Password?
          </a>
        )}
      </div>
      <input
        value={value}
        onChange={onChange}
        type={type}
        className="bg-[#F3F4F5] rounded-xl px-4 py-2 outline-none"
      />
    </div>
  );
}
