"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/products/Navbar";
import { useState } from "react";

export default function HomePage() {
  const [cartCount, setCartCount] = useState(0);
  const [likedCount, setLikedCount] = useState(0);
  const [query, setQuery] = useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const categories = [
    { icon: "⌚", title: "ساعت هوشمند", count: "۴۲ مدل موجود", color: "blue" },
    { icon: "🎧", title: "هندزفری بی‌سیم", count: "۶۸ مدل موجود", color: "indigo" },
    { icon: "📱", title: "گوشی موبایل", count: "۱۲۰ مدل موجود", color: "purple" },
    { icon: "🏃", title: "دستبند سلامتی", count: "۲۵ مدل موجود", color: "emerald" },
    { icon: "🔋", title: "شارژر و لوازم جانبی", count: "۱۵۰+ مدل موجود", color: "rose" },
  ];

  const featuredProducts = [
    {
      icon: "⌚",
      category: "پوشیدنی هوشمند",
      title: "ساعت هوشمند ورزشی پرو ایکس",
      description: "صفحه نمایش AMOLED 1.43 اینچ، ضد آب IP68، پایش اکسیژن خون",
      oldPrice: "۱۲,۵۰۰,۰۰۰",
      price: "۹,۳۷۵,۰۰۰",
      discount: "۲۵٪",
      rating: "۴.۹",
      link: "/product/pro-x",
    },
    {
      icon: "🎧",
      category: "صوتی و هدفون",
      title: "هدفون بی‌سیم نویزکنسلینگ ایرپاد پرو",
      description: "حذف نویز فعال ANC، باتری ۳۰ ساعته همراه باکس شارژ",
      oldPrice: "۵,۸۰۰,۰۰۰",
      price: "۴,۹۳۰,۰۰۰",
      discount: "۱۵٪",
      rating: "۴.۷",
      link: "#",
    },
    {
      icon: "🔋",
      category: "لوازم جانبی",
      title: "پاوربانک فست شارژ ۲۰,۰۰۰ میلی‌آمپر",
      description: "خروجی ۲۲.۵ وات، پشتیبانی از شارژ سریع PD3.0 و QC",
      oldPrice: null,
      price: "۱,۸۵۰,۰۰۰",
      discount: null,
      rating: "۴.۸",
      link: "#",
    },
    {
      icon: "📱",
      category: "موبایل",
      title: "گوشی هوشمند مدل Tech Ultra 5G",
      description: "حافظه ۲۵۶ گیگ، رم ۱۲، دوربین ۱۰۸ مگاپیکسل",
      oldPrice: "۳۸,۰۰۰,۰۰۰",
      price: "۳۰,۴۰۰,۰۰۰",
      discount: "۲۰٪",
      rating: "۴.۹",
      link: "#",
    },
  ];

  const features = [
    { icon: "🚀", title: "ارسال سریع و اکسپرس", desc: "تحویل زیر ۳ ساعت در تهران" },
    { icon: "🛡️", title: "ضمانت ۱۸ ماهه شرکتی", desc: "گارانتی تعویض و خدمات معتبر" },
    { icon: "💎", title: "ضمانت اصالت کالا", desc: "۱۰۰٪ اورجینال و باکیفیت" },
    { icon: "🎧", title: "پشتیبانی تخصصی ۲۴/۷", desc: "مشاوره رایگان خرید گجت" },
  ];

  return (
    <>
      <Navbar
        cartCount={cartCount}
        likedCount={likedCount}
        query={query}
        onQuery={setQuery}
      />
      <motion.main
        id="view-home"
        className="flex-grow max-w-[1400px] w-full mx-auto px-4 sm:px-8 py-8 space-y-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
      {/* HERO SECTION */}
      <motion.section
        className="relative rounded-3xl glass-panel p-6 sm:p-12 overflow-hidden stage-tech-bg border border-blue-500/30"
        variants={itemVariants}
      >
        <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-right">
            <motion.div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-bold"
              whileHover={{ scale: 1.05 }}
            >
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
              جدیدترین تکنولوژی ۲۰۲۵ رونمایی شد
            </motion.div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
              تجربه هوشمند زندگی با{" "}
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300">
                ساعت ورزشی پرو ایکس
              </span>
            </h1>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
              طراحی شده برای حرفه‌ای‌ها. آنالیز دقیق ضربان قلب، سنسور اکسیژن خون، GPS دوفرکانسه و باتری
              فوق‌العاده با شارژدهی ۱۴ روزه. همین حالا تکنولوژی آینده را روی مچ دست خود لمس کنید.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/product/pro-x"
                className="cta-btn px-8 py-4 rounded-2xl font-bold text-sm text-white flex items-center gap-3"
              >
                <span>خرید و مشاهده پرو ایکس</span>
                <svg
                  className="w-5 h-5 rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
              <a
                href="#featured-categories"
                className="px-6 py-4 rounded-2xl glass-card font-semibold text-sm hover:bg-white/10 transition flex items-center gap-2"
              >
                دسته‌بندی محصولات
              </a>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-lg mx-auto lg:mx-0">
              {[
                { value: "+۵۰,۰۰۰", label: "فروش موفق" },
                { value: "۱۰۰٪", label: "اصالت کالا" },
                { value: "۲۴/۷", label: "پشتیبانی آنلاین" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-xl sm:text-2xl font-black text-blue-400">{stat.value}</div>
                  <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Interactive Watch Graphic */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-blue-600/20 blur-3xl animate-pulse"></div>
              <motion.div
                className="prod-img relative z-10 w-64 sm:w-80 cursor-pointer"
                whileHover={{ scale: 1.05, y: -10 }}
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Link href="/product/pro-x">
                  <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]">
                    <rect x="110" y="10" width="80" height="70" rx="12" fill="#1e293b" />
                    <rect x="110" y="220" width="80" height="70" rx="12" fill="#1e293b" />
                    <path
                      d="M110 30 h80 M110 50 h80 M110 240 h80 M110 260 h80"
                      stroke="#0f172a"
                      strokeWidth="3"
                    />
                    <circle
                      cx="150"
                      cy="150"
                      r="95"
                      fill="#0f172a"
                      stroke="#334155"
                      strokeWidth="8"
                    />
                    <circle
                      cx="150"
                      cy="150"
                      r="88"
                      fill="#020617"
                      stroke="#2563eb"
                      strokeWidth="3"
                    />
                    <circle cx="150" cy="150" r="80" fill="#090d16" />
                    <path
                      d="M 95 160 Q 115 160 125 140 T 145 180 T 165 130 T 185 160 H 205"
                      fill="none"
                      stroke="#ff4b5c"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <text
                      x="150"
                      y="115"
                      fontSize="28"
                      fontWeight="900"
                      fill="#ffffff"
                      textAnchor="middle"
                      fontFamily="sans-serif"
                    >
                      10:42
                    </text>
                    <text
                      x="150"
                      y="132"
                      fontSize="10"
                      fill="#94a3b8"
                      textAnchor="middle"
                    >
                      AM - THU 24
                    </text>
                    <text
                      x="150"
                      y="200"
                      fontSize="12"
                      fontWeight="bold"
                      fill="#38bdf8"
                      textAnchor="middle"
                    >
                      ⚡ 84 Bpm • 12,450 Step
                    </text>
                    <circle cx="150" cy="150" r="74" fill="none" stroke="#1e293b" strokeWidth="5" />
                    <circle
                      cx="150"
                      cy="150"
                      r="74"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="5"
                      strokeDasharray="465"
                      strokeDashoffset="120"
                      strokeLinecap="round"
                    />
                    <rect x="243" y="125" width="10" height="22" rx="4" fill="#475569" />
                    <rect x="243" y="160" width="8" height="18" rx="3" fill="#334155" />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CATEGORIES GRID */}
      <motion.section id="featured-categories" className="space-y-6" variants={itemVariants}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">دسته‌بندی‌های محبوب</h2>
            <p className="text-xs text-gray-400 mt-1">جدیدترین محصولات تکنولوژی بر اساس دسته</p>
          </div>
          <Link
            href="/products"
            className="text-xs text-blue-400 hover:underline font-semibold flex items-center gap-1"
          >
            مشاهده همه
            <svg
              className="w-4 h-4 rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              className="glass-card p-5 rounded-2xl flex flex-col items-center text-center cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-${cat.color}-500/10 border border-${cat.color}-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition duration-300 mb-3`}
              >
                {cat.icon}
              </div>
              <h3 className="font-bold text-sm">{cat.title}</h3>
              <span className="text-[11px] text-gray-400 mt-1">{cat.count}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FLASH SALE / FEATURED PRODUCTS */}
      <motion.section className="space-y-6" variants={itemVariants}>
        <div className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-red-900/30 via-slate-900 to-slate-900 p-6 rounded-3xl border border-red-500/20">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🔥</span>
            <div>
              <h2 className="text-xl font-black text-white">پیشنهادهای شگفت‌انگیز امروز</h2>
              <p className="text-xs text-red-300">تخفیف‌های ویژه با زمان محدود</p>
            </div>
          </div>
          <div className="flex items-center gap-2 dir-ltr">
            {["08", "42", "15"].map((time, i) => (
              <React.Fragment key={`timer-${i}`}>
                <div
                  className="bg-red-500/20 border border-red-500/40 text-red-400 px-3 py-1.5 rounded-xl font-mono text-lg font-bold"
                >
                  {time}
                </div>
                {i < 2 && <span className="text-red-400 font-bold">:</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, i) => (
            <motion.div
              key={i}
              className="glass-card rounded-2xl p-5 flex flex-col justify-between relative group border-blue-500/30"
              whileHover={{ y: -8 }}
              variants={itemVariants}
            >
              {product.discount && (
                <span className="absolute top-4 right-4 z-10 bg-red-500 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full badge-discount">
                  {product.discount} تخفیف
                </span>
              )}

              <div className="py-6 flex justify-center cursor-pointer">
                <div className="w-36 h-36 bg-blue-500/10 rounded-full flex items-center justify-center text-6xl group-hover:scale-110 transition duration-300">
                  {product.icon}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{product.category}</span>
                  <span className="text-amber-400 font-bold">{product.rating} ★</span>
                </div>
                <h3 className="font-extrabold text-base hover:text-blue-400 transition cursor-pointer">
                  {product.title}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-2">{product.description}</p>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                  <div>
                    {product.oldPrice && (
                      <div className="text-xs text-gray-500 line-through">{product.oldPrice}</div>
                    )}
                    <div className="text-lg font-black text-blue-400">
                      {product.price}{" "}
                      <span className="text-xs text-gray-400 font-normal">تومان</span>
                    </div>
                  </div>
                  <Link
                    href={product.link}
                    className="px-3.5 py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/40 transition text-xs font-bold"
                  >
                    مشاهده
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* WHY US FEATURES */}
      <motion.section
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        variants={itemVariants}
      >
        {features.map((feature, i) => (
          <motion.div
            key={i}
            className="glass-card p-6 rounded-2xl flex items-center gap-4"
            whileHover={{ scale: 1.03 }}
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-xl shrink-0">
              {feature.icon}
            </div>
            <div>
              <h4 className="font-bold text-sm">{feature.title}</h4>
              <p className="text-xs text-gray-400 mt-1">{feature.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.section>
    </motion.main>
    </>
  );
}
