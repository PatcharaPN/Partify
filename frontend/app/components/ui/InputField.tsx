interface InputFieldProps {
  label: string;
  type?: string;
  forgotPassword?: boolean;
}

export default function InputField({
  label,
  type = "text",
  forgotPassword,
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
        type={type}
        className="bg-[#F3F4F5] rounded-xl px-4 py-4 outline-none"
      />
    </div>
  );
}
