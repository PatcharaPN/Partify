import { z } from "zod";

export const registerSchema = z
  .object({
    role: z.enum(["CANDIDATE", "EMPLOYER"], {
      error: "กรุณาเลือกประเภทผู้ใช้",
    }),
    email: z
      .string()
      .min(1, "กรุณากรอกอีเมล")
      .check(z.email("รูปแบบอีเมลไม่ถูกต้อง")),
    password: z.string().min(8, "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร"),
    confirmPassword: z.string().min(8, "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร"),
    firstName: z.string().min(1, "กรุณากรอกชื่อ"),
    lastName: z.string().min(1, "กรุณากรอกนามสกุล"),
    phone: z.string().regex(/^0\d{8,9}$/, "เบอร์โทรศัพท์ไม่ถูกต้อง"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
  });

export type RegisterValues = z.infer<typeof registerSchema>;
