import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatMonthYear } from "../utils/dateHelpers";

export default function MonthNavigator({ selectedMonth, onMonthChange, variants }) {
  const changeMonth = (offset) => {
    onMonthChange(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + offset, 1));
  };

  return (
    <motion.div variants={variants} className="flex items-center gap-1 bg-[#11161A] p-1 rounded-xl border border-[#232D36] w-fit mb-5">
      <button onClick={() => changeMonth(-1)} className="p-1.5 rounded-lg text-gray-400 hover:text-white transition-all" aria-label="Bulan sebelumnya">
        <ChevronLeft size={14} />
      </button>
      <span className="text-xs font-semibold px-3 text-gray-200 min-w-[90px] text-center capitalize">
        {formatMonthYear(selectedMonth)}
      </span>
      <button onClick={() => changeMonth(1)} className="p-1.5 rounded-lg text-gray-400 hover:text-white transition-all" aria-label="Bulan berikutnya">
        <ChevronRight size={14} />
      </button>
    </motion.div>
  );
}
