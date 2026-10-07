"use client";

import { useEffect, useRef, useState } from "react";
import { OPEN_ZALO_EVENT, type BuyDetail } from "./BuyButton";

type Props = {
  phone: string;
  phoneDisplay: string;
  zaloLink: string;
  qrSvg: string;
};

export function ZaloDialog({ phone, phoneDisplay, zaloLink, qrSvg }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [item, setItem] = useState<BuyDetail>(null);
  const [copied, setCopied] = useState<"" | "phone" | "msg">("");

  useEffect(() => {
    const onOpen = (e: Event) => {
      setItem((e as CustomEvent<BuyDetail>).detail);
      setCopied("");
      ref.current?.showModal();
    };
    window.addEventListener(OPEN_ZALO_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_ZALO_EVENT, onOpen);
  }, []);

  const message = item
    ? `Chào shop, mình muốn mua ${item.name} (${item.price}).`
    : "Chào shop, mình cần tư vấn mua tài khoản AI.";

  const copy = async (text: string, key: "phone" | "msg") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
    } catch {
      setCopied("");
    }
  };

  return (
    <dialog
      ref={ref}
      className="zalo-dialog"
      aria-labelledby="zalo-title"
      onClick={(e) => e.target === ref.current && ref.current?.close()}
    >
      <div className="zalo-body">
        <button type="button" className="zalo-close" aria-label="Đóng" onClick={() => ref.current?.close()}>
          ×
        </button>

        <h2 id="zalo-title">{item ? "Đặt mua qua Zalo" : "Liên hệ qua Zalo"}</h2>

        {item && (
          <div className="zalo-item">
            <span>{item.name}</span>
            <strong>{item.price}</strong>
          </div>
        )}

        <ol className="zalo-steps">
          <li>Bấm nút bên dưới để mở Zalo (hoặc quét mã QR).</li>
          <li>Gửi tin nhắn kèm tên gói muốn mua.</li>
          <li>Thanh toán và nhận tài khoản trong vài phút.</li>
        </ol>

        <div className="zalo-main">
          <div className="zalo-qr" aria-label={`Mã QR Zalo ${phoneDisplay}`} dangerouslySetInnerHTML={{ __html: qrSvg }} />
          <div className="zalo-actions">
            <a className="btn btn-zalo" href={zaloLink} target="_blank" rel="noopener noreferrer">
              Mở Zalo chat
            </a>
            <button type="button" className="btn btn-ghost" onClick={() => copy(phone, "phone")}>
              {copied === "phone" ? "Đã chép số" : `Chép số ${phoneDisplay}`}
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => copy(message, "msg")}>
              {copied === "msg" ? "Đã chép tin nhắn" : "Chép tin nhắn mẫu"}
            </button>
          </div>
        </div>

        <p className="zalo-msg">
          Tin nhắn mẫu: <em>{message}</em>
        </p>
      </div>
    </dialog>
  );
}
