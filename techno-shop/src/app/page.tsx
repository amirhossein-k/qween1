"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/products/Navbar";
import FilterPanel, { emptyFilters, type Filters } from "../components/products/FilterPanel";
import ProductCard from "../components/products/ProductCard";
import {
  brands,
  categories,
  colorOptions,
  discountPercent,
  labelOf,
  PRICE_MAX,
  PRICE_MIN,
  products,
  sortOptions,
  toMillion,
  type Product,
} from "@/data/products";
import {
  CartIcon,
  CheckIcon,
  ChevronDownIcon,
  CloseIcon,
  FilterIcon,
  GridIcon,
  ListIcon,
  SparkIcon,
} from "@/components/products/icons";

const PAGE_SIZE = 9;

function Skeleton({ view }: { view: "grid" | "list" }) {
  return (
    <div className={`glass-card rounded-3xl p-3 ${view === "list" ? "flex gap-4" : ""}`}>
      <div className={`skeleton rounded-2xl ${view === "list" ? "h-40 w-48 shrink-0" : "h-44 w-full"}`} />
      <div className="flex flex-1 flex-col gap-2.5 pt-3">
        <div className="skeleton h-3 w-20 rounded-full" />
        <div className="skeleton h-4 w-full rounded-full" />
        <div className="skeleton h-4 w-2/3 rounded-full" />
        <div className="skeleton mt-auto h-9 w-full rounded-xl" />
      </div>
    </div>
  );
}

export default function App() {
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [sort, setSort] = useState("popular");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [liked, setLiked] = useState<number[]>([]);
  const [cart, setCart] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const patch = (p: Partial<Filters>) => setFilters((f) => ({ ...f, ...p }));

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    const b: Record<string, number> = {};
    products.forEach((p) => {
      c[p.category] = (c[p.category] ?? 0) + 1;
      b[p.brand] = (b[p.brand] ?? 0) + 1;
    });
    return { categories: c, brands: b };
  }, []);

  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    let list = products.filter((p) => {
      if (q) {
        const hay = `${p.name} ${labelOf(brands, p.brand)} ${labelOf(categories, p.category)} ${p.specs.join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (filters.categories.length && !filters.categories.includes(p.category)) return false;
      if (filters.brands.length && !filters.brands.includes(p.brand)) return false;
      if (filters.colors.length && !p.colors.some((c) => filters.colors.includes(c))) return false;
      if (p.price < filters.price[0] || p.price > filters.price[1]) return false;
      if (filters.minRating && p.rating < filters.minRating) return false;
      if (filters.onlyAvailable && !p.inStock) return false;
      if (filters.onlyDiscount && !p.oldPrice) return false;
      if (filters.freeShipping && !p.freeShipping) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "newest":
          return b.addedAt - a.addedAt;
        case "cheap":
          return a.price - b.price;
        case "expensive":
          return b.price - a.price;
        case "discount":
          return discountPercent(b) - discountPercent(a);
        case "rating":
          return b.rating - a.rating;
        default:
          return b.sold - a.sold;
      }
    });
    return list;
  }, [filters, sort]);

  // simulated loading whenever the query changes
  useEffect(() => {
    setLoading(true);
    setVisible(PAGE_SIZE);
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, [filters, sort]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  const chips = useMemo(() => {
    const list: { key: string; label: string; remove: () => void }[] = [];
    if (filters.query.trim())
      list.push({ key: "q", label: `جستجو: ${filters.query}`, remove: () => patch({ query: "" }) });
    filters.categories.forEach((c) =>
      list.push({
        key: `c-${c}`,
        label: labelOf(categories, c),
        remove: () => patch({ categories: filters.categories.filter((x) => x !== c) }),
      })
    );
    filters.brands.forEach((b) =>
      list.push({
        key: `b-${b}`,
        label: labelOf(brands, b),
        remove: () => patch({ brands: filters.brands.filter((x) => x !== b) }),
      })
    );
    filters.colors.forEach((c) =>
      list.push({
        key: `col-${c}`,
        label: `رنگ ${labelOf(colorOptions, c)}`,
        remove: () => patch({ colors: filters.colors.filter((x) => x !== c) }),
      })
    );
    if (filters.price[0] !== PRICE_MIN || filters.price[1] !== PRICE_MAX)
      list.push({
        key: "price",
        label: `${toMillion(filters.price[0])} تا ${toMillion(filters.price[1])} میلیون`,
        remove: () => patch({ price: [PRICE_MIN, PRICE_MAX] }),
      });
    if (filters.minRating)
      list.push({
        key: "rate",
        label: `امتیاز ${filters.minRating.toLocaleString("fa-IR")}+`,
        remove: () => patch({ minRating: 0 }),
      });
    if (filters.onlyAvailable)
      list.push({ key: "stock", label: "فقط موجود", remove: () => patch({ onlyAvailable: false }) });
    if (filters.onlyDiscount)
      list.push({ key: "off", label: "تخفیف‌دار", remove: () => patch({ onlyDiscount: false }) });
    if (filters.freeShipping)
      list.push({ key: "ship", label: "ارسال رایگان", remove: () => patch({ freeShipping: false }) });
    return list;
  }, [filters]);

  const addToCart = (p: Product) => {
    setCart((c) => c + 1);
    setToast(`«${p.name.slice(0, 34)}…» به سبد خرید اضافه شد`);
  };

  const toggleLike = (id: number) =>
    setLiked((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id]));

  const shown = filtered.slice(0, visible);

  return (
    <div className="min-h-screen">
      <Navbar
        cartCount={cart}
        likedCount={liked.length}
        query={filters.query}
        onQuery={(v) => patch({ query: v })}
      />

      <main className="mx-auto max-w-[1400px] px-4 pt-6 pb-28 sm:px-6 lg:pb-16">
        {/* breadcrumb */}
        <nav className="mb-4 flex items-center gap-2 text-[11px] text-slate-500">
          <a href="#" className="transition hover:text-blue-300">خانه</a>
          <span>/</span>
          <a href="#" className="transition hover:text-blue-300">فروشگاه</a>
          <span>/</span>
          <span className="text-slate-300">لیست محصولات</span>
        </nav>

        {/* hero */}
        <section className="glass-panel dot-grid relative mb-6 overflow-hidden rounded-3xl px-5 py-6 sm:px-8 sm:py-8">
          <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/40 bg-blue-500/15 px-3 py-1 text-[11px] font-bold text-blue-200">
                <SparkIcon className="h-3 w-3" />
                فروشگاه تخصصی کالای دیجیتال
              </span>
              <h1 className="mt-3 text-2xl font-black text-white sm:text-3xl">
                لیست محصولات <span className="text-blue-400">تکنوشاپ</span>
              </h1>
              <p className="mt-2 max-w-xl text-[13px] leading-6 text-slate-300">
                جدیدترین گجت‌ها با ضمانت اصالت کالا، ارسال سریع و امکان پرداخت در محل. با استفاده از
                فیلترهای هوشمند، دقیقاً همان چیزی را پیدا کنید که می‌خواهید.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {[
                { v: products.length, l: "کالای فعال" },
                { v: brands.length, l: "برند معتبر" },
                { v: 24, l: "ساعت پشتیبانی" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="rounded-2xl border border-white/10 bg-black/25 px-3 py-3 text-center backdrop-blur"
                >
                  <div className="text-xl font-black text-white">
                    {s.v.toLocaleString("fa-IR")}
                    <span className="text-blue-400">+</span>
                  </div>
                  <div className="mt-0.5 text-[10px] text-slate-400">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* category quick pills */}
        <div className="no-scrollbar -mx-1 mb-6 flex gap-2 overflow-x-auto px-1 pb-1">
          <button
            onClick={() => patch({ categories: [] })}
            className={`shrink-0 rounded-xl border px-3.5 py-2 text-[12px] font-bold transition ${
              filters.categories.length === 0
                ? "border-blue-400/60 bg-blue-500/20 text-blue-200"
                : "border-white/10 bg-white/4 text-slate-300 hover:border-blue-400/40"
            }`}
          >
            همه محصولات
          </button>
          {categories.map((c) => {
            const active = filters.categories.includes(c.key);
            return (
              <button
                key={c.key}
                onClick={() =>
                  patch({
                    categories: active
                      ? filters.categories.filter((x) => x !== c.key)
                      : [...filters.categories, c.key],
                  })
                }
                className={`flex shrink-0 items-center gap-1.5 rounded-xl border px-3.5 py-2 text-[12px] transition ${
                  active
                    ? "border-blue-400/60 bg-blue-500/20 font-bold text-blue-200"
                    : "border-white/10 bg-white/4 text-slate-300 hover:border-blue-400/40 hover:text-white"
                }`}
              >
                <span>{c.icon}</span>
                {c.label}
                <span className="text-[10px] text-slate-500">
                  ({(counts.categories[c.key] ?? 0).toLocaleString("fa-IR")})
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[286px_1fr] xl:grid-cols-[310px_1fr]">
          {/* sidebar (desktop) */}
          <aside className="hidden lg:block">
            <div className="glass-card sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-3xl p-4">
              <FilterPanel
                filters={filters}
                onChange={patch}
                onReset={() => setFilters(emptyFilters)}
                counts={counts}
              />
            </div>
          </aside>

          {/* products */}
          <section>
            {/* toolbar */}
            <div className="glass-card mb-4 flex flex-wrap items-center gap-3 rounded-2xl px-3 py-2.5">
              <span className="text-[12px] text-slate-400">
                <b className="text-white">{filtered.length.toLocaleString("fa-IR")}</b> کالا یافت شد
              </span>

              <div className="mr-auto flex items-center gap-2">
                {/* sort (desktop) */}
                <div className="relative hidden sm:block">
                  <button
                    onClick={() => setSortOpen((v) => !v)}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[12px] font-bold text-slate-200 transition hover:border-blue-400/50"
                  >
                    <FilterIcon className="h-4 w-4 text-blue-400" />
                    مرتب‌سازی: {labelOf(sortOptions, sort)}
                    <ChevronDownIcon
                      className={`h-3.5 w-3.5 transition-transform ${sortOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {sortOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} />
                      <div className="absolute top-full left-0 z-20 mt-2 w-52 overflow-hidden rounded-2xl border border-white/10 bg-[#080d16]/95 p-1.5 shadow-2xl backdrop-blur-xl">
                        {sortOptions.map((o) => (
                          <button
                            key={o.key}
                            onClick={() => {
                              setSort(o.key);
                              setSortOpen(false);
                            }}
                            className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-right text-[12.5px] transition ${
                              sort === o.key
                                ? "bg-blue-500/15 font-bold text-blue-300"
                                : "text-slate-300 hover:bg-white/5"
                            }`}
                          >
                            {o.label}
                            {sort === o.key && <CheckIcon className="h-3.5 w-3.5" />}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* view toggle */}
                <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1">
                  {(["grid", "list"] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setView(v)}
                      aria-label={v === "grid" ? "نمایش شبکه‌ای" : "نمایش لیستی"}
                      className={`grid h-7 w-7 place-items-center rounded-lg transition ${
                        view === v
                          ? "bg-gradient-to-br from-blue-500 to-blue-700 text-white"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {v === "grid" ? <GridIcon className="h-4 w-4" /> : <ListIcon className="h-4 w-4" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* active chips */}
            {chips.length > 0 && (
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="text-[11px] text-slate-500">فیلترهای فعال:</span>
                {chips.map((chip) => (
                  <button
                    key={chip.key}
                    onClick={chip.remove}
                    className="flex items-center gap-1.5 rounded-full border border-blue-400/35 bg-blue-500/12 px-2.5 py-1 text-[11px] font-bold text-blue-200 transition hover:border-rose-400/50 hover:bg-rose-500/12 hover:text-rose-200"
                  >
                    {chip.label}
                    <CloseIcon className="h-3 w-3" />
                  </button>
                ))}
                <button
                  onClick={() => setFilters(emptyFilters)}
                  className="rounded-full px-2 py-1 text-[11px] font-bold text-rose-300 underline-offset-4 transition hover:underline"
                >
                  حذف همه
                </button>
              </div>
            )}

            {/* list */}
            {loading ? (
              <div
                className={
                  view === "grid"
                    ? "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
                    : "grid grid-cols-1 gap-4"
                }
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} view={view} />
                ))}
              </div>
            ) : shown.length === 0 ? (
              <div className="glass-card flex flex-col items-center justify-center rounded-3xl px-6 py-16 text-center">
                <div className="mb-4 grid h-16 w-16 place-items-center rounded-2xl border border-white/10 bg-white/5 text-3xl">
                  🔍
                </div>
                <h3 className="text-lg font-black text-white">محصولی پیدا نشد!</h3>
                <p className="mt-2 max-w-sm text-[13px] leading-6 text-slate-400">
                  با فیلترهای انتخابی شما کالایی موجود نیست. لطفاً بازه قیمت را تغییر دهید یا برخی از
                  فیلترها را حذف کنید.
                </p>
                <button
                  onClick={() => setFilters(emptyFilters)}
                  className="cta-btn mt-5 rounded-xl px-5 py-2.5 text-[13px] font-bold text-white"
                >
                  حذف همه فیلترها
                </button>
              </div>
            ) : (
              <>
                <div
                  className={
                    view === "grid"
                      ? "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
                      : "grid grid-cols-1 gap-4"
                  }
                >
                  {shown.map((p, i) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      view={view}
                      index={i}
                      liked={liked.includes(p.id)}
                      onLike={toggleLike}
                      onAdd={addToCart}
                    />
                  ))}
                </div>

                <div className="mt-8 flex flex-col items-center gap-3">
                  <div className="h-1 w-56 overflow-hidden rounded-full bg-white/8">
                    <div
                      className="h-full rounded-full bg-gradient-to-l from-blue-400 to-sky-500 transition-all duration-500"
                      style={{ width: `${(shown.length / filtered.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-slate-500">
                    نمایش {shown.length.toLocaleString("fa-IR")} از{" "}
                    {filtered.length.toLocaleString("fa-IR")} کالا
                  </span>
                  {shown.length < filtered.length && (
                    <button
                      onClick={() => setVisible((v) => v + PAGE_SIZE)}
                      className="rounded-xl border border-blue-400/40 bg-blue-500/12 px-6 py-2.5 text-[13px] font-bold text-blue-200 transition hover:bg-blue-500/20"
                    >
                      نمایش محصولات بیشتر
                    </button>
                  )}
                </div>
              </>
            )}
          </section>
        </div>
      </main>

      {/* mobile sticky actions */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#05080e]/90 px-4 py-3 backdrop-blur-xl lg:hidden">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDrawer(true)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/6 py-2.5 text-[13px] font-bold text-white"
          >
            <FilterIcon className="h-4 w-4 text-blue-400" />
            فیلترها
            {chips.length > 0 && (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-blue-500 px-1 text-[10px] font-black text-white">
                {chips.length.toLocaleString("fa-IR")}
              </span>
            )}
          </button>
          <div className="relative flex-1">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full appearance-none rounded-xl border border-white/10 bg-white/6 py-2.5 pr-3 pl-8 text-[13px] font-bold text-white outline-none"
            >
              {sortOptions.map((o) => (
                <option key={o.key} value={o.key} className="bg-[#0b1220] text-white">
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </div>
      </div>

      {/* mobile filter drawer */}
      <div className={`fixed inset-0 z-[60] lg:hidden ${drawer ? "" : "pointer-events-none"}`}>
        <div
          onClick={() => setDrawer(false)}
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
            drawer ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          style={{ transform: drawer ? "translateX(0)" : "translateX(100%)" }}
          className="absolute inset-y-0 right-0 flex w-[90%] max-w-sm flex-col border-l border-white/10 bg-[#060a11] transition-transform duration-300 ease-out"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <span className="text-sm font-black text-white">فیلتر محصولات</span>
            <button
              onClick={() => setDrawer(false)}
              className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-300"
              aria-label="بستن"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 pb-4">
            <FilterPanel
              filters={filters}
              onChange={patch}
              onReset={() => setFilters(emptyFilters)}
              counts={counts}
            />
          </div>
          <div className="border-t border-white/10 p-3">
            <button
              onClick={() => setDrawer(false)}
              className="cta-btn w-full rounded-xl py-3 text-[13px] font-black text-white"
            >
              نمایش {filtered.length.toLocaleString("fa-IR")} کالا
            </button>
          </div>
        </div>
      </div>

      {/* toast */}
      <div
        className={`pointer-events-none fixed bottom-24 left-1/2 z-[70] -translate-x-1/2 transition-all duration-300 lg:bottom-8 ${
          toast ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="flex items-center gap-2 rounded-2xl border border-emerald-400/30 bg-[#07130d]/95 px-4 py-3 text-[12px] font-bold text-emerald-200 shadow-2xl backdrop-blur-xl">
          <CartIcon className="h-4 w-4" />
          {toast}
        </div>
      </div>

      <footer className="border-t border-white/8 bg-black/30 py-6 pb-24 text-center text-[11px] text-slate-500 lg:pb-6">
        © تکنوشاپ ۱۴۰۴ — طراحی شده با ❤️ برای علاقه‌مندان تکنولوژی
      </footer>
    </div>
  );
}
