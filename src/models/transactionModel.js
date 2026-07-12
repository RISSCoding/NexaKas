export const CATEGORIES = {
  pemasukan: ["Uang Saku", "Gaji", "Bonus", "Lainnya"],
  pengeluaran: ["Makanan", "Transportasi", "Belanja", "Hiburan", "Tagihan", "Pendidikan", "Lainnya"],
};

export const CATEGORY_COLORS = {
  Makanan: "#B5652B",
  Transportasi: "#3E6259",
  Belanja: "#8E6C1F",
  Hiburan: "#7A4B6B",
  Tagihan: "#6B4A3A",
  Pendidikan: "#4A5C6B",
  Lainnya: "#6B665A",
};

const STORAGE_KEY = "digital_cash_transactions";

export const TransactionModel = {
  // Ambil data dari device, jika kosong return array kosong []
  getAll: () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  // Simpan data ke device
  saveAll: (transactions) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  },

  // Skema pembuatan objek transaksi baru
  create: ({ type, amount, category, note, date }) => ({
    id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
    type,
    amount: parseFloat(amount) || 0,
    category,
    note: note.trim() || "-",
    date,
  }),
};