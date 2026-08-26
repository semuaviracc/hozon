# Portal Ho Zon — Dokumentasi Konten Markdown & Kompilasi Offline

Portal ini menggunakan pemisahan antara kerangka tampilan utama (**Shell**) dan **Konten** berbasis Markdown (.md) agar penulisan teologi menjadi sangat mudah dikelola tanpa merusak struktur HTML.

Untuk mendukung jalannya aplikasi secara luring/offline langsung melalui protokol `file://` (tanpa terkena pemblokiran CORS oleh browser), seluruh file `.md` dikompilasi menjadi satu file JavaScript tunggal (`content/compiled_content.js`).

---

## 📂 Struktur Direktori Konten
Seluruh tulisan teologis Anda diletakkan secara terpisah di bawah folder `content/`:
* `content/concepts/*.md` — Tulisan detail penjelasan masing-masing konsep (Zoe, Agape, dll.)
* `content/studies/*.md` — Artikel studi dan analisis teologis mendalam.
* `content/dialogue/*.md` — Teks diskursus dialog interaktif.
* `content/library/*.md` — Lembaran manuskrip perpustakaan kuno.
* `content/database.js` — Menyimpan struktur metadata (hubungan relasi, judul, kategori, dan referensi ayat).

---

## ✍️ Cara Mengedit atau Menambah Konten
1. Buka folder `content/` dan cari kategori yang ingin Anda ubah.
2. Edit file `.md` yang bersangkutan menggunakan editor Markdown pilihan Anda (seperti VS Code atau Notepad).
3. Simpan perubahan.

---

## ⚙️ Cara Mengompilasi Perubahan
Setelah mengedit atau menambahkan file `.md`, Anda harus mengompilasi agar perubahan tersebut diterapkan ke portal:
1. Buka Terminal/PowerShell di direktori `hozon_web`.
2. Jalankan perintah berikut:
   ```bash
   node compile.js
   ```
3. Selesai! Halaman `index.html` dapat langsung dibuka dengan mengeklik ganda file tersebut pada browser Anda, dan seluruh pembaruan tulisan akan langsung ter-render dengan sempurna secara instan.
