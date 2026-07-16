import React from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { formatRupiah, formatDate } from "../utils/formatters";
import { getCategoryStyle } from "../models/transactionModel";

export default function TransactionRow({ transaction, onDelete }) {
  const { icon: Icon, bg } = getCategoryStyle(transaction.category);
  const isIncome = transaction.type === "pemasukan";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: -30, scale: 0.95 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="p-4 flex items-center justify-between hover:bg-[#1D262F]/50 transition-colors group"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${bg}25`, color: bg }}
        >
          <Icon size={16} />
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-xs text-gray-200 truncate">{transaction.category}</p>
          <p className="text-[11px] text-gray-500 mt-0.5 truncate">
            {formatDate(transaction.date)} • {transaction.note}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className={`text-xs font-bold ${isIncome ? "text-[#10B981]" : "text-gray-300"}`}>
          {isIncome ? "+" : "-"}
          {formatRupiah(transaction.amount)}
        </span>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onDelete(transaction.id)}
          className="text-gray-600 hover:text-red-400 p-1 rounded transition-all opacity-0 group-hover:opacity-100"
        >
          <Trash2 size={13} />
        </motion.button>
      </div>
    </motion.div>
  );
}
