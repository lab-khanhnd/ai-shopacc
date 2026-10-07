import QRCode from "qrcode";
import { BuyButton, ContactButton } from "@/components/BuyButton";
import { ZaloDialog } from "@/components/ZaloDialog";
import {
  BRANDS,
  CATEGORIES,
  PRODUCTS,
  SITE,
  brandOf,
  formatVnd,
  productName,
  zaloLink,
  type Product,
} from "@/data/products";

const FAQS = [
  {
    q: "Tài khoản là loại gì, có phải dùng chung không?",
    a: "Shop nâng cấp gói trên chính tài khoản (email) của bạn hoặc cấp tài khoản riêng, tuỳ gói. Bạn nhắn Zalo để được tư vấn loại phù hợp.",
  },
  {
    q: "Bao lâu thì nhận được tài khoản?",
    a: "Thường từ 5 đến 30 phút sau khi thanh toán, trong giờ hành chính có thể nhanh hơn.",
  },
  {
    q: "Có bảo hành không?",
    a: "Có. Mọi gói đều được bảo hành đủ thời gian sử dụng. Nếu gặp lỗi, shop sẽ hỗ trợ hoặc đổi mới.",
  },
  {
    q: "Thanh toán bằng cách nào?",
    a: "Chuyển khoản ngân hàng, MoMo hoặc ZaloPay. Thông tin thanh toán sẽ được gửi khi bạn nhắn Zalo.",
  },
  {
    q: "Giá hãng là gì?",
    a: "Là giá niêm yết của hãng (USD/tháng), chỉ để bạn tham khảo và so sánh. Giá hãng có thể thay đổi theo thời điểm.",
  },
];

const STEPS = [
  { t: "Chọn gói", d: "Bấm “Mua ngay” ở gói bạn cần trong bảng giá." },
  { t: "Nhắn Zalo", d: `Gửi tên gói tới Zalo ${SITE.zaloPhoneDisplay}.` },
  { t: "Thanh toán", d: "Chuyển khoản, MoMo hoặc ZaloPay." },
  { t: "Nhận tài khoản", d: "Shop gửi thông tin và hướng dẫn sử dụng." },
];

function BrandMark({ brand, size = "md" }: { brand: string; size?: "sm" | "md" }) {
  const b = brandOf(brand);
  return (
    <span className={`mark mark-${size}`} style={{ "--brand": b.color } as React.CSSProperties} aria-hidden="true">
      {b.mark}
    </span>
  );
}

function ProductCard({ p }: { p: Product }) {
  const priceText = `${formatVnd(p.price)} / ${p.period}`;
  return (
    <article id={p.id} className={`card${p.hot ? " card-hot" : ""}`}>
      <header className="card-head">
        <BrandMark brand={p.brand} />
        <div>
          <p className="card-brand">{p.brand}</p>
          <h3 className="card-plan">{p.plan}</h3>
        </div>
        {p.hot && <span className="tag">Bán chạy</span>}
      </header>

      <div className="card-price">
        <strong>{formatVnd(p.price)}</strong>
        <span>/{p.period}</span>
      </div>
      <p className="card-official">Giá hãng ${p.officialUsd}/tháng</p>

      <ul className="card-features">
        {p.features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>

      <BuyButton name={productName(p)} price={priceText} />
    </article>
  );
}

export default async function Home() {
  const qrSvg = await QRCode.toString(zaloLink, { type: "svg", margin: 1, width: 160 });
  const hot = PRODUCTS.filter((p) => p.hot);
  const brandNames = Object.keys(BRANDS);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "OnlineStore",
      name: SITE.name,
      url: SITE.url,
      description: SITE.description,
      telephone: SITE.zaloPhone,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: SITE.zaloPhone,
        contactType: "sales",
        availableLanguage: "Vietnamese",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Bảng giá tài khoản AI",
      itemListElement: PRODUCTS.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Product",
          name: `Tài khoản ${productName(p)}`,
          description: p.features.join(", "),
          brand: { "@type": "Brand", name: p.brand },
          offers: {
            "@type": "Offer",
            price: p.price,
            priceCurrency: "VND",
            availability: "https://schema.org/InStock",
            url: `${SITE.url}/#${p.id}`,
          },
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <header className="topbar">
        <div className="container topbar-inner">
          <a href="#" className="logo" aria-label={`${SITE.name} — trang chủ`}>
            <span className="logo-mark">AI</span>
            <span>
              Shop<b>Acc</b>
            </span>
          </a>
          <nav className="topnav" aria-label="Chính">
            <a href="#bang-gia">Bảng giá</a>
            <a href="#cach-mua">Cách mua</a>
            <a href="#hoi-dap">Hỏi đáp</a>
          </nav>
          <ContactButton className="btn btn-primary btn-sm">
            <ZaloIcon /> {SITE.zaloPhoneDisplay}
          </ContactButton>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">Bảng giá cập nhật {SITE.priceUpdated}</p>
              <h1>
                Mua tài khoản AI <span className="hl">giá tốt</span>, dùng ngay trong vài phút
              </h1>
              <p className="lead">
                ChatGPT Plus, Claude Pro, Gemini, Grok, Cursor, Midjourney và hơn 40 gói khác. Giá rõ ràng, bảo hành đủ
                thời gian, tư vấn trực tiếp qua Zalo.
              </p>
              <div className="hero-cta">
                <a href="#bang-gia" className="btn btn-primary">
                  Xem bảng giá
                </a>
                <ContactButton className="btn btn-outline">Nhắn Zalo tư vấn</ContactButton>
              </div>
              <dl className="stats">
                <div>
                  <dt>Gói tài khoản</dt>
                  <dd>{PRODUCTS.length}+</dd>
                </div>
                <div>
                  <dt>Thời gian giao</dt>
                  <dd>5–30 phút</dd>
                </div>
                <div>
                  <dt>Bảo hành</dt>
                  <dd>Trọn gói</dd>
                </div>
              </dl>
            </div>

            <aside className="quick" aria-labelledby="quick-title">
              <div className="quick-head">
                <h2 id="quick-title">Bán chạy nhất</h2>
                <span>Giá / tháng</span>
              </div>
              <ul>
                {hot.map((p) => (
                  <li key={p.id}>
                    <a href={`#${p.id}`}>
                      <BrandMark brand={p.brand} size="sm" />
                      <span className="quick-name">{productName(p)}</span>
                      <span className="quick-price">{formatVnd(p.price)}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <a href="#bang-gia" className="quick-all">
                Xem tất cả {PRODUCTS.length} gói →
              </a>
            </aside>
          </div>

          <div className="container">
            <p className="brands">
              <span>Có sẵn:</span> {brandNames.join(" · ")}
            </p>
          </div>
        </section>

        <nav className="cats" aria-label="Danh mục sản phẩm">
          <div className="container cats-inner">
            {CATEGORIES.map((c) => (
              <a key={c.id} href={`#${c.id}`}>
                {c.name}
                <span>{PRODUCTS.filter((p) => p.category === c.id).length}</span>
              </a>
            ))}
          </div>
        </nav>

        <div id="bang-gia" className="container pricing">
          {CATEGORIES.map((c) => {
            const items = PRODUCTS.filter((p) => p.category === c.id);
            return (
              <section key={c.id} id={c.id} className="cat" aria-labelledby={`h-${c.id}`}>
                <div className="cat-head">
                  <h2 id={`h-${c.id}`}>Tài khoản {c.name}</h2>
                  <p>{c.description}</p>
                </div>
                <div className="grid">
                  {items.map((p) => (
                    <ProductCard key={p.id} p={p} />
                  ))}
                </div>
              </section>
            );
          })}
          <p className="note">
            Giá hãng chỉ mang tính tham khảo và có thể thay đổi. Cần gói 3, 6, 12 tháng hoặc gói không có trong danh
            sách, vui lòng nhắn Zalo để được báo giá.
          </p>
        </div>

        <section id="cach-mua" className="section">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">4 bước đơn giản</p>
              <h2>Cách mua tài khoản</h2>
            </div>
            <ol className="steps">
              {STEPS.map((s, i) => (
                <li key={s.t}>
                  <span className="step-num">{i + 1}</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="container">
          <div className="cta-band">
            <div>
              <h2>Không thấy gói bạn cần?</h2>
              <p>Nhắn Zalo cho shop để được báo giá gói dài hạn hoặc công cụ AI khác.</p>
            </div>
            <ContactButton className="btn btn-light">
              <ZaloIcon /> Chat Zalo {SITE.zaloPhoneDisplay}
            </ContactButton>
          </div>
        </section>

        <section id="hoi-dap" className="section">
          <div className="container faq-wrap">
            <div className="section-head">
              <p className="eyebrow">Hỏi đáp</p>
              <h2>Câu hỏi thường gặp</h2>
              <p className="muted">Chưa thấy câu trả lời? Nhắn Zalo {SITE.zaloPhoneDisplay}, shop phản hồi ngay.</p>
            </div>
            <div className="faq">
              {FAQS.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="container about">
          <h2>Vì sao nên mua tài khoản AI tại {SITE.name}?</h2>
          <p>
            Các công cụ AI như ChatGPT, Claude, Gemini hay Cursor ngày càng cần thiết cho học tập và công việc, nhưng
            thanh toán bằng thẻ quốc tế không phải ai cũng tiện. {SITE.name} giúp bạn mua tài khoản ChatGPT Plus, Claude
            Pro, Google AI Pro, SuperGrok, Cursor Pro, Midjourney, ElevenLabs, Canva Pro… bằng chuyển khoản trong nước,
            giá niêm yết công khai và được hỗ trợ trực tiếp qua Zalo trong suốt thời gian sử dụng.
          </p>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <a href="#" className="logo">
              <span className="logo-mark">AI</span>
              <span>
                Shop<b>Acc</b>
              </span>
            </a>
            <p className="muted">Tài khoản AI chính hãng, giá rõ ràng, hỗ trợ tận tình.</p>
          </div>
          <nav aria-label="Danh mục" className="footer-col">
            <h3>Danh mục</h3>
            {CATEGORIES.map((c) => (
              <a key={c.id} href={`#${c.id}`}>
                {c.name}
              </a>
            ))}
          </nav>
          <div className="footer-col">
            <h3>Liên hệ</h3>
            <p>Zalo / Điện thoại: {SITE.zaloPhoneDisplay}</p>
            <a href={zaloLink} target="_blank" rel="noopener noreferrer">
              zalo.me/{SITE.zaloPhone}
            </a>
          </div>
        </div>
        <div className="container footer-bottom">
          © {SITE.year} {SITE.name}. Tên sản phẩm và thương hiệu thuộc về chủ sở hữu tương ứng.
        </div>
      </footer>

      <ContactButton className="float-zalo">
        <ZaloIcon /> Chat Zalo
      </ContactButton>

      <ZaloDialog phone={SITE.zaloPhone} phoneDisplay={SITE.zaloPhoneDisplay} zaloLink={zaloLink} qrSvg={qrSvg} />
    </>
  );
}

function ZaloIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3C6.5 3 2 6.9 2 11.6c0 2.6 1.4 4.9 3.6 6.5L5 21l3.4-1.7c1.1.3 2.3.5 3.6.5 5.5 0 10-3.9 10-8.6S17.5 3 12 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}
