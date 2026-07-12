import React from "react";
import { motion } from "framer-motion";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { formatRupiah } from "../utils/formatters";

export default function SummaryCards({ totals }) {
  const cards = [
    { title: "Saldo", value: totals.balance, icon: <Wallet size={20} className="text-[#26241D]" />, bg: "bg-[#EFE8D6]", textColor: "text-[#26241D]" },
    { title: "Pemasukan", value: totals.income, icon: <TrendingUp size={20} className="text-[#2D5A3D]" />, bg: "bg-[#E4EEE6]", textColor: "text-[#2D5A3D]" },
    { title: "Pengeluaran", value: totals.expense, icon: <TrendingDown size={20} className="text-[#B34B3C]" />, bg: "bg-[#F3E4DF]", textColor: "text-[#B34B3C]" }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {cards.map((card, idx) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: idx * 0.1 }}
          className="bg-white rounded-xl p-5 border border-[#E5DFCF] flex items-center gap-4 transition-shadow duration-200 hover:shadow-md"
        >
          <div className={`w-11 h-11 rounded-full ${card.bg} flex items-center justify-center shrink-0`}>
            {card.icon}
          </div>
          <div>
            <p className="text-xs text-[#8A8578] uppercase tracking-wide font-mono">{card.title}</p>
            <p className={`font-mono font-semibold text-lg ${card.textColor}`}>{formatRupiah(card.value)}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}