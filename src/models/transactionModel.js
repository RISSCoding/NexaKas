import { Utensils, Car, ShoppingBag, Film, Wallet, Gift } from "lucide-react";

export const TRANSACTION_TYPES = {
  PEMASUKAN: "pemasukan",
  PENGELUARAN: "pengeluaran",
  SEMUA: "semua",
};

export const FILTER_TYPES = [
  TRANSACTION_TYPES.SEMUA,
  TRANSACTION_TYPES.PEMASUKAN,
  TRANSACTION_TYPES.PENGELUARAN,
];

// Pemisahan Kategori Berdasarkan Tipe Transaksi
export const CATEGORIES_BY_TYPE = {
  [TRANSACTION_TYPES.PEMASUKAN]: ["Uang Saku", "Bonus", "Lainnya"],
  [TRANSACTION_TYPES.PENGELUARAN]: ["Makanan", "Transportasi", "Belanja", "Hiburan", "Lainnya"],
};

const DEFAULT_STYLE = { icon: Wallet, bg: "#6B7280" };

const CATEGORY_STYLE_MAP = {
  Makanan:      { icon: Utensils,    bg: "#EF4444" },
  Transportasi: { icon: Car,         bg: "#3B82F6" },
  Belanja:      { icon: ShoppingBag, bg: "#F59E0B" },
  Hiburan:      { icon: Film,        bg: "#8B5CF6" },
  "Uang Saku":  { icon: Wallet,      bg: "#16A34A" },
  Bonus:        { icon: Gift,        bg: "#EC4899" },
  Lainnya:      DEFAULT_STYLE,
};

export function getCategoryStyle(categoryName) {
  return CATEGORY_STYLE_MAP[categoryName] ?? DEFAULT_STYLE;
}

export const SEED_TRANSACTIONS = [
  { id: 1, type: "pemasukan",   amount: 1500000, category: "Uang Saku",    note: "Kiriman bulanan",       date: "2026-07-01" },
  { id: 2, type: "pengeluaran", amount: 25000,   category: "Makanan",      note: "Makan siang warteg",     date: "2026-07-08" },
  { id: 3, type: "pengeluaran", amount: 18000,   category: "Transportasi", note: "Ojek online ke kampus",  date: "2026-07-10" },
  { id: 4, type: "pengeluaran", amount: 150000,  category: "Belanja",      note: "Beli buku catatan",      date: "2026-07-11" },
  { id: 5, type: "pemasukan",   amount: 200000,  category: "Bonus",        note: "Menang lomba coding",    date: "2026-07-12" },
  { id: 6, type: "pengeluaran", amount: 45000,   category: "Hiburan",      note: "Nonton bioskop",         date: "2026-07-13" },
];
