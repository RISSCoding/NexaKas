import { useState, useEffect, useMemo } from "react";
import { TransactionModel } from "../models/transactionModel";

export function useMoneyTracker() {
  // Mengambil state awal langsung dari Model (localStorage)
  const [transactions, setTransactions] = useState(() => TransactionModel.getAll());
  const [filter, setFilter] = useState("semua");

  // Efek samping: Setiap kali transaksi berubah, otomatis simpan ke device via Model
  useEffect(() => {
    TransactionModel.saveAll(transactions);
  }, [transactions]);

  // Kalkulasi Total Pemasukan, Pengeluaran, & Saldo
  const totals = useMemo(() => {
    const income = transactions.filter((t) => t.type === "pemasukan").reduce((s, t) => s + t.amount, 0);
    const expense = transactions.filter((t) => t.type === "pengeluaran").reduce((s, t) => s + t.amount, 0);
    return { income, expense, balance: income - expense };
  }, [transactions]);

  // Kalkulasi data chart kategori pengeluaran
  const categoryData = useMemo(() => {
    const map = {};
    transactions
      .filter((t) => t.type === "pengeluaran")
      .forEach((t) => {
        map[t.category] = (map[t.category] || 0) + t.amount;
      });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  // Penyaringan Riwayat Transaksi berdasarkan filter aktif
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((t) => filter === "semua" || t.type === filter)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [transactions, filter]);

  // Aksi menambahkan transaksi baru
  const addTransaction = (inputData) => {
    const newTx = TransactionModel.create(inputData);
    setTransactions((prev) => [newTx, ...prev]);
  };

  // Aksi menghapus transaksi
  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return {
    filteredTransactions,
    filter,
    setFilter,
    totals,
    categoryData,
    addTransaction,
    deleteTransaction,
  };
}