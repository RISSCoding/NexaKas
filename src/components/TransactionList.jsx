import React, { useState } from "react";
import { Plus, Trash2, X, PiggyBank } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TransactionForm from "./TransactionForm";
import { CATEGORY_COLORS } from "../models/transactionModel";
import { formatRupiah, formatDate } from "../utils/formatters";

export default function TransactionList({ items, filter, onFilterChange, onAdd, onDelete }) {
  const [formOpen, setFormOpen] = useState(false);

  const filterButtons = [
    { key: "semua", label: "Semua" },
    { key: "pemasukan", label: "Pemasukan" },
    { key: "pengeluaran", label: "Pengeluaran" },
  ];

  return (
    <div className="lg:col-span-3 bg-white rounded-xl border border-[#E5DFCF] overflow-hidden flex flex-col h-fit">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5DFCF]">
        <h2 className="font-serif text-xl">Riwayat Transaksi</h2>
        <button
          onClick={() => setFormOpen((v) => !v)}
          className="flex items-center gap-1.5 bg-[#26241D] text-[#F5F1E8] text-sm font-mono px-3 py-2 rounded-lg hover:bg-[#3A362B] transition-all duration-150 active:scale-95"
        >
          {formOpen ? <X size={16} /> : <Plus size={16} />}
          {formOpen ? "Tutup" : "Tambah"}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {formOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <TransactionForm onSave={(data) => { onAdd(data); setFormOpen(false); }} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-2 px-5 py-3 border-b border-[#E5DFCF]">
        {filterButtons.map((f) => (
          <button
            key={f.key}
            onClick={() => onFilterChange(f.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-mono border transition-all duration-150 active:scale-95 ${
              filter === f.key ? "bg-[#26241D] text-[#F5F1E8] border-[#26241D]" : "bg-white text-[#8A8578] border-[#E5DFCF] hover:border-[#26241D]/30"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div
        className="max-h-[420px] overflow-y-auto min-h-[150px]"
        style={{ backgroundImage: "repeating-linear-gradient(#FFFFFF, #FFFFFF 55px, #EFE9D9 56px)" }}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {items.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="py-14 text-center text-[#8A8578] font-mono text-sm"
            >
              <PiggyBank size={28} className="mx-auto mb-2 opacity-50" />
              Belum ada transaksi di kategori ini.
            </motion.div>
          ) : (
            items.map((t) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: -20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: 56 }}
                exit={{ opacity: 0, x: 50, height: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30, opacity: { duration: 0.2 } }}
                className="flex items-center justify-between gap-3 px-5 group overflow-hidden border-b border-[#EFE9D9]/30"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: t.type === "pemasukan" ? "#2D5A3D" : CATEGORY_COLORS[t.category] || "#8A8578" }}
                  />
                  <div className="min-w-0">
                    <p className="text-sm truncate">{t.note}</p>
                    <p className="text-xs text-[#8A8578] font-mono">
                      {t.category} · {formatDate(t.date)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`font-mono text-sm font-medium ${t.type === "pemasukan" ? "text-[#2D5A3D]" : "text-[#B34B3C]"}`}>
                    {t.type === "pemasukan" ? "+" : "-"}
                    {formatRupiah(t.amount)}
                  </span>
                  <button
                    onClick={() => onDelete(t.id)}
                    className="opacity-0 group-hover:opacity-100 text-[#8A8578] hover:text-[#B34B3C] transition-all duration-150 hover:scale-125"
                    aria-label="Hapus transaksi"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}