import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

// Components
import AddTransactionModal from "./components/AddTransactionModal";
import BalanceCard from "./components/BalanceCard";
import CategoryChart from "./components/CategoryChart";
import TransactionRow from "./components/TransactionRow";
import MonthNavigator from "./components/MonthNavigator";
import TransactionFilterTabs from "./components/TransactionFiterTabs";
import QuickActionCard from "./components/QuickActionCard";

// Hooks & Models
import { useTransactions } from "./hooks/useTransactions";
import { TRANSACTION_TYPES } from "./models/transactionModel";

const CONTAINER_ANIMATION_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, ease: "easeOut" },
  },
};

const ITEM_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export default function App() {
  const [selectedMonth, setSelectedMonth] = useState(() => new Date());
  const [filterType, setFilterType] = useState(TRANSACTION_TYPES.SEMUA);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Konsumsi data dari Hook Terpusat (Eliminasi Kode Mati/Duplikasi)
  const {
    currentMonthTransactions,
    filteredTransactions,
    financialsSummary,
    dailyActivityData,
    addTransaction,
    deleteTransaction,
  } = useTransactions(selectedMonth, filterType);

  return (
    <div className="min-h-screen bg-[#0B0F12] text-white font-sans antialiased pb-12 overflow-x-hidden">
      {/* Navbar Header */}
      <header className="max-w-5xl mx-auto px-4 h-20 flex items-center justify-between">
        <motion.h1 initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="font-bold text-xl tracking-tight text-gray-100">
          NexaKas
        </motion.h1>
        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: "#047857" }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsModalOpen(true)}
          className="bg-[#059669] text-white font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-colors"
        >
          <Plus size={14} /> Tambah Transaksi
        </motion.button>
      </header>

      {/* Main Content Dashboard */}
      <motion.div variants={CONTAINER_ANIMATION_VARIANTS} initial="hidden" animate="visible" className="max-w-5xl mx-auto px-4">

        {/* Kontrol Bulan */}
        <MonthNavigator selectedMonth={selectedMonth} onMonthChange={setSelectedMonth} variants={ITEM_ANIMATION_VARIANTS} />

        {/* Tab Filter */}
        <TransactionFilterTabs activeFilter={filterType} onFilterChange={setFilterType} variants={ITEM_ANIMATION_VARIANTS} />

        {/* Grid Ringkasan Keuangan */}
        <motion.div variants={ITEM_ANIMATION_VARIANTS} className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <BalanceCard transactions={currentMonthTransactions} totals={financialsSummary} filterType={filterType} />
          <CategoryChart data={dailyActivityData} totals={financialsSummary} selectedMonth={selectedMonth} />
        </motion.div>

        {/* Tata Letak Transaksi dan Aksi Cepat */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5 items-start">

          {/* List Transaksi */}
          <motion.div variants={ITEM_ANIMATION_VARIANTS} className="md:col-span-3 bg-[#171E24] rounded-2xl border border-[#232D36] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#232D36] flex items-center justify-between">
              <h3 className="font-semibold text-sm text-gray-200">Transaksi Terbaru</h3>
              <span className="text-gray-500 cursor-pointer hover:text-gray-300">•••</span>
            </div>

            <div className="divide-y divide-[#1D262F] max-h-[380px] overflow-y-auto pr-1">
              <AnimatePresence mode="popLayout">
                {filteredTransactions.length === 0 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-8 text-center text-gray-500 text-xs">
                    Belum ada catatan transaksi pada bulan ini.
                  </motion.div>
                ) : (
                  filteredTransactions.map((tx) => (
                    <TransactionRow key={tx.id} transaction={tx} onDelete={deleteTransaction} />
                  ))
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Kolom Aksi Cepat */}
          <QuickActionCard onActionClick={() => setIsModalOpen(true)} variants={ITEM_ANIMATION_VARIANTS} />
        </div>
      </motion.div>

      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddTransaction={addTransaction} />
    </div>
  );
}
