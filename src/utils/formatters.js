const ID_LOCALE = "id-ID";

export function formatRupiah(amount) {
  return new Intl.NumberFormat(ID_LOCALE, {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * @param {number} n
 * @param {{ withPrefix?: boolean }} options
 */
export function formatCompact(n, { withPrefix = true } = {}) {
  const abs    = Math.abs(n);
  const sign   = n < 0 ? "-" : "";
  const prefix = withPrefix ? "Rp" : "";

  if (abs >= 1_000_000) return `${sign}${prefix}${(abs / 1_000_000).toFixed(1).replace(/\.0$/, "")}jt`;
  if (abs >= 1_000)     return `${sign}${prefix}${(abs / 1_000).toFixed(0)}rb`;
  return `${sign}${prefix}${abs}`;
}

export function formatDate(dateStr) {
  return new Intl.DateTimeFormat(ID_LOCALE, {
    day: "numeric",
    month: "short",
  }).format(new Date(dateStr));
}
