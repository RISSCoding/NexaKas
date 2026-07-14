<div align="center">
  <img src="public/favicon.svg" alt="NexaKas Logo" width="80"/>
  <h1>📓 NexaKas - Pelacak Keuangan Digital</h1>
  
  <p><strong>Aplikasi buku kas digital minimalis, elegan, dan 100% Open Source.</strong></p>

  [![Open Source](https://img.shields.io/badge/Open_Source-100%25-brightgreen.svg?style=flat-square)](https://github.com/username/nexakas)
  [![React](https://img.shields.io/badge/React-18.x-61DAFB.svg?style=flat-square&logo=react)](#)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC.svg?style=flat-square&logo=tailwind-css)](#)
  [![Vite](https://img.shields.io/badge/Vite-5.x-646CFF.svg?style=flat-square&logo=vite)](#)

  <h3>🚀 Akses ke website: <a href="https://nexakas.vercel.app" target="_blank">nexakas.vercel.app</a></h3>
</div>

---

## 📌 Tentang NexaKas
**NexaKas** adalah aplikasi pelacak keuangan berbasis web yang dirancang khusus untuk mempermudah Anda mencatat arus kas (pemasukan dan pengeluaran) sehari-hari. Dibangun menggunakan arsitektur **MVC (Model-View-Controller)** yang bersih, aplikasi ini berjalan super cepat dan menyimpan data Anda dengan aman langsung di dalam perangkat Anda.

## ✨ Fitur Unggulan
* 💸 **Pencatatan Tanpa Batas:** Bebas mencatat nominal berapa pun (mendukung input nilai positif maupun negatif untuk penyesuaian saldo).
* 📊 **Grafik Interaktif:** Visualisasi persentase pengeluaran dan pemasukan secara dinamis menggunakan *Pie Chart*.
* 🔒 **Privasi Penuh (Guest Mode):** Tidak perlu login! Semua data disimpan dengan aman di *Local Storage* browser perangkat Anda.
* 💾 **Backup & Restore (JSON):** Jangan takut kehilangan data. Ekspor riwayat keuangan Anda menjadi file `.json` dan impor kembali kapan saja di perangkat mana saja.
* 🎨 **Desain Elegan & Halus:** Dibangun dengan antarmuka bernuansa *earthy tones* dan animasi transisi yang memanjakan mata.

---

## 📖 Cara Penggunaan Aplikasi
Menggunakan NexaKas sangatlah mudah:

1. **Tambah Transaksi:** Klik tombol **"+ Tambah"** di tabel Riwayat Transaksi. Pilih Pemasukan/Pengeluaran, masukkan nominal, tanggal, kategori, dan catatan opsional.
2. **Filter Data:** Gunakan tombol filter ("Semua", "Pemasukan", "Pengeluaran") untuk menganalisis arus kas Anda. Grafik akan otomatis menyesuaikan.
3. **Amankan Data Anda (Backup):** Klik ikon **Download** 📥 di bagian atas (sebelah saldo) untuk mengunduh file `.json` berisi seluruh data Anda.
4. **Pulihkan Data (Restore):** Klik ikon **Upload** 📤 untuk memasukkan kembali file `.json` cadangan Anda jika Anda berpindah perangkat atau browser.

---

## 💻 Cara Menjalankan di Komputer Anda (Bagi Developer)

Karena proyek ini **100% Open Source**, Anda sangat dipersilakan untuk mengkloning, mempelajari, atau memodifikasi kode sumbernya.

### Prasyarat
Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/) di komputer Anda.

### Langkah Instalasi
1. Clone repositori ini:
   ```bash
   git clone [https://github.com/risscoding/nexakas.git](https://github.com/risscoding/nexakas.git)
Masuk ke dalam folder proyek:

Bash
cd nexakas
Instal semua dependensi:

Bash
npm install
Jalankan server pengembangan lokal:

Bash
npm run dev
Buka http://localhost:5173 di browser Anda!

🛠️ Tech Stack
Framework: React JS + Vite

Styling: Tailwind CSS

Charts: Recharts

Animation: Framer Motion

Icons: Lucide React

🔓 Lisensi (100% Open Source)
Proyek ini sepenuhnya Open Source di bawah MIT License.
Anda bebas menggunakan, memodifikasi, mendistribusikan, bahkan menggunakannya untuk tujuan komersial tanpa batasan apa pun.

Built with ❤️ for a better financial tracking experience.