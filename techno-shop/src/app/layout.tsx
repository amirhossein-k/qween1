import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "تکنوشاپ | فروشگاه تخصصی گجت‌های هوشمند و ساعت پرو ایکس",
  description: "مرجع تخصصی عرضه جدیدترین گجت‌های هوشمند، ساعت‌های ورزشی و لوازم جانبی دیجیتال با ضمانت اصالت کالا.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className="h-full antialiased">
      <body className="min-h-full flex flex-col dot-grid">{children}</body>
    </html>
  );
}
