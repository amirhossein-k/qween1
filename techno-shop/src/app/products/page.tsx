"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/products/Navbar";
import FilterPanel, { emptyFilters, type Filters } from "@/components/products/FilterPanel";
import ProductCard from "@/components/products/ProductCard";
import { products, type Product } from "@/data/products";

export default function ProductsPage() {
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [likedIds, setLikedIds] = useState<number[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [toast, setToast] = useState<{ show: boolean; message: string }>({
    show: false,
    message: "",
  });

  const handleLike = (id: number) => {
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (product: Product) => {
    setCartCount((c) => c + 1);
    setToast({ show: true, message: `«${product.name}» به سبد خرید اضافه شد` });
    setTimeout(() => setToast({ show: false, message: "" }), 2500);
  };

  const counts = {
    categories: {} as Record<string, number>,
    brands: {} as Record<string, number>,
  };

  return (
    <main className="flex-grow max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Navbar
        cartCount={cartCount}
        likedCount={likedIds.length}
        query={filters.query}
        onQuery={(q) => setFilters((f) => ({ ...f, query: q }))}
      />

      <div className="mt-6 flex gap-6">
        {/* Desktop Filter Panel */}
        <aside className="hidden lg:block w-72 shrink-0">
          <FilterPanel
            filters={filters}
            onChange={(patch) => setFilters((f) => ({ ...f, ...patch }))}
            onReset={() => setFilters(emptyFilters)}
            counts={counts}
          />
        </aside>

        {/* Products Grid/List */}
        <section className="flex-1 min-w-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {products.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                view="grid"
                liked={likedIds.includes(product.id)}
                onLike={handleLike}
                onAdd={handleAddToCart}
                index={idx}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 w-[280px] bg-slate-900 border-r border-white/10 p-4 overflow-y-auto lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white">فیلترها</h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-2 rounded-xl hover:bg-white/10 transition"
                >
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <FilterPanel
                filters={filters}
                onChange={(patch) => setFilters((f) => ({ ...f, ...patch }))}
                onReset={() => setFilters(emptyFilters)}
                counts={counts}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 glass-panel px-6 py-3 rounded-2xl border border-emerald-500/30 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <p className="text-sm font-bold text-emerald-300">{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
