import React, { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { formatCompact, formatRupiah } from "../utils/formatters";
import { getCategoryStyle, TRANSACTION_TYPES } from "../models/transactionModel";

const TOOLTIP_STYLE = {
  background: "#171E24",
  borderRadius: "8px",
  borderColor: "#232D36",
  color: "#fff",
  fontSize: "11px",
};

// --- Sub Komponen: Ikon & State Kosong ---

function EmptyIcon({ filterType }) {
  const cls = "w-6 h-6 text-gray-600";
  if (filterType === TRANSACTION_TYPES.PEMASUKAN) {
    return (
      <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    );
  }
  if (filterType === TRANSACTION_TYPES.PENGELUARAN) {
    return (
      <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
      </svg>
    );
  }
  return (
    <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
    </svg>
  );
}

function EmptyState({ filterType }) {
  const label = filterType === TRANSACTION_TYPES.SEMUA ? "Belum ada transaksi" : `Belum ada ${filterType}`;
  const caption = filterType === TRANSACTION_TYPES.SEMUA
    ? "Tambah transaksi untuk melihat ringkasan saldo"
    : `Tambah transaksi ${filterType} untuk melihat porsi kategori`;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5">
      <div className="w-14 h-14 rounded-full border-2 border-dashed border-gray-700 flex items-center justify-center">
        <EmptyIcon filterType={filterType} />
      </div>
      <div className="text-center px-4">
        <p className="text-xs text-gray-500 mb-0.5">{label}</p>
        <p className="text-[10px] text-gray-600 leading-relaxed">{caption}</p>
      </div>
    </div>
  );
}

// --- Logika Kalkulasi ---

function buildPieData(filterType, totals, transactions) {
  if (filterType === "semua") {
    if (totals.pengeluaran > totals.pemasukan) {
      return [
        { name: "Terpakai", value: totals.pengeluaran, color: "#EF4444" }, // 100% Merah
        { name: "Sisa Saldo",       value: 0,                  color: "#10B981" }, // 0% Hijau
      ];
    }

    const sisaSaldo = totals.pemasukan - totals.pengeluaran;
    return [
      { name: "Terpakai",   value: totals.pengeluaran, color: "#EF4444" },
      { name: "Sisa Saldo", value: sisaSaldo,          color: "#10B981" },
    ];
  }

  const categoryMap = {};
  transactions.forEach((t) => {
    if (t.type === filterType) {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    }
  });

  return Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value,
    color: getCategoryStyle(name).bg,
  }));
}

// --- Sub Komponen: Smart Legend (Teks Persentase) ---

function PieLegend({ dataPie, currentTotal, filterType, totals }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 px-2 max-h-[55px] overflow-y-auto">
      {dataPie.map((item, index) => {
        let pctText = "";

        if (filterType === "semua") {
          // KASUS EKSTREM: Pemasukan masih 0, tapi sudah ada pengeluaran
          if (totals.pemasukan === 0 && totals.pengeluaran > 0) {
            pctText = item.name.includes("Terpakai") ? ">100% (Defisit)" : "0%";
          }
          // KASUS OVERSPENDING: Pemasukan ada, tapi pengeluaran LEBIH BESAR
          else if (totals.pengeluaran > totals.pemasukan) {
            if (item.name.includes("Terpakai")) {
              const rasioOverspent = Math.round((totals.pengeluaran / totals.pemasukan) * 100);
              pctText = `${rasioOverspent}% (Overspent)`;
            } else {
              pctText = "0%";
            }
          }
          // KONDISI NORMAL
          else if (totals.pemasukan > 0) {
            const rasio = Math.round((item.value / totals.pemasukan) * 100);
            pctText = `${rasio}%`;
          } else {
            pctText = "0%";
          }
        } else {
          // Logika normal untuk filter porsi per kategori (Pemasukan/Pengeluaran saja)
          const pct = currentTotal > 0 ? Math.round((item.value / currentTotal) * 100) : 0;
          pctText = `${pct}%`;
        }

        return (
          <div key={index} className="flex items-center gap-1.5 text-[11px] text-gray-300">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
            <span className="truncate max-w-[80px]">{item.name}</span>
            <strong className="text-white text-[10px] font-semibold">{pctText}</strong>
          </div>
        );
      })}
    </div>
  );
}

// --- Komponen Utama ---

export default function BalanceCard({ transactions, totals, filterType }) {
  const netBalance = totals.pemasukan - totals.pengeluaran;
  const dataPie = useMemo(() => buildPieData(filterType, totals, transactions), [filterType, totals, transactions]);
  const currentTotal = useMemo(() => dataPie.reduce((sum, item) => sum + item.value, 0), [dataPie]);
  const isEmpty = currentTotal === 0 && totals.pengeluaran === 0; // Pastikan kosong benar-benar 0
  const cardTitle = filterType === TRANSACTION_TYPES.SEMUA ? "Saldo Tersedia" : `Porsi ${filterType}`;

  return (
    <div className="bg-[#171E24] p-5 rounded-2xl border border-[#232D36] flex flex-col justify-between h-[300px]">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm text-gray-200 capitalize">{cardTitle}</h3>
        <span className="text-gray-500 cursor-pointer hover:text-gray-300 select-none">•••</span>
      </div>

      <div className="h-40 relative my-1">
        {isEmpty ? (
          <EmptyState filterType={filterType} />
        ) : (
          <>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={dataPie} innerRadius={50} outerRadius={68} paddingAngle={dataPie.length > 1 ? 4 : 0} dataKey="value">
                  {dataPie.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [formatRupiah(value), "Total"]} contentStyle={TOOLTIP_STYLE} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="font-bold text-base text-white tracking-tight">
                {formatCompact(filterType === TRANSACTION_TYPES.SEMUA ? netBalance : currentTotal)}
              </span>
              <span className="text-[10px] text-gray-400 mt-0.5">
                {filterType === TRANSACTION_TYPES.SEMUA ? "Saldo Bersih" : `Total ${filterType}`}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Gunakan komponen PieLegend di sini menggantikan map manual sebelumnya */}
      {!isEmpty ? (
        <PieLegend
          dataPie={dataPie}
          currentTotal={currentTotal}
          filterType={filterType}
          totals={totals}
        />
      ) : (
        <div aria-hidden="true" />
      )}
    </div>
  );
}
