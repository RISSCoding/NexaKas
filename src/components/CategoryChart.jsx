import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { formatCompact, formatDate, formatRupiah } from "../utils/formatters";
import { formatMonthYear, formatMonthShort, buildEvenTicks } from "../utils/dateHelpers";

export default function CategoryChart({ data, totals, selectedMonth }) {
  const saldoBersih = totals.pemasukan - totals.pengeluaran;

  const totalDaysInMonth = data.length;
  const xTicks = React.useMemo(() => buildEvenTicks(totalDaysInMonth), [totalDaysInMonth]);

  const namaBulanTahun = selectedMonth ? formatMonthYear(selectedMonth) : "Juli 2026";
  const shortMonthText = selectedMonth ? formatMonthShort(selectedMonth) : "Jul";

  return (
    <div className="bg-[#171E24] p-5 rounded-2xl border border-[#232D36] flex flex-col justify-between h-[300px]">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm text-gray-400">Aktivitas Saldo</h3>
          <span className="text-[10px] bg-[#11161A] text-gray-400 px-2.5 py-1 rounded-md border border-[#232D36] capitalize">
            {namaBulanTahun}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-white mt-1.5 tracking-tight">
          {formatRupiah(saldoBersih)}
        </h2>
      </div>

      <div className="h-36 w-full text-[10px] mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="darkTrend" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#232D36" vertical={false} />

            <YAxis
              tickFormatter={(n) => formatCompact(n, { withPrefix: false })}
              axisLine={false}
              tickLine={false}
              stroke="#4B5563"
              width={42}
            />

            <XAxis
              dataKey="dayIndex"
              type="number"
              domain={[1, totalDaysInMonth]}
              ticks={xTicks}
              padding={{ left: 14, right: 14 }}
              axisLine={false}
              tickLine={false}
              stroke="#4B5563"
              tickFormatter={(day) => `${day} ${shortMonthText}`}
            />

            <Tooltip
              labelFormatter={(l, items) => {
                if (items[0]?.payload?.date) return formatDate(items[0].payload.date);
                return `${l} ${shortMonthText}`;
              }}
              formatter={(value) => [formatRupiah(value), "Arus Bersih"]}
              contentStyle={{ background: "#171E24", borderRadius: "12px", borderColor: "#232D36", color: "#fff" }}
            />
            <Area
              type="monotone"
              dataKey={(row) => row.pemasukan - row.pengeluaran}
              stroke="#10B981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#darkTrend)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
