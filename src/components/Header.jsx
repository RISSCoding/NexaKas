import React from "react";
import { motion } from "framer-motion";
import { formatRupiah } from "../utils/formatters";

export default function Header({ balance }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative bg-[#26241D] rounded-2xl overflow-hidden mb-6 shadow-lg"
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-6 flex flex-col justify-evenly items-center"
        style={{ background: "repeating-linear-gradient(#3A362B, #3A362B 1px, transparent 1px, transparent 100%)" }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="w-2.5 h-2.5 rounded-full bg-[#F5F1E8] opacity-80" />
        ))}
      </div>
      <div className="pl-12 pr-6 py-6 sm:py-8 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#F5F1E8]">NexaKas</h1>
          <p className="uppercase tracking-[0.25em] text-xs text-[#C9A24A] font-mono mb-1">Pelacak Keuangan Digital</p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-widest text-[#F5F1E8]/60 font-mono mb-1">Saldo Saat Ini</p>
          <motion.p 
            layout
            className={`font-mono text-2xl sm:text-3xl font-semibold transition-colors duration-300 ${balance >= 0 ? "text-[#8FBF9F]" : "text-[#E08A78]"}`}
          >
            {formatRupiah(balance)}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}