import React from "react";
import { motion } from "framer-motion";
import { FILTER_TYPES } from "../models/transactionModel";

export default function TransactionFilterTabs({ activeFilter, onFilterChange, variants }) {
  return (
    <motion.div variants={variants} className="flex items-center gap-2 mb-6 text-xs font-medium relative">
      {FILTER_TYPES.map((type) => {
        const isActive = activeFilter === type;
        return (
          <button
            key={type}
            onClick={() => onFilterChange(type)}
            className={`px-4 py-1.5 rounded-full capitalize relative z-10 transition-colors duration-300 ${
              isActive ? "text-white font-semibold" : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {type}
            {isActive && (
              <motion.div
                layoutId="activeTabBackground"
                className="absolute inset-0 bg-[#1E293B] border border-[#334155] rounded-full -z-10"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </motion.div>
  );
}
