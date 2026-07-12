import React, { useState } from "react";
import { CATEGORIES } from "../models/transactionModel";

export default function TransactionForm({ onSave }) {
  const [type, setType] = useState("pengeluaran");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES.pengeluaran[0]);
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  function handleTypeChange(newType) {
    setType(newType);
    setCategory(CATEGORIES[newType][0]);
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!amount || !date) return;
    
    onSave({ type, amount, category, note, date });
    
    setAmount("");
    setNote("");
  }

  return (
    <form onSubmit={onSubmit} className="px-5 py-4 border-b border-[#E5DFCF] bg-[#FAF8F2] space-y-3 overflow-hidden">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => handleTypeChange("pengeluaran")}
          className={`flex-1 py-2 rounded-lg text-sm font-mono border transition-all duration-150 active:scale-95 ${
            type === "pengeluaran" ? "bg-[#B34B3C] text-white border-[#B34B3C]" : "bg-white text-[#8A8578] border-[#E5DFCF]"
          }`}
        >
          Pengeluaran
        </button>
        <button
          type="button"
          onClick={() => handleTypeChange("pemasukan")}
          className={`flex-1 py-2 rounded-lg text-sm font-mono border transition-all duration-150 active:scale-95 ${
            type === "pemasukan" ? "bg-[#2D5A3D] text-white border-[#2D5A3D]" : "bg-white text-[#8A8578] border-[#E5DFCF]"
          }`}
        >
          Pemasukan
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-[#8A8578] font-mono mb-1">Jumlah (Rp)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            required
            min="1"
            className="w-full px-3 py-2 rounded-lg border border-[#E5DFCF] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#26241D]"
          />
        </div>
        <div>
          <label className="block text-xs text-[#8A8578] font-mono mb-1">Tanggal</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-3 py-2 rounded-lg border border-[#E5DFCF] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#26241D]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-[#8A8578] font-mono mb-1">Kategori</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-[#E5DFCF] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#26241D]"
        >
          {CATEGORIES[type].map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs text-[#8A8578] font-mono mb-1">Catatan (opsional)</label>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="cth: makan siang bareng teman"
          className="w-full px-3 py-2 rounded-lg border border-[#E5DFCF] text-sm focus:outline-none focus:ring-2 focus:ring-[#26241D]"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#26241D] text-[#F5F1E8] font-mono text-sm py-2.5 rounded-lg hover:bg-[#3A362B] transition-all duration-150 active:scale-[0.98]"
      >
        Simpan Transaksi
      </button>
    </form>
  );
}