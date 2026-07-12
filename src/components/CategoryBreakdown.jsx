import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { CATEGORY_COLORS } from "../models/transactionModel";
import { formatRupiah } from "../utils/formatters";

export default function CategoryBreakdown({ data, filter }) {
  // Hitung total nilai semua item dalam chart untuk persentase
  const totalChartValue = data.reduce((sum, item) => sum + item.value, 0);

  // Ubah judul secara dinamis sesuai filter
  const getTitle = () => {
    if (filter === "semua") return "Rasio Pemasukan vs Pengeluaran";
    if (filter === "pemasukan") return "Statistik Pemasukan";
    return "Statistik Pengeluaran";
  };

  return (
    <div className="lg:col-span-2 bg-white rounded-xl border border-[#E5DFCF] p-5 h-fit">
      <h2 className="font-serif text-xl mb-4">{getTitle()}</h2>
      
      {data.length === 0 ? (
        <p className="text-sm text-[#8A8578] font-mono text-center py-10">Belum ada data untuk grafik ini.</p>
      ) : (
        <>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={80} paddingAngle={2}>
                  {data.map((entry, i) => (
                    <Cell key={i} fill={CATEGORY_COLORS[entry.name] || "#8A8578"} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => formatRupiah(v)} contentStyle={{ fontFamily: "monospace", fontSize: 12, borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-3 mt-4">
            {data
              .sort((a, b) => b.value - a.value)
              .map((c) => {
                // Kalkulasi persentase per baris
                const percentage = ((c.value / totalChartValue) * 100).toFixed(1);
                
                return (
                  <div
                    key={c.name}
                    className="flex items-center justify-between text-sm transition-transform duration-150 hover:translate-x-1 border-b border-[#E5DFCF]/50 pb-2 last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[c.name] || "#8A8578" }} />
                      <span className="font-medium text-[#26241D]">{c.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-[#26241D]">{formatRupiah(c.value)}</p>
                      <p className="text-xs text-[#8A8578] font-mono font-semibold">{percentage}%</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
}