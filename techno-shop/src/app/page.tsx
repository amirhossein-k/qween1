"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingCart, User, ArrowLeft, Zap, Star, CheckCircle } from "lucide-react";

// Types
type ViewMode = "home" | "product";
type TabType = "overview" | "specs" | "reviews" | "faq";

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  image: string;
}

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewMode>("home");
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [cartCount, setCartCount] = useState(2);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState({ hex: "#0f172a", name: "مشکی کربنی" });
  const [watchView, setWatchView] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Products Data
  const products: Product[] = [
    {
      id: 1,
      title: "ساعت هوشمند ورزشی پرو ایکس",
      category: "پوشیدنی هوشمند",
      price: 9375000,
      originalPrice: 12500000,
      discount: 25,
      rating: 4.9,
      image: "⌚",
    },
    {
      id: 2,
      title: "هدفون بی‌سیم نویزکنسلینگ ایرپاد پرو",
      category: "صوتی و هدفون",
      price: 4930000,
      originalPrice: 5800000,
      discount: 15,
      rating: 4.7,
      image: "🎧",
    },
    {
      id: 3,
      title: "پاوربانک فست شارژ ۲۰,۰۰۰ میلی‌آمپر",
      category: "لوازم جانبی",
      price: 1850000,
      rating: 4.8,
      image: "🔋",
    },
    {
      id: 4,
      title: "گوشی موبایل سامسونگ گلکسی S24 Ultra",
      category: "موبایل",
      price: 52000000,
      originalPrice: 65000000,
      discount: 20,
      rating: 4.9,
      image: "📱",
    },
  ];

  const categories = [
    { icon: "⌚", name: "ساعت هوشمند", count: "۴۲ مدل موجود" },
    { icon: "🎧", name: "هندزفری بی‌سیم", count: "۶۸ مدل موجود" },
    { icon: "📱", name: "گوشی موبایل", count: "۱۲۰ مدل موجود" },
    { icon: "🏃", name: "دستبند سلامتی", count: "۲۵ مدل موجود" },
    { icon: "🔋", name: "شارژر و لوازم جانبی", count: "۱۵۰+ مدل موجود" },
  ];

  const reviews: Review[] = [
    {
      id: 1,
      name: "رضا محمدی",
      rating: 5,
      comment: "کیفیت صفحه نمایش فوق‌العاده‌ست زیر نور مستقیم آفتاب کاملا واضحه. شارژدهی واقعا عالیه و سنسورهاش با دستگاه‌های پزشکی تست کردم دقت بالایی دارن.",
      date: "خریدار شده در ۲ اسفند ۱۴۰۳",
    },
    {
      id: 2,
      name: "سارا کاظمی",
      rating: 4,
      comment: "طراحی بسیار شیک و سبکی داره روی دست احساس سنگینی نمیکنید. بند سیلیکونیش خیلی باکیفیت هست.",
      date: "خریدار شده در ۲۸ بهمن ۱۴۰۳",
    },
  ];

  const faqs: FAQ[] = [
    {
      id: 1,
      question: "آیا این ساعت قابلیت مکالمه مستقیم دارد؟",
      answer: "بله، پرو ایکس مجهز به میکروفون و اسپیکر داخلی با کیفیت HD بوده و می‌توانید از طریق بلوتوث مکالمات خود را پاسخ دهید.",
    },
    {
      id: 2,
      question: "مدت زمان گارانتی و خدمات پس از فروش چقدر است؟",
      answer: "این محصول دارای ۱۸ ماه گارانتی رسمی تکنوشاپ شامل تعویض قطعات و ۷ روز ضمانت بازگشت بی‌قید و شرط است.",
    },
  ];

  // Format price with commas
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Add to cart handler
  const handleAddToCart = () => {
    setCartCount((prev) => prev + quantity);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Toggle wishlist handler
  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <>
      {/* Header */}
      <motion.header
        className="glass-nav sticky top-0 z-50 transition-all duration-300"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo & Main Nav */}
          <div className="flex items-center gap-8">
            <motion.a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentView("home");
              }}
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-800 flex items-center justify-center text-2xl shadow-lg shadow-blue-900/60">
                <Zap className="text-white w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-blue-400">
                  تکنوشاپ
                </span>
                <span className="text-[10px] text-blue-400 font-medium tracking-widest uppercase">
                  TechnoShop Store
                </span>
              </div>
            </motion.a>

            {/* View Mode Pills */}
            <div className="hidden lg:flex items-center bg-white/5 p-1 rounded-xl border border-white/10 text-xs font-semibold">
              <motion.button
                onClick={() => setCurrentView("home")}
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentView === "home"
                    ? "text-blue-400 bg-blue-500/20 border border-blue-500/30"
                    : "text-gray-400 hover:text-white"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🏠 صفحه اصلی
              </motion.button>
              <motion.button
                onClick={() => setCurrentView("product")}
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentView === "product"
                    ? "text-blue-400 bg-blue-500/20 border border-blue-500/30"
                    : "text-gray-400 hover:text-white"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ⌚ اطلاعات محصول پرو ایکس
              </motion.button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 w-80 focus-within:border-blue-500/80 focus-within:bg-white/10 transition duration-300">
            <Search className="w-5 h-5 text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="جستجوی گجت، ساعت، موبایل..."
              className="bg-transparent outline-none text-sm w-full placeholder:text-gray-500"
            />
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={handleToggleWishlist}
              className={`w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition ${
                isWishlisted ? "text-red-500 bg-red-500/20" : "text-gray-300 hover:text-red-400 hover:bg-white/10"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
            </motion.button>

            <motion.button
              onClick={handleAddToCart}
              className="relative w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 text-gray-300 hover:text-blue-400 transition"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-blue-600 text-[11px] font-extrabold flex items-center justify-center border-2 border-slate-900">
                {cartCount}
              </span>
            </motion.button>

            <div className="h-6 w-px bg-white/10 hidden sm:block"></div>

            <motion.a
              href="#"
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 px-4 py-2.5 rounded-xl font-medium text-xs shadow-lg shadow-blue-900/40 transition"
              whileHover={{ scale: 1.05 }}
            >
              <User className="w-4 h-4" />
              ورود / ثبت‌نام
            </motion.a>
          </div>
        </div>

        {/* Mobile Navigation Switcher Bar */}
        <div className="flex lg:hidden justify-center gap-2 pb-3 px-4 border-t border-white/5 pt-2">
          <button
            onClick={() => setCurrentView("home")}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold text-center ${
              currentView === "home"
                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                : "bg-white/5 text-gray-300"
            }`}
          >
            صفحه اصلی
          </button>
          <button
            onClick={() => setCurrentView("product")}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold text-center ${
              currentView === "product"
                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                : "bg-white/5 text-gray-300"
            }`}
          >
            اطلاعات محصول پرو ایکس
          </button>
        </div>
      </motion.header>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {currentView === "home" ? (
          /* HOME VIEW */
          <motion.main
            key="home"
            className="view-section active-view flex-grow max-w-[1400px] w-full mx-auto px-4 sm:px-8 py-8 space-y-16"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.4 }}
          >
            {/* HERO SECTION */}
            <motion.section
              className="relative rounded-3xl glass-panel p-6 sm:p-12 overflow-hidden stage-tech-bg border border-blue-500/30"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
                <motion.div
                  className="lg:col-span-7 space-y-6 text-center lg:text-right"
                  variants={fadeInUp}
                >
                  <motion.div
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-bold"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
                    جدیدترین تکنولوژی ۲۰۲۵ رونمایی شد
                  </motion.div>

                  <motion.h1
                    className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    تجربه هوشمند زندگی با{" "}
                    <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300">
                      ساعت ورزشی پرو ایکس
                    </span>
                  </motion.h1>

                  <motion.p
                    className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    طراحی شده برای حرفه‌ای‌ها. آنالیز دقیق ضربان قلب، سنسور اکسیژن خون، GPS دوفرکانسه و باتری
                    فوق‌العاده با شارژدهی ۱۴ روزه. همین حالا تکنولوژی آینده را روی مچ دست خود لمس کنید.
                  </motion.p>

                  <motion.div
                    className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.button
                      onClick={() => setCurrentView("product")}
                      className="cta-btn px-8 py-4 rounded-2xl font-bold text-sm text-white flex items-center gap-3"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>خرید و مشاهده پرو ایکس</span>
                      <ArrowLeft className="w-5 h-5 rotate-180" />
                    </motion.button>
                    <motion.a
                      href="#featured-categories"
                      className="px-6 py-4 rounded-2xl glass-card font-semibold text-sm hover:bg-white/10 transition flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      دسته‌بندی محصولات
                    </motion.a>
                  </motion.div>

                  {/* Stats Row */}
                  <motion.div
                    className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-lg mx-auto lg:mx-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div>
                      <div className="text-xl sm:text-2xl font-black text-blue-400">+۵۰,۰۰۰</div>
                      <div className="text-xs text-gray-400 mt-1">فروش موفق</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-black text-blue-400">۱۰۰٪</div>
                      <div className="text-xs text-gray-400 mt-1">اصالت کالا</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-black text-blue-400">۲۴/۷</div>
                      <div className="text-xs text-gray-400 mt-1">پشتیبانی آنلاین</div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Hero Interactive Watch Graphic */}
                <motion.div
                  className="lg:col-span-5 flex justify-center relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-blue-600/20 blur-3xl animate-pulse"></div>
                    <motion.div
                      className="prod-img relative z-10 w-64 sm:w-80 cursor-pointer"
                      onClick={() => setCurrentView("product")}
                      animate={{ y: [0, -12, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]">
                        <rect x="110" y="10" width="80" height="70" rx="12" fill="#1e293b" />
                        <rect x="110" y="220" width="80" height="70" rx="12" fill="#1e293b" />
                        <path d="M110 30 h80 M110 50 h80 M110 240 h80 M110 260 h80" stroke="#0f172a" strokeWidth="3" />
                        <circle cx="150" cy="150" r="95" fill="#0f172a" stroke="#334155" strokeWidth="8" />
                        <circle cx="150" cy="150" r="88" fill="#020617" stroke="#2563eb" strokeWidth="3" />
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
                        <text x="150" y="132" fontSize="10" fill="#94a3b8" textAnchor="middle">
                          AM - THU 24
                        </text>
                        <text x="150" y="200" fontSize="12" fontWeight="bold" fill="#38bdf8" textAnchor="middle">
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
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.section>

            {/* CATEGORIES GRID */}
            <motion.section
              id="featured-categories"
              className="space-y-6"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">دسته‌بندی‌های محبوب</h2>
                  <p className="text-xs text-gray-400 mt-1">جدیدترین محصولات تکنولوژی بر اساس دسته</p>
                </div>
                <a href="#" className="text-xs text-blue-400 hover:underline font-semibold flex items-center gap-1">
                  مشاهده همه
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </a>
              </div>

              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {categories.map((category, index) => (
                  <motion.div
                    key={index}
                    onClick={() => index === 0 && setCurrentView("product")}
                    className="glass-card p-5 rounded-2xl flex flex-col items-center text-center cursor-pointer group"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05, y: -6 }}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition duration-300 mb-3">
                      {category.icon}
                    </div>
                    <h3 className="font-bold text-sm">{category.name}</h3>
                    <span className="text-[11px] text-gray-400 mt-1">{category.count}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>

            {/* FLASH SALE / FEATURED PRODUCTS */}
            <motion.section className="space-y-6" variants={fadeInUp} initial="initial" animate="animate">
              <motion.div
                className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-red-900/30 via-slate-900 to-slate-900 p-6 rounded-3xl border border-red-500/20"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🔥</span>
                  <div>
                    <h2 className="text-xl font-black text-white">پیشنهادهای شگفت‌انگیز امروز</h2>
                    <p className="text-xs text-red-300">تخفیف‌های ویژه با زمان محدود</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 dir-ltr">
                  <div className="bg-red-500/20 border border-red-500/40 text-red-400 px-3 py-1.5 rounded-xl font-mono text-lg font-bold">
                    08
                  </div>
                  <span className="text-red-400 font-bold">:</span>
                  <div className="bg-red-500/20 border border-red-500/40 text-red-400 px-3 py-1.5 rounded-xl font-mono text-lg font-bold">
                    42
                  </div>
                  <span className="text-red-400 font-bold">:</span>
                  <div className="bg-red-500/20 border border-red-500/40 text-red-400 px-3 py-1.5 rounded-xl font-mono text-lg font-bold">
                    15
                  </div>
                </div>
              </motion.div>

              {/* Product Cards Grid */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    className={`glass-card rounded-2xl p-5 flex flex-col justify-between relative group ${
                      product.id === 1 ? "border-blue-500/30" : ""
                    }`}
                    variants={fadeInUp}
                    whileHover={{ y: -6, scale: 1.02 }}
                  >
                    {product.discount && (
                      <span className="absolute top-4 right-4 z-10 bg-red-500 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full badge-discount">
                        {product.discount}٪ تخفیف
                      </span>
                    )}

                    <div
                      className="py-6 flex justify-center cursor-pointer"
                      onClick={() => setCurrentView("product")}
                    >
                      <div className="w-36 h-36 bg-blue-500/10 rounded-full flex items-center justify-center text-6xl group-hover:scale-110 transition duration-300">
                        {product.image}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>{product.category}</span>
                        <span className="text-amber-400 font-bold">{product.rating} ★</span>
                      </div>
                      <h3
                        onClick={() => setCurrentView("product")}
                        className="font-extrabold text-base hover:text-blue-400 transition cursor-pointer"
                      >
                        {product.title}
                      </h3>
                      <p className="text-xs text-gray-400 line-clamp-2">
                        {product.id === 1 && "صفحه نمایش AMOLED 1.43 اینچ، ضد آب IP68، پایش اکسیژن خون"}
                        {product.id === 2 && "حذف نویز فعال ANC، باتری ۳۰ ساعته همراه باکس شارژ"}
                        {product.id === 3 && "خروجی ۲۲.۵ وات، پشتیبانی از شارژ سریع PD3.0 و QC"}
                        {product.id === 4 && "پردازنده Snapdragon 8 Gen 3، دوربین 200 مگاپیکسلی"}
                      </p>

                      <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                        <div>
                          {product.originalPrice && (
                            <div className="text-xs text-gray-500 line-through">
                              {formatPrice(product.originalPrice)}
                            </div>
                          )}
                          <div className="text-lg font-black text-blue-400">
                            {formatPrice(product.price)}{" "}
                            <span className="text-xs text-gray-400 font-normal">تومان</span>
                          </div>
                        </div>
                        <motion.button
                          onClick={handleAddToCart}
                          className="px-3.5 py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/40 transition text-xs font-bold"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {product.id === 1 ? "مشاهده" : "+ خرید"}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>

            {/* FEATURES SECTION */}
            <motion.section
              className="grid md:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {[
                { icon: "🚀", title: "ارسال سریع و اکسپرس", desc: "تحویل زیر ۳ ساعت در تهران" },
                { icon: "🛡️", title: "ضمانت ۱۸ ماهه شرکتی", desc: "گارانتی تعویض و خدمات معتبر" },
                { icon: "💎", title: "ضمانت اصالت کالا", desc: "۱۰۰٪ اورجینال و باکیفیت" },
                { icon: "🎧", title: "پشتیبانی تخصصی ۲۴/۷", desc: "مشاوره رایگان خرید گجت" },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="glass-card p-6 rounded-2xl flex items-center gap-4"
                  variants={fadeInUp}
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
        ) : (
          /* PRODUCT VIEW */
          <motion.main
            key="product"
            className="view-section flex-grow max-w-[1400px] w-full mx-auto px-4 sm:px-8 py-8 space-y-12"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.4 }}
          >
            {/* Breadcrumb Nav */}
            <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
              <button onClick={() => setCurrentView("home")} className="hover:text-blue-400 transition">
                صفحه اصلی
              </button>
              <span className="text-gray-600">/</span>
              <span className="hover:text-blue-400 transition cursor-pointer">پوشیدنی هوشمند</span>
              <span className="text-gray-600">/</span>
              <span className="text-gray-200 font-medium">ساعت هوشمند ورزشی پرو ایکس</span>
            </nav>

            {/* PRODUCT HERO DISPLAY */}
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Gallery Section */}
              <motion.div
                className="lg:col-span-5 space-y-4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="glass-card rounded-3xl p-8 stage-tech-bg border border-blue-500/30 flex items-center justify-center relative min-h-[420px]">
                  <span className="absolute top-4 right-4 z-20 badge-discount text-white text-xs font-black px-3 py-1 rounded-full">
                    ۲۵٪ تخفیف ویژه
                  </span>

                  <motion.div
                    className="prod-img w-64 sm:w-80 transition-all duration-500"
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-[0_25px_40px_rgba(0,0,0,0.9)]">
                      <rect
                        x="110"
                        y="10"
                        width="80"
                        height="70"
                        rx="14"
                        fill={selectedColor.hex}
                      />
                      <rect
                        x="110"
                        y="220"
                        width="80"
                        height="70"
                        rx="14"
                        fill={selectedColor.hex}
                      />
                      <circle cx="150" cy="150" r="95" fill="#1e293b" stroke="#334155" strokeWidth="6" />
                      <circle cx="150" cy="150" r="88" fill="#030712" stroke="#2563eb" strokeWidth="3" />
                      <circle cx="150" cy="150" r="80" fill="#070a12" />

                      {watchView === 1 && (
                        <>
                          <circle cx="150" cy="150" r="68" fill="none" stroke="#1e293b" strokeWidth="6" />
                          <circle
                            cx="150"
                            cy="150"
                            r="68"
                            fill="none"
                            stroke="#2563eb"
                            strokeWidth="6"
                            strokeDasharray="427"
                            strokeDashoffset="100"
                            strokeLinecap="round"
                          />
                          <text
                            x="150"
                            y="125"
                            fontSize="32"
                            fontWeight="900"
                            fill="#ffffff"
                            textAnchor="middle"
                            fontFamily="sans-serif"
                          >
                            10:42
                          </text>
                          <text
                            x="150"
                            y="145"
                            fontSize="11"
                            fill="#60a5fa"
                            textAnchor="middle"
                            fontWeight="bold"
                          >
                            PRO X SPORT
                          </text>
                          <path
                            d="M 105 175 Q 125 175 135 155 T 155 195 T 175 145 T 195 175 H 200"
                            fill="none"
                            stroke="#ff4b5c"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                          <text
                            x="150"
                            y="210"
                            fontSize="11"
                            fontWeight="bold"
                            fill="#94a3b8"
                            textAnchor="middle"
                          >
                            ❤️ 138 BPM • 🔥 650 kcal
                          </text>
                        </>
                      )}

                      {watchView === 2 && (
                        <>
                          <text
                            x="150"
                            y="115"
                            fontSize="14"
                            fontWeight="bold"
                            fill="#38bdf8"
                            textAnchor="middle"
                          >
                            RUNNING MODE
                          </text>
                          <text
                            x="150"
                            y="155"
                            fontSize="36"
                            fontWeight="900"
                            fill="#ffffff"
                            textAnchor="middle"
                          >
                            08.45
                          </text>
                          <text x="150" y="175" fontSize="11" fill="#94a3b8" textAnchor="middle">
                            KM DISTANCE
                          </text>
                          <text
                            x="150"
                            y="205"
                            fontSize="12"
                            fontWeight="bold"
                            fill="#4ade80"
                            textAnchor="middle"
                          >
                            PACE 4'32" /km
                          </text>
                        </>
                      )}

                      {watchView === 3 && (
                        <>
                          <circle
                            cx="150"
                            cy="130"
                            r="35"
                            fill="none"
                            stroke="#22c55e"
                            strokeWidth="8"
                            strokeDasharray="220"
                            strokeDashoffset="30"
                          />
                          <text
                            x="150"
                            y="138"
                            fontSize="20"
                            fontWeight="900"
                            fill="#ffffff"
                            textAnchor="middle"
                          >
                            85%
                          </text>
                          <text
                            x="150"
                            y="185"
                            fontSize="12"
                            fontWeight="bold"
                            fill="#22c55e"
                            textAnchor="middle"
                          >
                            ⚡ Ultra Saver On
                          </text>
                          <text x="150" y="205" fontSize="10" fill="#94a3b8" textAnchor="middle">
                            11 Days Remaining
                          </text>
                        </>
                      )}

                      {watchView === 4 && (
                        <>
                          <text x="150" y="125" fontSize="28" fill="#38bdf8" textAnchor="middle">
                            🌊 50M
                          </text>
                          <text
                            x="150"
                            y="155"
                            fontSize="14"
                            fontWeight="bold"
                            fill="#ffffff"
                            textAnchor="middle"
                          >
                            WATER PROOF
                          </text>
                          <text x="150" y="185" fontSize="11" fill="#94a3b8" textAnchor="middle">
                            Swimming Mode Ready
                          </text>
                        </>
                      )}

                      <rect x="243" y="135" width="9" height="30" rx="4" fill="#64748b" />
                    </svg>
                  </motion.div>
                </div>

                {/* Thumbnail Switcher */}
                <div className="grid grid-cols-4 gap-3">
                  {[1, 2, 3, 4].map((mode) => (
                    <motion.button
                      key={mode}
                      onClick={() => setWatchView(mode)}
                      className={`glass-card p-2 rounded-xl flex items-center justify-center ${
                        watchView === mode ? "border-blue-500/60 bg-blue-500/10" : "hover:border-blue-500/40"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-2xl">
                        {mode === 1 && "⌚"}
                        {mode === 2 && "🏃"}
                        {mode === 3 && "🔋"}
                        {mode === 4 && "🌊"}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Main Product Info */}
              <motion.div
                className="lg:col-span-7 space-y-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-blue-400 font-bold mb-2">
                    <span>برند تکنوشاپ پرو</span>
                    <span>•</span>
                    <span className="text-emerald-400">موجود در انبار (ارسال فوری)</span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                    ساعت هوشمند ورزشی پرو ایکس | Pro X Sport Watch
                  </h1>
                  <p className="text-xs text-gray-400 mt-2">
                    مدل ۲۰۲۵ - نسخه تیتانیوم اسپرت با بند سیلیکونی آنتی‌باکتریال
                  </p>
                </div>

                {/* Rating & Reviews Header */}
                <div className="flex items-center gap-4 py-3 border-y border-white/10 text-xs sm:text-sm">
                  <div className="flex items-center gap-1 text-amber-400 font-bold">
                    <span>۴.۹</span>
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <span className="text-gray-500">|</span>
                  <button onClick={() => setActiveTab("reviews")} className="text-gray-300 hover:text-blue-400 transition">
                    ۱۴۲ دیدگاه ثبت‌شده کاربران
                  </button>
                  <span className="text-gray-500">|</span>
                  <span className="text-gray-400">۹۸٪ کاربران این محصول را پیشنهاد کرده‌اند</span>
                </div>

                {/* Key Highlights Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "صفحه نمایش", value: '1.43" AMOLED' },
                    { label: "باتری", value: "۱۴ روز شارژدهی" },
                    { label: "مقاومت آب", value: "5ATM / IP68" },
                    { label: "حالت ورزشی", value: "+۱۰۰ حالت هوشمند" },
                  ].map((item, index) => (
                    <div key={index} className="bg-white/5 border border-white/10 p-3 rounded-xl">
                      <div className="text-[11px] text-gray-400">{item.label}</div>
                      <div className="text-xs font-bold text-white mt-1">{item.value}</div>
                    </div>
                  ))}
                </div>

                {/* Color Selection */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-gray-300 flex items-center justify-between">
                    <span>
                      انتخاب رنگ بدنه و بند: <strong className="text-blue-400">{selectedColor.name}</strong>
                    </span>
                  </label>
                  <div className="flex items-center gap-4">
                    {[
                      { hex: "#0f172a", name: "مشکی کربنی" },
                      { hex: "#1e3a8a", name: "سرمه‌ای اسپرت" },
                      { hex: "#475569", name: "خاکستری تیتانیوم" },
                    ].map((color) => (
                      <motion.button
                        key={color.hex}
                        onClick={() => setSelectedColor(color)}
                        className={`swatch w-9 h-9 rounded-full border-2 focus:outline-none ${
                          selectedColor.hex === color.hex ? "active" : ""
                        }`}
                        style={{ backgroundColor: color.hex, borderColor: color.hex }}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                      />
                    ))}
                  </div>
                </div>

                {/* Pricing & Action Panel */}
                <motion.div
                  className="glass-panel p-6 rounded-3xl space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-xs text-gray-400 block mb-1">قیمت با تخفیف ویژه:</span>
                      <div className="flex items-baseline gap-3">
                        <span className="text-2xl sm:text-3xl font-black text-white">{formatPrice(9375000)}</span>
                        <span className="text-xs text-gray-300">تومان</span>
                        <span className="text-sm text-gray-500 line-through">{formatPrice(12500000)}</span>
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center bg-white/10 border border-white/15 rounded-xl px-3 py-1.5 gap-4">
                      <motion.button
                        onClick={() => setQuantity((prev) => prev + 1)}
                        className="text-lg font-bold text-gray-300 hover:text-white"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        +
                      </motion.button>
                      <span className="font-bold text-sm w-4 text-center">{quantity}</span>
                      <motion.button
                        onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                        className="text-lg font-bold text-gray-300 hover:text-white"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        -
                      </motion.button>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.button
                      onClick={handleAddToCart}
                      className="cta-btn flex-1 py-4 rounded-2xl font-black text-sm text-white flex items-center justify-center gap-3"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ShoppingCart className="w-5 h-5" />
                      افزودن به سبد خرید
                    </motion.button>

                    <motion.button
                      onClick={handleToggleWishlist}
                      className={`px-6 py-4 rounded-2xl glass-card font-bold text-xs flex items-center justify-center gap-2 ${
                        isWishlisted ? "text-red-500 bg-red-500/20" : ""
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      ❤️ افزودن به علاقه‌مندی
                    </motion.button>
                  </div>

                  {/* Assurance indicators */}
                  <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-gray-400 text-center border-t border-white/10">
                    <div>✔ ضمانت ۱۸ ماهه تکنوشاپ</div>
                    <div>✔ ۷ روز مهلت بازگشت</div>
                    <div>✔ تحویل اکسپرس</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* PRODUCT DETAILS TABS SECTION */}
            <motion.section
              className="space-y-6 pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Tabs Navigation */}
              <div className="flex border-b border-white/10 gap-2 overflow-x-auto pb-2">
                {[
                  { id: "overview", label: "🔍 بررسی تخصصی" },
                  { id: "specs", label: "⚙️ مشخصات فنی" },
                  { id: "reviews", label: "💬 نظرات کاربران (۱۴۲)" },
                  { id: "faq", label: "❓ سوالات متداول" },
                ].map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`tab-btn px-6 py-3 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap ${
                      activeTab === tab.id ? "active" : "text-gray-400 hover:text-white"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tab.label}
                  </motion.button>
                ))}
              </div>

              {/* Tab Panels */}
              <AnimatePresence mode="wait">
                {activeTab === "overview" && (
                  <motion.div
                    key="overview"
                    className="tab-panel active glass-card p-6 sm:p-8 rounded-3xl space-y-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-blue-400">آنالیز دقیق و هوشمند با ساعت ورزشی پرو ایکس</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      ساعت هوشمند پرو ایکس با بدنه مقاوم از جنس آلیاژ تیتانیوم و صفحه نمایش AMOLED با تراکم پیکسلی بالا،
                      دقیق‌ترین داده‌های سلامت و ورزشی شما را پایش می‌کند. سیستم GPS دوفرکانسه این ساعت امکان مسیریابی
                      بی‌نظیر در محیط‌های کوهستانی و شهری را فراهم می‌سازد.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6 pt-4">
                      {[
                        {
                          icon: "💓",
                          title: "پایش ۲۴ ساعته ضربان و اکسیژن",
                          desc: "سنسور نوری نهایی نسل 5 با هشدار خودکار در صورت نوسانات غیرطبیعی قلب.",
                        },
                        {
                          icon: "🌊",
                          title: "مقاومت کامل در برابر آب",
                          desc: "استاندارد 5ATM مناسب برای شنا در استخر و آب‌های آزاد تا عمق ۵۰ متر.",
                        },
                        {
                          icon: "🔋",
                          title: "شارژدهی طولانی مدت",
                          desc: "باتری ۴۵۰ میلی‌آمپری با قابلیت شارژ سریع مغناطیسی تنها در ۴۵ دقیقه.",
                        },
                      ].map((item, index) => (
                        <div key={index} className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-2">
                          <div className="text-2xl">{item.icon}</div>
                          <h4 className="font-bold text-sm">{item.title}</h4>
                          <p className="text-xs text-gray-400">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === "specs" && (
                  <motion.div
                    key="specs"
                    className="tab-panel glass-card p-6 sm:p-8 rounded-3xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-lg font-bold text-white mb-6">جدول مشخصات فنی پرو ایکس</h3>
                    <div className="divide-y divide-white/10 text-xs sm:text-sm">
                      {[
                        { label: "ابعاد و وزن", value: "46.5 x 46.5 x 10.9 میلی‌متر | ۴۸ گرم" },
                        { label: "جنس بدنه", value: "آلیاژ تیتانیوم فضایی + شیشه سرامیکی ضدخدشه" },
                        { label: "نوع صفحه نمایش", value: '1.43 اینچ Ultra HD AMOLED (466x466 پیکسل)' },
                        { label: "سازگاری", value: "اندروید 7.0 به بالا و iOS 12.0 به بالا" },
                        { label: "اتصالات", value: "Bluetooth 5.3, Dual-Band GPS, NFC" },
                        {
                          label: "سنسورها",
                          value: "شتاب‌سنج، ژیروسکوپ، سنجش اکسیژن خون (SpO2)، شمارنده ضربان، فشارسنج",
                        },
                      ].map((row, index) => (
                        <div key={index} className="grid grid-cols-3 py-3">
                          <span className="text-gray-400">{row.label}</span>
                          <span className="col-span-2 text-gray-200">{row.value}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === "reviews" && (
                  <motion.div
                    key="reviews"
                    className="tab-panel glass-card p-6 sm:p-8 rounded-3xl space-y-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-white">نظرات خریداران</h3>
                      <motion.button
                        onClick={() => alert("فرم ثبت نظر به‌زودی باز می‌شود")}
                        className="px-4 py-2 rounded-xl bg-blue-600/30 text-blue-300 border border-blue-500/40 text-xs font-bold hover:bg-blue-600 hover:text-white transition"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        + ثبت نظر جدید
                      </motion.button>
                    </div>

                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <div key={review.id} className="bg-white/5 p-4 rounded-2xl space-y-2 border border-white/5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-blue-400">{review.name}</span>
                            <div className="flex items-center gap-1 text-amber-400">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-3 h-3 ${i < review.rating ? "fill-current" : ""}`} />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-gray-300 leading-relaxed">{review.comment}</p>
                          <span className="text-[10px] text-gray-500 block">{review.date}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === "faq" && (
                  <motion.div
                    key="faq"
                    className="tab-panel glass-card p-6 sm:p-8 rounded-3xl space-y-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {faqs.map((faq) => (
                      <details
                        key={faq.id}
                        className="bg-white/5 p-4 rounded-2xl border border-white/10 group cursor-pointer"
                      >
                        <summary className="font-bold text-sm text-gray-200 list-none flex justify-between items-center">
                          {faq.question}
                          <span className="text-blue-400 transition group-open:rotate-180">▼</span>
                        </summary>
                        <p className="text-xs text-gray-400 mt-3 leading-relaxed">{faq.answer}</p>
                      </details>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>
          </motion.main>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.footer
        className="mt-20 border-t border-white/10 bg-slate-950/80 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-lg">⚡</div>
              <span className="text-xl font-black">تکنوشاپ</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              مرجع تخصصی عرضه جدیدترین گجت‌های هوشمند، ساعت‌های ورزشی و لوازم جانبی دیجیتال با ضمانت اصالت کالا.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-4 text-blue-400">دسترسی سریع</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button onClick={() => setCurrentView("home")} className="hover:text-white transition">
                  صفحه اصلی
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView("product")} className="hover:text-white transition">
                  ساعت هوشمند پرو ایکس
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  پیشنهادهای شگفت‌انگیز
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  پیگیری سفارشات
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-4 text-blue-400">خدمات مشتریان</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  شرایط بازگشت کالا
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  راهنمای خرید و پرداخت
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  حریم خصوصی
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  سوالات متداول
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-4 text-blue-400">عضویت در خبرنامه</h4>
            <p className="text-xs text-gray-400 mb-3">از آخرین تخفیف‌ها و گجت‌های جدید مطلع شوید:</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="ایمیل شما..."
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs outline-none w-full focus:border-blue-500"
              />
              <motion.button
                className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl text-xs font-bold transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                عضویت
              </motion.button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 py-4 text-center text-xs text-gray-500">
          تمامی حقوق این وب‌سایت متعلق به تکنوشاپ می‌باشد © ۲۰۲۵
        </div>
      </motion.footer>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            className="fixed bottom-6 left-6 z-50 glass-panel border border-blue-500/50 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <CheckCircle className="w-6 h-6 text-green-400" />
            <div>
              <div className="font-bold text-xs">محصول به سبد خرید اضافه شد</div>
              <div className="text-[10px] text-gray-300">ساعت هوشمند پرو ایکس ({quantity} عدد)</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
