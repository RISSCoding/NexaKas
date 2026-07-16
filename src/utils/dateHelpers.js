const ID_LOCALE = "id-ID";

export function getDaysInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export function buildDateKey(date, day) {
  const y  = date.getFullYear();
  const m  = String(date.getMonth() + 1).padStart(2, "0");
  const d  = String(day).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function formatMonthYear(date) {
  return date.toLocaleDateString(ID_LOCALE, { month: "long", year: "numeric" });
}

export function formatMonthShort(date) {
  return date.toLocaleDateString(ID_LOCALE, { month: "short" });
}

export function buildDailySeries(transactions, selectedMonth) {
  const daysInMonth = getDaysInMonth(selectedMonth);

  const dailyMap = {};
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = buildDateKey(selectedMonth, day);
    dailyMap[dateStr] = { date: dateStr, pemasukan: 0, pengeluaran: 0, dayIndex: day };
  }

  transactions.forEach((t) => {
    if (dailyMap[t.date]) {
      dailyMap[t.date][t.type] += t.amount;
    }
  });

  return Object.values(dailyMap).sort((a, b) => a.dayIndex - b.dayIndex);
}

export function buildEvenTicks(totalDays, interval = 5) {
  const ticks = [];
  for (let day = 1; day <= totalDays; day += interval) ticks.push(day);
  if (ticks.at(-1) !== totalDays) ticks.push(totalDays);
  return ticks;
}
