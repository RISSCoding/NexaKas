# Pelacak Keuangan (Money Tracker)

## Cara menjalankan

1. Pastikan Node.js sudah terinstall (cek dengan `node -v`, minimal versi 18).
2. Extract folder ini, lalu buka terminal di dalam folder `money-tracker`.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Jalankan server development:
   ```bash
   npm run dev
   ```
5. Buka link yang muncul di terminal (biasanya `http://localhost:5173`).

## Build untuk production

```bash
npm run build
```

Hasilnya ada di folder `dist/`, bisa di-deploy ke Vercel, Netlify, atau hosting statis lainnya.

## Catatan

- Data transaksi masih tersimpan di memori (React state), jadi akan hilang saat halaman di-refresh. Kalau mau data permanen, perlu tambah localStorage atau backend/database.
- Styling pakai Tailwind CSS, ikon pakai `lucide-react`, grafik pakai `recharts`.
# NexaKas
# NexaKas
