import { Cairo } from "next/font/google";

export const cairo = Cairo({
  subsets: ["arabic"], // ضروري لدعم العربي
  weight: ["400", "500", "700"], // اختر الأوزان يلي بدك ياها
  variable: "--font-cairo",
});
