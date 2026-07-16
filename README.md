<div align="center">
  
  # 🪙 NexaKas
  **Smart Personal Financial Tracker**

  <!-- Lisensi, Status, dan Demo Badges -->
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
  [![Status](https://img.shields.io/badge/Status-Active-success.svg?style=for-the-badge)]()
  [![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000.svg?style=for-the-badge&logo=vercel)](https://nexakas.vercel.app)

  <h3>
    <a href="https://nexakas.vercel.app">🚀 Coba Live Demo NexaKas di Sini</a>
  </h3>

  <p align="center">
    Aplikasi web cerdas untuk melacak dan memvisualisasikan arus kas pribadi Anda dengan mudah, aman, dan elegan.
  </p>
</div>

---

## 🚀 Tentang Aplikasi

**NexaKas** adalah aplikasi pencatatan keuangan pribadi (*personal finance tracker*) modern yang dirancang untuk membantu Anda memegang kendali penuh atas stabilitas finansial. Mengusung konsep *Dark Theme* yang minimalis dan nyaman di mata, NexaKas berfokus pada visualisasi data interaktif. Anda tidak perlu lagi membaca tabel yang membosankan; cukup lihat grafik, dan ketahui ke mana setiap Rupiah Anda mengalir.

Dibangun dengan arsitektur **Clean Code**, **SOLID design**, dan **Custom Hooks**, aplikasi ini memastikan performa rendering yang sangat cepat, pengelolaan state yang optimal, dan kode yang kebal dari kesalahan (*defensive programming*).

---

## 🛠️ Tech Stack & Alat

Dibangun menggunakan teknologi antarmuka web paling modern saat ini:

<div align="center">

  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
  ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=white)
  ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

</div>

* **React 18**: Framework UI deklaratif dan berbasis komponen.
* **Vite**: *Build-tool* generasi baru untuk *Hot Module Replacement* (HMR) yang secepat kilat.
* **Tailwind CSS**: *Utility-first CSS* untuk desain *dark-mode* responsif yang presisi.
* **Recharts**: Komponen grafik SVG modular untuk visualisasi tren data keuangan.
* **Framer Motion**: Mesin animasi (*animation engine*) untuk transisi dan efek *pop-layout* yang halus bak aplikasi native.
* **Lucide React**: Paket ikon vektor minimalis dan konsisten.

---

## ✨ Fitur Unggulan

* 📊 **Dasbor Finansial Real-Time** — Pantau fluktuasi "Saldo Tersedia" secara instan. Data langsung terbarui setiap kali transaksi ditambahkan atau dihapus tanpa *loading*.
* 📈 **Grafik Tren Arus Kas** — Grafik area interaktif memetakan aktivitas harian Anda. Lacak lonjakan pengeluaran tertinggi dalam bulan berjalan hanya dengan sekali lirik.
* 🍰 **Porsi Kategori Otomatis (Donut Chart)** — Visualisasi cerdas yang membedah persentase pengeluaran Anda (misal: berapa persen untuk Makanan, Transportasi, atau Hiburan).
* ⚡ **Form Transaksi Adaptif (Context-Aware)** — Opsi kategori beradaptasi otomatis! Jika Anda memilih "Pemasukan", opsi yang muncul hanyalah *Gaji/Bonus* dan *Uang Saku*. Jika memilih "Pengeluaran", opsi berubah menjadi *Makanan/Belanja*.
* 📅 **Navigasi Kalender Bulanan** — Kelola data tanpa tercampur. Dasbor secara cerdas hanya merender transaksi sesuai filter bulan dan tahun yang sedang aktif.
* 💾 **Auto-Save (Local Storage)** — Tanpa database terpusat, privasi 100% aman. Data Anda disimpan secara real-time di penyimpanan lokal peramban (*browser*).
* 🛡️ **Validasi Defensif** — Mencegah kelalaian *user* dengan memblokir input nilai nominal 0, angka negatif, atau isian form yang kosong.

---

## 💻 Panduan Instalasi Lokal

Ikuti langkah-langkah di bawah ini untuk menjalankan **NexaKas** di komputer Anda jika Anda ingin memodifikasi atau berkontribusi.

### 📋 Prasyarat Sistem
Pastikan perangkat Anda sudah terinstal:
* [Node.js](https://nodejs.org/en/) (Disarankan versi LTS, minimal v18.x)
* `npm` atau `yarn` (Package Manager)
* [Git](https://git-scm.com/)

### 🛠️ Langkah-langkah Instalasi



1.  Klon Repositori Proyek
Buka Terminal / Git Bash / Command Prompt Anda, lalu jalankan:
```bash
git clone https://github.com/RISSCoding/nexakas.git

```
2. Masuk ke Folder Proyek

```bash
cd nexakas
```
3. Pasang Dependensi

Unduh seluruh library yang dibutuhkan (React, Vite, Tailwind, dll):
Bash
```bash
npm install
```
(Atau gunakan yarn install jika Anda menggunakan Yarn)

4. Jalankan Server Pengembangan (Dev Server)

Setelah proses unduh dependensi selesai (mencapai 100%), jalankan aplikasi:
Bash
```bash
npm run dev
```
5. Buka Aplikasi di Browser

Perhatikan output di terminal Anda. Cukup klik tautan lokal yang diberikan atau buka browser secara manual dan akses URL berikut:
```Plaintext

http://localhost:5173
```
