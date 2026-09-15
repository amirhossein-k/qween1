"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import ProductCard from "./ProductCard";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  badgeColor?: string;
  rating?: number;
}

interface ProductCarouselProps {
  title: string;
  products: Product[];
  viewAllLink?: string;
}

export default function ProductCarousel({ title, products, viewAllLink = "/products" }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === "left" ? -400 : 400;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
          <span className="w-2 h-8 bg-red-500 rounded-full"></span>
          {title}
        </h2>
        {viewAllLink && (
          <Link href={viewAllLink} className="text-gray-400 hover:text-red-400 transition-colors text-sm flex items-center gap-1">
            مشاهده همه
            <ChevronLeft size={16} />
          </Link>
        )}
      </div>

      <div className="relative group">
        {/* دکمه چپ */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 backdrop-blur-md border border-white/10 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500 hover:border-red-500 hidden md:block"
        >
          <ChevronRight size={24} />
        </button>

        {/* لیست محصولات */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="min-w-[280px] md:min-w-[300px] snap-start"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* دکمه راست */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 backdrop-blur-md border border-white/10 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500 hover:border-red-500 hidden md:block"
        >
          <ChevronLeft size={24} />
        </button>
      </div>
    </section>
  );
}
