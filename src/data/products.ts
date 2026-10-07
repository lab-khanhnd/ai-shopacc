// Toàn bộ thông tin shop và bảng giá nằm ở file này.
// Muốn đổi giá / thêm / bớt sản phẩm chỉ cần sửa ở đây.

export const SITE = {
  name: "AI Shop Acc",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  zaloPhone: "0348786464",
  zaloPhoneDisplay: "0348 786 464",
  // Sửa mỗi khi cập nhật bảng giá
  priceUpdated: "10/2026",
  year: 2026,
  description:
    "Bán tài khoản AI chính hãng giá rẻ: ChatGPT Plus, Claude Pro, Gemini, Grok, Cursor, Midjourney, ElevenLabs... Bảng giá rõ ràng, bảo hành đủ thời gian, hỗ trợ nhanh qua Zalo.",
};

export const zaloLink = `https://zalo.me/${SITE.zaloPhone}`;

export type Category = {
  id: string;
  name: string;
  description: string;
};

export type Product = {
  id: string;
  brand: string;
  plan: string;
  category: Category["id"];
  /** Giá bán của shop (VND) */
  price: number;
  /** Giá gốc niêm yết của hãng (USD / tháng) — chỉ để tham khảo */
  officialUsd: number;
  period: string;
  features: string[];
  hot?: boolean;
};

export const CATEGORIES: Category[] = [
  { id: "chat", name: "Chat AI", description: "Trợ lý AI đa năng: hỏi đáp, viết lách, phân tích, học tập." },
  { id: "code", name: "Lập trình", description: "AI hỗ trợ viết code, sửa lỗi, dựng web và ứng dụng." },
  { id: "image-video", name: "Ảnh & Video", description: "Tạo ảnh, dựng video, thiết kế bằng AI." },
  { id: "audio", name: "Giọng nói & Âm nhạc", description: "Chuyển văn bản thành giọng nói, tạo nhạc, video avatar." },
  { id: "work", name: "Văn phòng", description: "Làm slide, ghi chú, sửa ngữ pháp, viết lại văn bản." },
];

export const PRODUCTS: Product[] = [
  // ----- Chat AI -----
  { id: "chatgpt-plus", brand: "ChatGPT", plan: "Plus", category: "chat", price: 450000, officialUsd: 20, period: "1 tháng", hot: true,
    features: ["Model GPT mới nhất", "Tạo ảnh, phân tích file", "Deep research, Agent"] },
  { id: "chatgpt-pro", brand: "ChatGPT", plan: "Pro", category: "chat", price: 4500000, officialUsd: 200, period: "1 tháng",
    features: ["Gần như không giới hạn", "Model Pro suy luận mạnh nhất", "Ưu tiên tính năng mới"] },
  { id: "chatgpt-business", brand: "ChatGPT", plan: "Business", category: "chat", price: 650000, officialUsd: 30, period: "1 tháng",
    features: ["Không dùng dữ liệu để train", "Không gian làm việc nhóm", "Kết nối Drive, SharePoint"] },
  { id: "claude-pro", brand: "Claude", plan: "Pro", category: "chat", price: 450000, officialUsd: 20, period: "1 tháng", hot: true,
    features: ["Viết lách, phân tích tài liệu dài", "Có Claude Code", "Projects, Research"] },
  { id: "claude-max-5x", brand: "Claude", plan: "Max 5x", category: "chat", price: 2300000, officialUsd: 100, period: "1 tháng",
    features: ["Gấp 5 lần hạn mức Pro", "Claude Code dùng nặng", "Ưu tiên khi quá tải"] },
  { id: "claude-max-20x", brand: "Claude", plan: "Max 20x", category: "chat", price: 4500000, officialUsd: 200, period: "1 tháng",
    features: ["Gấp 20 lần hạn mức Pro", "Dành cho dev chuyên nghiệp", "Ưu tiên tính năng mới"] },
  { id: "google-ai-pro", brand: "Google AI", plan: "Pro (Gemini)", category: "chat", price: 350000, officialUsd: 19.99, period: "1 tháng", hot: true,
    features: ["Gemini Pro, Deep Research", "Tạo video Veo, NotebookLM", "Kèm 2TB Google Drive"] },
  { id: "google-ai-ultra", brand: "Google AI", plan: "Ultra", category: "chat", price: 5500000, officialUsd: 249.99, period: "1 tháng",
    features: ["Hạn mức cao nhất của Gemini", "Veo bản cao nhất", "Kèm 30TB lưu trữ, YouTube Premium"] },
  { id: "supergrok", brand: "Grok", plan: "SuperGrok", category: "chat", price: 650000, officialUsd: 30, period: "1 tháng",
    features: ["Grok model mới nhất", "Tạo ảnh, video Imagine", "Hạn mức cao"] },
  { id: "supergrok-heavy", brand: "Grok", plan: "SuperGrok Heavy", category: "chat", price: 6500000, officialUsd: 300, period: "1 tháng",
    features: ["Grok Heavy", "Hạn mức cao nhất", "Ưu tiên tính năng mới"] },
  { id: "perplexity-pro", brand: "Perplexity", plan: "Pro", category: "chat", price: 250000, officialUsd: 20, period: "1 tháng",
    features: ["Tìm kiếm có trích nguồn", "Chọn nhiều model AI", "Upload file không giới hạn"] },
  { id: "perplexity-max", brand: "Perplexity", plan: "Max", category: "chat", price: 4500000, officialUsd: 200, period: "1 tháng",
    features: ["Không giới hạn Labs", "Model cao cấp nhất", "Trình duyệt Comet"] },
  { id: "m365-premium", brand: "Microsoft", plan: "365 Premium (Copilot)", category: "chat", price: 450000, officialUsd: 19.99, period: "1 tháng",
    features: ["Copilot trong Word, Excel, PowerPoint", "Office bản quyền", "1TB OneDrive"] },

  // ----- Lập trình -----
  { id: "cursor-pro", brand: "Cursor", plan: "Pro", category: "code", price: 450000, officialUsd: 20, period: "1 tháng", hot: true,
    features: ["Agent viết code trong IDE", "Tab autocomplete không giới hạn", "Chọn Claude, GPT, Gemini"] },
  { id: "cursor-pro-plus", brand: "Cursor", plan: "Pro+", category: "code", price: 1350000, officialUsd: 60, period: "1 tháng",
    features: ["Gấp 3 lần hạn mức Pro", "Background agents", "Phù hợp dùng hằng ngày"] },
  { id: "cursor-ultra", brand: "Cursor", plan: "Ultra", category: "code", price: 4500000, officialUsd: 200, period: "1 tháng",
    features: ["Gấp 20 lần hạn mức Pro", "Ưu tiên tính năng mới", "Cho team dùng nặng"] },
  { id: "copilot-pro", brand: "GitHub Copilot", plan: "Pro", category: "code", price: 230000, officialUsd: 10, period: "1 tháng",
    features: ["Gợi ý code trong VS Code, JetBrains", "Chat và agent mode", "Nhiều model cao cấp"] },
  { id: "copilot-pro-plus", brand: "GitHub Copilot", plan: "Pro+", category: "code", price: 900000, officialUsd: 39, period: "1 tháng",
    features: ["Hạn mức premium cao hơn", "Toàn bộ model", "Coding agent"] },
  { id: "windsurf-pro", brand: "Windsurf", plan: "Pro", category: "code", price: 350000, officialUsd: 15, period: "1 tháng",
    features: ["IDE AI với Cascade agent", "Credits model cao cấp", "Preview và deploy nhanh"] },
  { id: "lovable-pro", brand: "Lovable", plan: "Pro", category: "code", price: 550000, officialUsd: 25, period: "1 tháng",
    features: ["Dựng web bằng câu lệnh", "Tên miền riêng", "Dự án riêng tư"] },
  { id: "v0-premium", brand: "v0", plan: "Premium", category: "code", price: 450000, officialUsd: 20, period: "1 tháng",
    features: ["Tạo giao diện React/Next.js", "Deploy lên Vercel", "Import từ Figma"] },

  // ----- Ảnh & Video -----
  { id: "midjourney-basic", brand: "Midjourney", plan: "Basic", category: "image-video", price: 230000, officialUsd: 10, period: "1 tháng",
    features: ["~200 ảnh/tháng", "Dùng trên web và Discord", "Bản quyền thương mại"] },
  { id: "midjourney-standard", brand: "Midjourney", plan: "Standard", category: "image-video", price: 690000, officialUsd: 30, period: "1 tháng", hot: true,
    features: ["15 giờ Fast GPU", "Relax không giới hạn", "Tạo video"] },
  { id: "midjourney-pro", brand: "Midjourney", plan: "Pro", category: "image-video", price: 1350000, officialUsd: 60, period: "1 tháng",
    features: ["30 giờ Fast GPU", "Stealth mode", "Relax video"] },
  { id: "midjourney-mega", brand: "Midjourney", plan: "Mega", category: "image-video", price: 2700000, officialUsd: 120, period: "1 tháng",
    features: ["60 giờ Fast GPU", "Stealth mode", "12 job cùng lúc"] },
  { id: "kling-standard", brand: "Kling AI", plan: "Standard", category: "image-video", price: 230000, officialUsd: 10, period: "1 tháng",
    features: ["660 credits/tháng", "Video không watermark", "Tạo video từ ảnh"] },
  { id: "runway-standard", brand: "Runway", plan: "Standard", category: "image-video", price: 350000, officialUsd: 15, period: "1 tháng",
    features: ["625 credits/tháng", "Gen-4 video", "Xuất không watermark"] },
  { id: "runway-pro", brand: "Runway", plan: "Pro", category: "image-video", price: 800000, officialUsd: 35, period: "1 tháng",
    features: ["2250 credits/tháng", "Voice, lip sync", "Custom voice"] },
  { id: "canva-pro", brand: "Canva", plan: "Pro", category: "image-video", price: 99000, officialUsd: 15, period: "1 tháng", hot: true,
    features: ["Kho template, ảnh Pro", "Magic Studio AI", "Xoá nền, đổi kích thước"] },
  { id: "capcut-pro", brand: "CapCut", plan: "Pro", category: "image-video", price: 150000, officialUsd: 9.99, period: "1 tháng",
    features: ["Hiệu ứng, font Pro", "Xoá watermark", "Phụ đề tự động"] },

  // ----- Giọng nói & Âm nhạc -----
  { id: "elevenlabs-starter", brand: "ElevenLabs", plan: "Starter", category: "audio", price: 120000, officialUsd: 5, period: "1 tháng",
    features: ["30k credits/tháng", "Clone giọng nhanh", "Bản quyền thương mại"] },
  { id: "elevenlabs-creator", brand: "ElevenLabs", plan: "Creator", category: "audio", price: 500000, officialUsd: 22, period: "1 tháng", hot: true,
    features: ["100k credits/tháng", "Clone giọng chuyên nghiệp", "Âm thanh 192kbps"] },
  { id: "elevenlabs-pro", brand: "ElevenLabs", plan: "Pro", category: "audio", price: 2200000, officialUsd: 99, period: "1 tháng",
    features: ["500k credits/tháng", "Xuất 44.1kHz PCM", "Dùng qua API"] },
  { id: "suno-pro", brand: "Suno", plan: "Pro", category: "audio", price: 230000, officialUsd: 10, period: "1 tháng",
    features: ["~500 bài hát/tháng", "Model mới nhất", "Bản quyền thương mại"] },
  { id: "suno-premier", brand: "Suno", plan: "Premier", category: "audio", price: 690000, officialUsd: 30, period: "1 tháng",
    features: ["~2000 bài hát/tháng", "Suno Studio", "Bản quyền thương mại"] },
  { id: "heygen-creator", brand: "HeyGen", plan: "Creator", category: "audio", price: 650000, officialUsd: 29, period: "1 tháng",
    features: ["Video avatar AI", "Dịch video, lồng tiếng", "Không watermark"] },

  // ----- Văn phòng -----
  { id: "gamma-plus", brand: "Gamma", plan: "Plus", category: "work", price: 230000, officialUsd: 10, period: "1 tháng",
    features: ["Tạo slide bằng AI", "Bỏ logo Gamma", "Xuất PDF, PPTX"] },
  { id: "gamma-pro", brand: "Gamma", plan: "Pro", category: "work", price: 450000, officialUsd: 20, period: "1 tháng",
    features: ["AI không giới hạn", "Model ảnh cao cấp", "Tên miền riêng"] },
  { id: "notion-business", brand: "Notion", plan: "Business (AI)", category: "work", price: 450000, officialUsd: 20, period: "1 tháng",
    features: ["Notion AI đầy đủ", "Ghi chú cuộc họp AI", "Tìm kiếm trên nhiều app"] },
  { id: "grammarly-pro", brand: "Grammarly", plan: "Pro", category: "work", price: 150000, officialUsd: 30, period: "1 tháng",
    features: ["Sửa ngữ pháp tiếng Anh", "Viết lại cả câu", "Kiểm tra đạo văn"] },
  { id: "quillbot-premium", brand: "QuillBot", plan: "Premium", category: "work", price: 120000, officialUsd: 19.95, period: "1 tháng",
    features: ["Paraphrase không giới hạn", "Tóm tắt văn bản", "Kiểm tra đạo văn"] },
];

export const formatVnd = (n: number) => n.toLocaleString("vi-VN") + "đ";

export const productName = (p: Product) => `${p.brand} ${p.plan}`;

// Ký hiệu + màu nhận diện cho từng hãng (dùng cho ô logo chữ trên thẻ sản phẩm)
export const BRANDS: Record<string, { mark: string; color: string }> = {
  ChatGPT: { mark: "GPT", color: "#0f8a6c" },
  Claude: { mark: "Cl", color: "#c15f3c" },
  "Google AI": { mark: "G", color: "#3b6fd8" },
  Grok: { mark: "Gk", color: "#2b2b2b" },
  Perplexity: { mark: "Px", color: "#1f7a85" },
  Microsoft: { mark: "MS", color: "#0a6cbc" },
  Cursor: { mark: "Cu", color: "#2b2b2b" },
  "GitHub Copilot": { mark: "GH", color: "#3d4450" },
  Windsurf: { mark: "Ws", color: "#0b7f70" },
  Lovable: { mark: "Lv", color: "#d6395f" },
  v0: { mark: "v0", color: "#2b2b2b" },
  Midjourney: { mark: "MJ", color: "#3a3a46" },
  "Kling AI": { mark: "Kl", color: "#13915a" },
  Runway: { mark: "Rw", color: "#2b2b2b" },
  Canva: { mark: "Ca", color: "#0a9aa4" },
  CapCut: { mark: "CC", color: "#2b2b2b" },
  ElevenLabs: { mark: "11", color: "#2b2b2b" },
  Suno: { mark: "Su", color: "#c8562a" },
  HeyGen: { mark: "HG", color: "#6448e0" },
  Gamma: { mark: "Ga", color: "#6a3fd8" },
  Notion: { mark: "N", color: "#2b2b2b" },
  Grammarly: { mark: "Gr", color: "#0e9f7a" },
  QuillBot: { mark: "QB", color: "#4a8b3c" },
};

export const brandOf = (name: string) => BRANDS[name] ?? { mark: name.slice(0, 2), color: "#2b2b2b" };
