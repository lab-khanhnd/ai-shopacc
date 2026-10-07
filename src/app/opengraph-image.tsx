import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { PRODUCTS, SITE, formatVnd, productName } from "@/data/products";

export const alt = "Bảng giá tài khoản AI: ChatGPT Plus, Claude Pro, Gemini, Cursor, Midjourney";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const bold = readFile(join(process.cwd(), "assets/BeVietnamPro-Bold.ttf"));
const medium = readFile(join(process.cwd(), "assets/BeVietnamPro-Medium.ttf"));

export default async function Image() {
  const hot = PRODUCTS.filter((p) => p.hot).slice(0, 5);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#f7f6f2", padding: 64, fontFamily: "BVP", color: "#17181c" }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, paddingRight: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, fontWeight: 700 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 56, height: 56, borderRadius: 14, background: "#17181c", color: "#fff", fontSize: 22 }}>
              AI
            </div>
            <div style={{ display: "flex" }}>
              Shop<span style={{ color: "#0068ff" }}>Acc</span>
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 58, fontWeight: 700, lineHeight: 1.15, marginTop: 56, letterSpacing: -1 }}>
            Mua tài khoản AI giá tốt, dùng ngay trong vài phút
          </div>
          <div style={{ display: "flex", fontSize: 24, fontWeight: 500, color: "#696a70", marginTop: 24, flexDirection: "column" }}>
            <span>Bảo hành trọn gói</span>
            <span>Tư vấn qua Zalo {SITE.zaloPhoneDisplay}</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", width: 470, background: "#fff", borderRadius: 24, border: "1px solid #e6e3dc", padding: "24px 28px" }}>
          <div style={{ display: "flex", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Bán chạy nhất</div>
          {hot.map((p) => (
            <div key={p.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 21, fontWeight: 500, padding: "14px 0", gap: 16, borderTop: "1px solid #eeece6" }}>
              <span>{productName(p)}</span>
              <span style={{ color: "#d4480b", fontWeight: 700 }}>{formatVnd(p.price)}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "BVP", data: await bold, weight: 700, style: "normal" },
        { name: "BVP", data: await medium, weight: 500, style: "normal" },
      ],
    },
  );
}
