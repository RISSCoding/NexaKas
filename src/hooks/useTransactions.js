import { useState, useMemo, useEffect } from "react";
import { TRANSACTION_TYPES } from "../models/transactionModel";
import { buildDailySeries } from "../utils/dateHelpers";
import { exportTransactionsToExcel, importTransactionsFromExcel } from "../utils/excelHandler";

const STORAGE_KEY = "hexa_kas_tx";

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Gagal memuat data dari localStorage, menginisialisasi dengan data kosong:", error);
    return [];
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

  const importBackupData = async (file) => {
      try {
        const validatedData = await importTransactionsFromExcel(file);

        setTransactions(validatedData);
        alert(`Berhasil merestore ${validatedData.length} data transaksi dari Excel!`);
      } catch (error) {
        alert(`Gagal Import: ${error.message}`);
      }
    };

  const exportBackupData = () => {
      exportTransactionsToExcel(transactions);
    };

  return {
    transactions,
    currentMonthTransactions,
    filteredTransactions,
    financialsSummary,
    dailyActivityData,
    addTransaction,
    deleteTransaction,
    importBackupData,
    exportBackupData,
  };
}
