# BinaryViz: Visualisasi Binary Search

BinaryViz adalah sebuah alat bantu visual interaktif yang dirancang untuk membantu pengguna memahami cara kerja algoritma _Binary Search_ (Pencarian Biner) langkah demi langkah. Aplikasi ini dibuat dengan Vanilla JavaScript dan Tailwind CSS, sehingga ringan dan mudah dijalankan.

## ✨ Fitur Utama

- **Visualisasi Interaktif**: Lihat secara visual bagaimana array dibagi dan elemen dibandingkan pada setiap langkah pencarian.
- **Kontrol Penuh**: Navigasi maju, mundur, putar otomatis (play/pause) untuk mengamati proses dengan kecepatan Anda sendiri.
- **Kecepatan Animasi**: Sesuaikan kecepatan animasi untuk pengamatan yang lebih detail atau lebih cepat.
- **Input Fleksibel**: Masukkan data array dan angka target Anda sendiri, atau gunakan tombol "Generate" untuk membuat data acak yang sudah terurut.
- **Penjelasan Detail**: Dapatkan penjelasan tekstual untuk setiap langkah yang diambil oleh algoritma, menjelaskan `low`, `high`, `mid`, dan keputusan yang dibuat.
- **Riwayat Langkah**: Lihat log riwayat dari semua langkah yang telah dieksekusi untuk rekapitulasi.
- **Validasi Input**: Aplikasi secara otomatis memeriksa apakah data sudah terurut dan memberikan notifikasi jika tidak.
- **Mode Gelap & Terang**: Tampilan nyaman dengan tema gelap/terang yang dapat diubah dan mengingat pilihan Anda.
- **Desain Responsif**: Tampilan yang optimal di berbagai ukuran layar, dari desktop hingga mobile.

## 🚀 Teknologi yang Digunakan

- **HTML5**: Struktur dasar halaman web.
- **Tailwind CSS**: Kerangka kerja CSS untuk styling yang cepat dan modern. Digunakan melalui CDN.
- **Vanilla JavaScript (ES6+)**: Logika inti aplikasi, manipulasi DOM, dan interaktivitas tanpa _framework_ eksternal.

## 🛠️ Cara Menjalankan

Proyek ini tidak memerlukan proses _build_ atau instalasi dependensi yang rumit.

1.  **Clone repository ini:**
    ```bash
    git clone https://github.com/username/BinaryViz.git
    ```
2.  **Buka file `index.html`:**
    Navigasikan ke direktori proyek dan buka file `index.html` langsung di peramban web favorit Anda (misalnya, Chrome, Firefox, Edge).

### Panduan Penggunaan

1.  **Input Data**: Masukkan serangkaian angka yang sudah terurut (dipisahkan koma) di kolom "Data Array". Anda juga bisa menekan tombol _refresh_ di sebelahnya untuk menghasilkan data acak.
2.  **Angka yang Dicari**: Masukkan angka yang ingin Anda cari di dalam array.
3.  **Mulai Visualisasi**: Klik tombol "Mulai Visualisasi" untuk memulai.
4.  **Kontrol Navigasi**: Gunakan tombol putar/jeda, langkah maju, dan langkah mundur di bawah area visualisasi untuk mengontrol alur animasi.
5.  **Mode Gelap/Terang**: Gunakan ikon matahari/bulan di pojok kanan atas untuk mengganti tema.

## 📄 Lisensi

Proyek ini dilisensikan di bawah Universitas Negeri Semarang. Lihat file `LICENSE` untuk detailnya.
