"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            تماس با ما
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            برای هرگونه سوال، پیشنهاد یا انتقاد در ارتباط با ما باشید. تیم پشتیبانی ما آماده پاسخگویی به شماست.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">تلفن تماس</h3>
                  <p className="text-gray-300 dir-ltr">+98 21 1234 5678</p>
                  <p className="text-gray-400 text-sm mt-1">شنبه تا چهارشنبه ۹ صبح تا ۶ عصر</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">ایمیل</h3>
                  <p className="text-gray-300 dir-ltr">support@technoshop.com</p>
                  <p className="text-gray-400 text-sm mt-1">پاسخگویی در کمتر از ۲۴ ساعت</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">آدرس</h3>
                  <p className="text-gray-300">تهران، خیابان ولیعصر، برج فناوری، طبقه ۱۰</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">ساعات کاری</h3>
                  <p className="text-gray-300">شنبه تا چهارشنبه: ۹:۰۰ - ۱۸:۰۰</p>
                  <p className="text-gray-400 text-sm mt-1">پنجشنبه: ۹:۰۰ - ۱۳:۰۰</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">ارسال پیام</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      نام و نام خانوادگی
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="علی محمدی"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      شماره تماس
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all dir-ltr"
                      placeholder="09123456789"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    ایمیل
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all dir-ltr"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    موضوع پیام
                  </label>
                  <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
                    <option value="" className="bg-gray-800">انتخاب موضوع</option>
                    <option value="support" className="bg-gray-800">پشتیبانی فنی</option>
                    <option value="sales" className="bg-gray-800">مشاوره خرید</option>
                    <option value="complaint" className="bg-gray-800">شکایات و انتقادات</option>
                    <option value="suggestion" className="bg-gray-800">پیشنهادات</option>
                    <option value="other" className="bg-gray-800">سایر</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    متن پیام
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                    placeholder="پیام خود را اینجا بنویسید..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-purple-500/25"
                >
                  <Send className="w-5 h-5" />
                  ارسال پیام
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12"
        >
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">موقعیت مکانی</h2>
            <div className="w-full h-80 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl flex items-center justify-center border border-white/10">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">نقشه گوگل در این بخش نمایش داده می‌شود</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
