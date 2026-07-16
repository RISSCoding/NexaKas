import { useState, useMemo, useEffect } from "react";
import { SEED_TRANSACTIONS, TRANSACTION_TYPES } from "../models/transactionModel";
import { buildDailySeries } from "../utils/dateHelpers";

const STORAGE_KEY = "hexa_kas_tx";

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : SEED_TRANSACTIONS;
  } catch (error) {
    console.error("Gagal memuat data dari localStorage, menggunakan seed data:", error);
    return SEED_TRANSACTIONS;
  }
}

export function useTransactions(selectedMonth, filterType) {
  const [transactions, setTransactions] = useState(loadFromStorage);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    } catch (error) {
      console.error("Gagal menyimpan data ke localStorage:", error);
    }
  }, [transactions]);

  const currentMonthTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const txDate = new Date(tx.date);
      return (
        txDate.getFullYear() === selectedMonth.getFullYear() &&
        txDate.getMonth() === selectedMonth.getMonth()
      );
    });
  }, [transactions, selectedMonth]);

  const financialsSummary = useMemo(() => {
    return currentMonthTransactions.reduce(
      (acc, tx) => {
        if (tx.type === TRANSACTION_TYPES.PEMASUKAN) {
          acc.pemasukan += tx.amount;
        } else if (tx.type === TRANSACTION_TYPES.PENGELUARAN) {
          acc.pengeluaran += tx.amount;
        }
        return acc;
      },
      { pemasukan: 0, pengeluaran: 0 }
    );
  }, [currentMonthTransactions]);

  const filteredTransactions = useMemo(() => {
    if (filterType === TRANSACTION_TYPES.SEMUA) return currentMonthTransactions;
    return currentMonthTransactions.filter((tx) => tx.type === filterType);
  }, [currentMonthTransactions, filterType]);

  const dailyActivityData = useMemo(
    () => buildDailySeries(currentMonthTransactions, selectedMonth),
    [currentMonthTransactions, selectedMonth]
  );

  const addTransaction = (newTx) => {
    setTransactions((prev) => [newTx, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  return {
    transactions,
    currentMonthTransactions,
    filteredTransactions,
    financialsSummary,
    dailyActivityData,
    addTransaction,
    deleteTransaction,
  };
}
