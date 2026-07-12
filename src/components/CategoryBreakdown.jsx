import React from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { CATEGORY_COLORS } from "../models/transactionModel";
import { formatRupiah } from "../utils/formatters";

export default function CategoryBreakdown({ data }) {
  return (
    <div className="lg:col-span-2 bg-white rounded-xl border border-[#E5DFCF] p-5 h-fit">
      <h2 className="font-serif text-xl mb-4">Pengeluaran per Kategori</h2>
      {data.length === 0 ? (
        <p className="text-sm text-[#8A8578] font-mono text-center py-10">Belum ada data pengeluaran.</p>
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
          <div className="space-y-2 mt-2">
            {data
              .sort((a, b) => b.value - a.value)
              .map((c) => (
                <div
                  key={c.name}
                  className="flex items-center justify-between text-sm transition-transform duration-150 hover:translate-x-1"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[c.name] || "#8A8578" }} />
                    <span>{c.name}</span>
                  </div>
                  <span className="font-mono text-[#26241D]">{formatRupiah(c.value)}</span>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}