import React from "react";
import { useMoneyTracker } from "./hooks/useMoneyTracker";
import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import TransactionList from "./components/TransactionList";
import CategoryBreakdown from "./components/CategoryBreakdown";

export default function App() {
  const {
    filteredTransactions,
    filter,
    setFilter,
    totals,
    categoryData,
    addTransaction,
    deleteTransaction,
  } = useMoneyTracker();

  return (
    <div className="min-h-screen bg-[#F5F1E8] font-sans text-[#26241D] p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* VIEW: Bagian Atas */}
        <Header balance={totals.balance} />

        {/* VIEW: Tiga Kartu Summary */}
        <SummaryCards totals={totals} />

        {/* VIEW: Konten Bawah Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          
          {/* VIEW: Daftar & Form Riwayat Transaksi */}
          <TransactionList 
            items={filteredTransactions}
            filter={filter}
            onFilterChange={setFilter}
            onAdd={addTransaction}
            onDelete={deleteTransaction}
          />

          {/* VIEW: Analisis Chart Kategori */}
          <CategoryBreakdown data={categoryData} />
          
        </div>
      </div>
    </div>
  );
}