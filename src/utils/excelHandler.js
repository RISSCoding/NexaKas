import * as XLSX from "xlsx";
import { TRANSACTION_TYPES } from "../models/transactionModel";

export function exportTransactionsToExcel(transactions) {
  if (!transactions || transactions.length === 0) {
    alert("Tidak ada data transaksi yang bisa diekspor.");
    return;
  }

  const dataForExcel = transactions.map((tx) => ({
    "ID Transaksi": tx.id,
    Tanggal: tx.date,
    Tipe: tx.type === TRANSACTION_TYPES.PEMASUKAN ? "Pemasukan" : "Pengeluaran",
    Kategori: tx.category,
    "Nominal (Rp)": tx.amount,
    Catatan: tx.note,
  }));

  const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data Kas NexaKas");

  const dateSuffix = new Date().toISOString().split("T")[0];
  XLSX.writeFile(workbook, `NexaKas_Backup_${dateSuffix}.xlsx`);
}

export function importTransactionsFromExcel(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        const rawRows = XLSX.utils.sheet_to_json(worksheet);

        if (rawRows.length === 0) {
          throw new Error("File Excel kosong atau tidak memiliki baris data.");
        }

        const parsedTransactions = rawRows.map((row, index) => {
          const hasRequiredFields = row["Tanggal"] && row["Tipe"] && row["Nominal (Rp)"] && row["Kategori"];
          if (!hasRequiredFields) {
            throw new Error(`Baris ke-${index + 2} tidak lengkap. Pastikan kolom Tanggal, Tipe, Kategori, dan Nominal terisi.`);
          }

          const rawType = String(row["Tipe"]).toLowerCase();
          const normalizedType = rawType === "pemasukan" ? TRANSACTION_TYPES.PEMASUKAN : TRANSACTION_TYPES.PENGELUARAN;

          return {
            id: Number(row["ID Transaksi"]) || Date.now() + index, // Gunakan ID lama atau buat baru jika tidak ada
            date: String(row["Tanggal"]),
            type: normalizedType,
            category: String(row["Kategori"]),
            amount: Math.abs(Number(row["Nominal (Rp)"])) || 0,
            note: row["Catatan"] ? String(row["Catatan"]).trim() : "",
          };
        });

        resolve(parsedTransactions);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error("Gagal membaca berkas fisik file Excel."));
    reader.readAsArrayBuffer(file);
  });
}
