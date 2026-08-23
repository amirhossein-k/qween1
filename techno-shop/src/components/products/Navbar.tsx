"use client";

import { useState } from "react";
import { CartIcon, HeartIcon, MenuIcon, SearchIcon, UserIcon, CloseIcon } from "./icons";

type Props = {
  cartCount: number;
  likedCount: number;
  query: string;
  onQuery: (value: string) => void;
};

const links = ["صفحه اصلی", "محصولات", "پیشنهاد شگفت‌انگیز", "بلاگ", "تماس با ما"];

export default function Navbar({ cartCount, likedCount, query, onQuery }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <header className="glass-nav sticky top-0 z-50">
      <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-4 py-3 sm:px-6 lg:gap-6">
        <button
          className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-200 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="منو"
        >
          {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>

        <a href="#" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-blue-400 to-blue-700 shadow-[0_6px_20px_rgba(43,127,255,0.45)]">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <rect x="4" y="3" width="16" height="18" rx="3" />
              <path d="M9 8h6M9 12h6M9 16h3" />
            </svg>
          </span>
          <span className="text-lg font-black tracking-tight text-white">
            تکنو<span className="text-blue-400">شاپ</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l, i) => (
            <a
              key={l}
              href="#"
              className={`rounded-xl px-3 py-2 text-[13px] font-medium transition ${
                i === 1
                  ? "bg-blue-500/15 text-blue-300"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              {l}
            </a>
          ))}
        </nav>

        <div className="relative mr-auto hidden max-w-md flex-1 md:block">
          <SearchIcon className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="جستجوی محصول، برند یا دسته‌بندی…"
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pr-9 pl-3 text-[13px] text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500/60 focus:shadow-[0_0_0_3px_rgba(43,127,255,0.14)]"
          />
        </div>

        <div className="mr-auto flex items-center gap-2 md:mr-0">
          <button className="relative grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:text-rose-300">
            <HeartIcon className="h-4.5 w-4.5" />
            {likedCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-black text-white">
                {likedCount.toLocaleString("fa-IR")}
              </span>
            )}
          </button>
          <button className="relative grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:text-blue-300">
            <CartIcon className="h-4.5 w-4.5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-blue-500 px-1 text-[10px] font-black text-white">
                {cartCount.toLocaleString("fa-IR")}
              </span>
            )}
          </button>
          <button className="hidden h-9 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 text-[12px] font-bold text-slate-200 transition hover:border-blue-400/50 hover:text-white sm:flex">
            <UserIcon className="h-4 w-4" />
            ورود | ثبت‌نام
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <div
        className={`grid overflow-hidden border-t border-white/8 transition-all duration-300 lg:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-1 px-4 py-3">
            <div className="relative mb-2 md:hidden">
              <SearchIcon className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                value={query}
                onChange={(e) => onQuery(e.target.value)}
                placeholder="جستجوی محصول…"
                className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pr-9 pl-3 text-[13px] text-white outline-none placeholder:text-slate-500 focus:border-blue-500/60"
              />
            </div>
            {links.map((l) => (
              <a
                key={l}
                href="#"
                className="block rounded-xl px-3 py-2 text-[13px] text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
