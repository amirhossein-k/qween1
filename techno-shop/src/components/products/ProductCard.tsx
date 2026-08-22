"use client";

import {
  brands,
  categories,
  colorOptions,
  discountPercent,
  formatPrice,
  labelOf,
  type Product,
} from "@/data/products";
import { BoltIcon, CartIcon, HeartIcon, StarIcon, TruckIcon } from "./icons";
import ProductArt from "./ProductArt";

type Props = {
  product: Product;
  view: "grid" | "list";
  liked: boolean;
  onLike: (id: number) => void;
  onAdd: (product: Product) => void;
  index: number;
};

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <StarIcon
          key={i}
          className={`h-3.5 w-3.5 ${i <= Math.round(rating) ? "text-amber-400" : "text-slate-600"}`}
        />
      ))}
    </span>
  );
}

export default function ProductCard({ product, view, liked, onLike, onAdd, index }: Props) {
  const off = discountPercent(product);
  const isList = view === "list";

  const media = (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br ${product.accent} dot-grid ${
        isList ? "h-40 w-full sm:h-44 sm:w-48" : "h-44 w-full sm:h-48"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(43,127,255,0.28),transparent_62%)]" />
      <ProductArt
        art={product.art}
        className={`prod-img relative z-10 transition-transform duration-500 group-hover:scale-108 ${
          isList ? "h-32" : "h-36 sm:h-40"
        } ${product.inStock ? "" : "opacity-45 grayscale"}`}
      />

      <div className="absolute top-2.5 right-2.5 z-20 flex flex-col items-start gap-1.5">
        {off > 0 && (
          <span className="badge-discount rounded-lg px-2 py-0.5 text-[11px] font-black text-white">
            ٪{off.toLocaleString("fa-IR")}
          </span>
        )}
        {product.isNew && (
          <span className="rounded-lg border border-emerald-400/40 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-300 backdrop-blur">
            جدید
          </span>
        )}
      </div>

      <button
        onClick={() => onLike(product.id)}
        aria-label="افزودن به علاقه‌مندی"
        className={`absolute top-2.5 left-2.5 z-20 grid h-8 w-8 place-items-center rounded-full border backdrop-blur transition ${
          liked
            ? "border-rose-400/50 bg-rose-500/20 text-rose-400"
            : "border-white/10 bg-black/40 text-slate-300 hover:text-rose-300"
        }`}
      >
        <HeartIcon className="h-4 w-4" filled={liked} />
      </button>

      {!product.inStock && (
        <span className="absolute bottom-2.5 left-1/2 z-20 -translate-x-1/2 rounded-lg border border-white/10 bg-black/70 px-3 py-1 text-[11px] font-bold text-slate-300 backdrop-blur">
          ناموجود
        </span>
      )}
    </div>
  );

  const info = (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
        <span className="rounded-md bg-blue-500/12 px-2 py-0.5 font-bold text-blue-300">
          {labelOf(brands, product.brand)}
        </span>
        <span className="rounded-md bg-white/5 px-2 py-0.5 text-slate-400">
          {labelOf(categories, product.category)}
        </span>
        {product.freeShipping && (
          <span className="flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 font-bold text-emerald-300">
            <TruckIcon className="h-3 w-3" /> ارسال رایگان
          </span>
        )}
      </div>

      <h3
        className={`mt-2 font-bold leading-6 text-slate-100 transition group-hover:text-blue-300 ${
          isList ? "text-[15px]" : "line-clamp-2 min-h-[3rem] text-[13.5px]"
        }`}
      >
        {product.name}
      </h3>

      <div className={`mt-2 flex flex-wrap items-center gap-1.5 ${isList ? "" : "hidden sm:flex"}`}>
        {product.specs.slice(0, isList ? 3 : 2).map((s) => (
          <span
            key={s}
            className="rounded-md border border-white/8 bg-white/4 px-2 py-0.5 text-[10px] text-slate-400"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="mt-2.5 flex items-center gap-2">
        <Stars rating={product.rating} />
        <span className="text-[11px] font-bold text-amber-300">
          {product.rating.toLocaleString("fa-IR")}
        </span>
        <span className="text-[10px] text-slate-500">
          ({product.reviews.toLocaleString("fa-IR")} نظر)
        </span>
      </div>

      <div className="mt-2 flex items-center gap-1.5">
        {product.colors.slice(0, 5).map((c) => {
          const hex = colorOptions.find((o) => o.key === c)?.hex ?? "#333";
          return (
            <span
              key={c}
              className="h-3.5 w-3.5 rounded-full border border-white/25"
              style={{ background: hex }}
            />
          );
        })}
        {product.sold > 1000 && (
          <span className="mr-auto flex items-center gap-1 text-[10px] font-bold text-orange-300">
            <BoltIcon className="h-3 w-3" /> پرفروش
          </span>
        )}
      </div>

      <div
        className={`mt-3 flex items-end justify-between gap-3 border-t border-white/8 pt-3 ${
          isList ? "sm:mt-auto" : ""
        }`}
      >
        <div className="min-w-0">
          {product.oldPrice && (
            <div className="text-[11px] text-slate-500 line-through">
              {formatPrice(product.oldPrice)}
            </div>
          )}
          <div className="flex items-baseline gap-1">
            <span className="text-[17px] font-black text-white">{formatPrice(product.price)}</span>
            <span className="text-[11px] text-slate-400">تومان</span>
          </div>
        </div>

        <button
          disabled={!product.inStock}
          onClick={() => onAdd(product)}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-[12px] font-bold text-white transition ${
            product.inStock
              ? "cta-btn"
              : "cursor-not-allowed border border-white/10 bg-white/5 text-slate-500"
          }`}
        >
          <CartIcon className="h-4 w-4" />
          {product.inStock ? "افزودن" : "ناموجود"}
        </button>
      </div>
    </div>
  );

  return (
    <article
      className={`glass-card glass-card-hover fade-up group rounded-3xl p-3 ${
        isList ? "flex flex-col gap-4 sm:flex-row" : "flex flex-col"
      }`}
      style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
    >
      {media}
      <div className={isList ? "flex flex-1 flex-col" : "mt-3 flex flex-1 flex-col"}>{info}</div>
    </article>
  );
}
