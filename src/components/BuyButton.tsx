"use client";

export type BuyDetail = { name: string; price: string } | null;

export const OPEN_ZALO_EVENT = "open-zalo";

export function openZalo(detail: BuyDetail) {
  window.dispatchEvent(new CustomEvent<BuyDetail>(OPEN_ZALO_EVENT, { detail }));
}

export function BuyButton({ name, price }: { name: string; price: string }) {
  return (
    <button type="button" className="btn btn-buy" onClick={() => openZalo({ name, price })}>
      Mua ngay
    </button>
  );
}

export function ContactButton({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <button type="button" className={className} onClick={() => openZalo(null)}>
      {children}
    </button>
  );
}
