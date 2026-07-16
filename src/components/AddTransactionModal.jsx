import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { CATEGORIES_BY_TYPE, TRANSACTION_TYPES } from "../models/transactionModel";

export default function AddTransactionModal({ isOpen, onClose, onAddTransaction }) {
  const [type, setType] = useState(TRANSACTION_TYPES.PENGELUARAN);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);

  const availableCategories = CATEGORIES_BY_TYPE[type] || [];

  useEffect(() => {
    if (availableCategories.length > 0) {
      setCategory(availableCategories[0]);
    }
  }, [type, isOpen]);

  const resetForm = () => {
    setAmount("");
    setNote("");
    setType(TRANSACTION_TYPES.PENGELUARAN);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const parsedAmount = Number(amount);
    if (!amount || parsedAmount <= 0 || !category || !note.trim() || !date) {
      alert("Harap isi semua kolom dengan valid!");
      return;
    }

    onAddTransaction({
      id: Date.now(),
      type,
      amount: parsedAmount,
      category,
      note: note.trim(),
      date,
    });

    resetForm();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl border border-[#E5E7EB] relative z-10 text-xs">
            <div className="px-5 py-4 border-b border-[#E5E7EB] flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#111827]">Tambah Transaksi Baru</h3>
              <button onClick={onClose} className="p-1 rounded-lg hover:bg-[#F3F4F6] text-[#6B7280] transition-colors">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-5 space-y-4">
              {/* Tipe Selector */}
              <div>
                <label className="block text-[11px] font-medium text-[#6B7280] mb-1.5">Tipe Transaksi</label>
                <div className="grid grid-cols-2 gap-1 bg-[#F3F4F6] p-1 rounded-xl border border-[#E5E7EB]">
                  <button type="button" onClick={() => setType(TRANSACTION_TYPES.PENGELUARAN)} className={`py-1.5 rounded-lg font-semibold transition-all ${type === TRANSACTION_TYPES.PENGELUARAN ? "bg-white text-[#EF4444] shadow-sm" : "text-[#4B5563]"}`}>
                    Pengeluaran
                  </button>
                  <button type="button" onClick={() => setType(TRANSACTION_TYPES.PEMASUKAN)} className={`py-1.5 rounded-lg font-semibold transition-all ${type === TRANSACTION_TYPES.PEMASUKAN ? "bg-white text-[#16A34A] shadow-sm" : "text-[#4B5563]"}`}>
                    Pemasukan
                  </button>
                </div>
              </div>

              {/* Nominal */}
              <div>
                <label className="block text-[11px] font-medium text-[#6B7280] mb-1">Nominal (Rp)</label>
                <input type="number" min="1" placeholder="Contoh: 50000" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-2.5 rounded-xl border border-[#E5E7EB] focus:outline-none focus:border-[#111827] text-sm text-[#111827]" />
              </div>

              {/* Kategori Dinamis */}
              <div>
                <label className="block text-[11px] font-medium text-[#6B7280] mb-1">Kategori</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2.5 rounded-xl border border-[#E5E7EB] bg-white focus:outline-none focus:border-[#111827] text-sm text-[#111827]">
                  {availableCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Catatan */}
              <div>
                <label className="block text-[11px] font-medium text-[#6B7280] mb-1">Catatan / Keterangan</label>
                <input type="text" placeholder="Makan siang, bonus projek, dll" value={note} onChange={(e) => setNote(e.target.value)} className="w-full p-2.5 rounded-xl border border-[#E5E7EB] focus:outline-none focus:border-[#111827] text-sm text-[#111827]" />
              </div>

              {/* Tanggal */}
              <div>
                <label className="block text-[11px] font-medium text-[#6B7280] mb-1">Tanggal</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2.5 rounded-xl border border-[#E5E7EB] focus:outline-none focus:border-[#111827] text-sm text-[#111827]" />
              </div>

              <div className="pt-2">
                <button type="submit" className="w-full bg-[#111827] hover:bg-[#1F2937] text-white font-medium py-2.5 rounded-xl text-sm transition-colors shadow-sm">
                  Simpan Transaksi
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
