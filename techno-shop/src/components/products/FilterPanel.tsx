"use client";

import { useState, type ReactNode } from "react";
import {
  brands,
  categories,
  colorOptions,
  PRICE_MAX,
  PRICE_MIN,
  toMillion,
} from "@/data/products";
import { CheckIcon, ChevronDownIcon, SearchIcon, StarIcon } from "./icons";

export type Filters = {
  query: string;
  categories: string[];
  brands: string[];
  colors: string[];
  price: [number, number];
  minRating: number;
  onlyAvailable: boolean;
  onlyDiscount: boolean;
  freeShipping: boolean;
};

export const emptyFilters: Filters = {
  query: "",
  categories: [],
  brands: [],
  colors: [],
  price: [PRICE_MIN, PRICE_MAX],
  minRating: 0,
  onlyAvailable: false,
  onlyDiscount: false,
  freeShipping: false,
};

type Props = {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
  onReset: () => void;
  counts: {
    categories: Record<string, number>;
    brands: Record<string, number>;
  };
};

function Section({
  title,
  children,
  defaultOpen = true,
  badge,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  badge?: number;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-white/8 py-4 last:border-none">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-right"
      >
        <span className="flex items-center gap-2 text-sm font-bold text-slate-100">
          {title}
          {badge ? (
            <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-[10px] font-bold text-blue-300">
              {badge.toLocaleString("fa-IR")}
            </span>
          ) : null}
        </span>
        <ChevronDownIcon
          className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

function CheckRow({
  label,
  checked,
  count,
  icon,
  onToggle,
}: {
  label: string;
  checked: boolean;
  count?: number;
  icon?: string;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="group flex w-full items-center gap-2.5 rounded-xl px-2 py-2 text-right transition hover:bg-white/5"
    >
      <span
        className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-md border transition ${
          checked
            ? "border-blue-400 bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-[0_0_12px_rgba(43,127,255,0.55)]"
            : "border-white/20 bg-white/5 text-transparent group-hover:border-blue-400/60"
        }`}
      >
        <CheckIcon className="h-3 w-3" />
      </span>
      {icon ? <span className="text-sm">{icon}</span> : null}
      <span className={`flex-1 text-[13px] ${checked ? "font-bold text-white" : "text-slate-300"}`}>
        {label}
      </span>
      {typeof count === "number" ? (
        <span className="text-[11px] text-slate-500">{count.toLocaleString("fa-IR")}</span>
      ) : null}
    </button>
  );
}

function Switch({
  label,
  hint,
  checked,
  onToggle,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="flex w-full items-center justify-between rounded-xl px-2 py-2.5 text-right transition hover:bg-white/5"
    >
      <span>
        <span className={`block text-[13px] ${checked ? "font-bold text-white" : "text-slate-300"}`}>
          {label}
        </span>
        {hint ? <span className="block text-[10px] text-slate-500">{hint}</span> : null}
      </span>
      <span
        className={`relative h-[22px] w-[42px] shrink-0 rounded-full transition ${
          checked ? "bg-gradient-to-l from-blue-500 to-blue-700 shadow-[0_0_14px_rgba(43,127,255,0.5)]" : "bg-white/12"
        }`}
      >
        <span
          className={`absolute top-[3px] h-4 w-4 rounded-full bg-white transition-all duration-300 ${
            checked ? "right-[23px]" : "right-[3px]"
          }`}
        />
      </span>
    </button>
  );
}

const quickPrices: { label: string; range: [number, number] }[] = [
  { label: "زیر ۱۰ میلیون", range: [0, 10_000_000] },
  { label: "۱۰ تا ۵۰ میلیون", range: [10_000_000, 50_000_000] },
  { label: "۵۰ تا ۱۰۰ میلیون", range: [50_000_000, 100_000_000] },
  { label: "بالای ۱۰۰ میلیون", range: [100_000_000, PRICE_MAX] },
];

export default function FilterPanel({ filters, onChange, onReset, counts }: Props) {
  const toggleIn = (key: "categories" | "brands" | "colors", value: string) => {
    const list = filters[key];
    onChange({
      [key]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
    } as Partial<Filters>);
  };

  const [min, max] = filters.price;
  const leftPct = (min / PRICE_MAX) * 100;
  const rightPct = (max / PRICE_MAX) * 100;

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between pb-3">
        <h2 className="flex items-center gap-2 text-base font-black text-white">
          <span className="inline-block h-4 w-1 rounded-full bg-gradient-to-b from-blue-400 to-blue-700" />
          فیلترها
        </h2>
        <button
          onClick={onReset}
          className="rounded-lg px-2 py-1 text-[11px] font-bold text-rose-300 transition hover:bg-rose-500/10"
        >
          حذف همه
        </button>
      </div>

      {/* search */}
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <input
          value={filters.query}
          onChange={(e) => onChange({ query: e.target.value })}
          placeholder="جستجو در محصولات…"
          className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pr-9 pl-3 text-[13px] text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500/60 focus:bg-white/8 focus:shadow-[0_0_0_3px_rgba(43,127,255,0.14)]"
        />
      </div>

      <Section title="دسته‌بندی" badge={filters.categories.length}>
        <div className="space-y-0.5">
          {categories.map((c) => (
            <CheckRow
              key={c.key}
              label={c.label}
              icon={c.icon}
              count={counts.categories[c.key] ?? 0}
              checked={filters.categories.includes(c.key)}
              onToggle={() => toggleIn("categories", c.key)}
            />
          ))}
        </div>
      </Section>

      <Section title="برند" badge={filters.brands.length}>
        <div className="space-y-0.5">
          {brands.map((b) => (
            <CheckRow
              key={b.key}
              label={b.label}
              count={counts.brands[b.key] ?? 0}
              checked={filters.brands.includes(b.key)}
              onToggle={() => toggleIn("brands", b.key)}
            />
          ))}
        </div>
      </Section>

      <Section title="محدوده قیمت">
        <div className="px-1">
          <div className="mb-5 flex items-center justify-between text-[11px] text-slate-400">
            <span className="rounded-lg bg-white/5 px-2 py-1">
              از <b className="text-white">{toMillion(min)}</b> میلیون
            </span>
            <span className="rounded-lg bg-white/5 px-2 py-1">
              تا <b className="text-white">{toMillion(max)}</b> میلیون
            </span>
          </div>

          <div dir="ltr" className="relative h-6">
            <div className="absolute top-0 h-1.5 w-full rounded-full bg-white/10" />
            <div
              className="absolute top-0 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-sky-400 shadow-[0_0_14px_rgba(43,127,255,0.6)]"
              style={{ left: `${leftPct}%`, width: `${Math.max(rightPct - leftPct, 0)}%` }}
            />
            <input
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={1_000_000}
              value={min}
              onChange={(e) =>
                onChange({ price: [Math.min(Number(e.target.value), max - 1_000_000), max] })
              }
              className="range-input"
              aria-label="حداقل قیمت"
            />
            <input
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={1_000_000}
              value={max}
              onChange={(e) =>
                onChange({ price: [min, Math.max(Number(e.target.value), min + 1_000_000)] })
              }
              className="range-input"
              aria-label="حداکثر قیمت"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {quickPrices.map((q) => {
              const active = min === q.range[0] && max === q.range[1];
              return (
                <button
                  key={q.label}
                  onClick={() => onChange({ price: q.range })}
                  className={`rounded-lg border px-2.5 py-1.5 text-[11px] transition ${
                    active
                      ? "border-blue-400/60 bg-blue-500/20 font-bold text-blue-200"
                      : "border-white/10 bg-white/4 text-slate-300 hover:border-blue-400/40 hover:text-white"
                  }`}
                >
                  {q.label}
                </button>
              );
            })}
          </div>
        </div>
      </Section>

      <Section title="رنگ" badge={filters.colors.length}>
        <div className="flex flex-wrap gap-3 px-1 pb-1">
          {colorOptions.map((c) => {
            const active = filters.colors.includes(c.key);
            return (
              <button
                key={c.key}
                title={c.label}
                onClick={() => toggleIn("colors", c.key)}
                className={`swatch h-7 w-7 rounded-full border border-white/25 ${active ? "active" : ""}`}
                style={{ background: c.hex }}
                aria-label={c.label}
              />
            );
          })}
        </div>
      </Section>

      <Section title="امتیاز کاربران">
        <div className="flex flex-wrap gap-2 px-1">
          {[0, 3, 4, 4.5].map((r) => {
            const active = filters.minRating === r;
            return (
              <button
                key={r}
                onClick={() => onChange({ minRating: r })}
                className={`flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-[11px] transition ${
                  active
                    ? "border-amber-400/60 bg-amber-400/15 font-bold text-amber-200"
                    : "border-white/10 bg-white/4 text-slate-300 hover:border-amber-400/40"
                }`}
              >
                {r === 0 ? (
                  "همه"
                ) : (
                  <>
                    <StarIcon className="h-3.5 w-3.5 text-amber-400" />
                    {r.toLocaleString("fa-IR")} به بالا
                  </>
                )}
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="ویژگی‌ها">
        <div className="space-y-1">
          <Switch
            label="فقط کالاهای موجود"
            hint="نمایش محصولات آماده ارسال"
            checked={filters.onlyAvailable}
            onToggle={() => onChange({ onlyAvailable: !filters.onlyAvailable })}
          />
          <Switch
            label="فقط تخفیف‌دار"
            hint="محصولات دارای شگفت‌انگیز"
            checked={filters.onlyDiscount}
            onToggle={() => onChange({ onlyDiscount: !filters.onlyDiscount })}
          />
          <Switch
            label="ارسال رایگان"
            checked={filters.freeShipping}
            onToggle={() => onChange({ freeShipping: !filters.freeShipping })}
          />
        </div>
      </Section>
    </div>
  );
}
