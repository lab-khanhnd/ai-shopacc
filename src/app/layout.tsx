import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { SITE } from "@/data/products";
import "./globals.css";

const font = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Bán tài khoản AI giá rẻ: ChatGPT Plus, Claude, Gemini, Cursor | AI Shop Acc",
    template: "%s | AI Shop Acc",
  },
  description: SITE.description,
  keywords: [
    "mua tài khoản ChatGPT Plus",
    "tài khoản Claude Pro",
    "Gemini Pro giá rẻ",
    "Cursor Pro",
    "Midjourney",
    "bán tài khoản AI",
    "tài khoản AI giá rẻ",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "/",
    siteName: SITE.name,
    title: "Bán tài khoản AI giá rẻ, bảo hành đầy đủ",
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Bán tài khoản AI giá rẻ, bảo hành đầy đủ",
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f7f6f2",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi">
      <body className={font.className}>{children}</body>
    </html>
  );
}
