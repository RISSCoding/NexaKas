import React from "react";
import { motion } from "framer-motion";
import { Wallet } from "lucide-react";

export default function QuickActionCard({ onActionClick, variants }) {
  return (
    <motion.div variants={variants} className="md:col-span-2 bg-[#171E24] rounded-2xl p-6 border border-[#232D36] flex flex-col items-center justify-center text-center h-[280px]">
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="w-12 h-12 rounded-full bg-[#11161A] flex items-center justify-center border border-[#232D36] mb-4 text-[#059669]"
      >
        <Wallet size={20} />
      </motion.div>
      <h3 className="text-sm font-semibold text-gray-200 mb-1">Catat Transaksi</h3>
      <p className="text-[11px] text-gray-500 mb-5 max-w-[220px]">Yuk catat pemasukan atau pengeluaran kamu biar keuangan tetap terpantau.</p>
      <motion.button
        whileHover={{ scale: 1.02, backgroundColor: "#047857" }}
        whileTap={{ scale: 0.98 }}
        onClick={onActionClick}
        className="w-full bg-[#059669] text-white font-semibold py-2.5 rounded-xl text-xs transition-colors shadow-sm"
      >
        Tambah Transaksi
      </motion.button>
    </motion.div>
  );
}
