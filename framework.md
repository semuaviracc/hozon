---
name: HOZON WEB
version: 1.0
status: canonical
kind: publication-surface        # bukan framework-teologi; hilir/turunan
depends_on: [ho-zon]
authority: none                  # tidak berhak mencipta atau mengoreksi teologi
source_lang: id                  # bahasa sumber penulisan
target_lang: [en]                # setiap konten id WAJIB punya pasangan en
register: metaphor-public        # register bahasa: turunan lapis Metaphor, dipoles untuk publik
concepts_locked: 10
concepts:
  - hozon        # ← ho-zon: Ho_Zon
  - logos        # ← ho-zon: Logos
  - phos         # ← ho-zon: Phos
  - zoe          # ← ho-zon: Zoe
  - agape        # ← ho-zon: Agape
  - pneuma       # ← ho-zon: Pneuma
  - aletheia     # ← ho-zon: Aletheia
  - doxa         # ← ho-zon: Doxa
  - christos     # ← ho-zon: Christos
  - hodos        # ← ho-zon: (BELUM ada node kanonik — lih. §H)
build: node compile.js   # kompilasi .md → content/compiled_content.js sebelum publikasi
---
# MANIFEST: HOZON WEB — Portal Publik Ho Zon

Ini adalah *root manifest* untuk **hozon_web**: situs yang memberitakan pemahaman Ho Zon
kepada publik. Ia diletakkan di dalam `frameworks/` karena isinya **dikendalikan oleh
Second Brain Logos** — tetapi hakikatnya berbeda dari framework teologi seperti `ho-zon`.

hozon_web **tidak menghasilkan teologi**. Ia hanya **memproyeksikan** teologi yang sudah
matang di `ho-zon` ke dalam bahasa publik dua-bahasa. Semua otoritas kebenaran tetap di
hulu (`ho-zon/knowledge/concepts/`); web adalah hilir.

---

## A. Hakikat & Posisi (Hilir, Bukan Hulu)
- hozon_web adalah **permukaan publikasi** — setara kelas `artifacts/` dalam alur Logos
  (`specs` TAHAP 3, Aksi 1: "produk untuk publik"), bukan `knowledge/`.
- **Tidak ada definisi baru lahir di sini.** Jika sebuah pemahaman belum matang sebagai
  node kanonik di `ho-zon`, ia **tidak boleh** terbit di web. Diskusikan & `//commit` ke
  `ho-zon` dulu; web menyusul.
- Arah aliran satu arah: `ho-zon/knowledge/concepts/[Node].md`
  → `ho-zon/knowledge/metaphor/[Node]-Metaphor.md` (register awam)
  → `hozon_web/content/id/**` (ringkasan publik) → `hozon_web/content/en/**` (terjemahan).

## B. Non-Kontradiksi dengan Ho Zon (Aturan Tertinggi)
1. **SSOT tunggal** (`kernel` Aksioma SSOT): setiap klaim di web harus dapat dilacak ke
   satu node kanonik `ho-zon`. Web **meringkas & menyederhanakan**, tidak pernah menambah,
   mengoreksi, atau membelokkan makna kanonik.
2. **Batasan Eksternal ho-zon berlaku penuh di sini** (`ho-zon/framework.md` §B): dilarang
   menyelaraskan Ho Zon secara diam-diam dengan Teologi Trinitarian, Teisme Klasik,
   Metafisika Yunani, Ontologi Skolastik, atau Teologi Sistematis Injili. Keduanya hanya
   boleh muncul sebagai **titik-banding**, bukan fondasi — termasuk di konten `dialogue/`
   yang justru mengontraskan posisi luar.
3. **Konvensi linguistik ho-zon berlaku** (`ho-zon/framework.md` §D): artikel *ho* (ὁ)
   diterjemahkan **"Sang"** (Sang Hidup, Sang Firman), bukan "Yang".
4. Bila konten web dan node kanonik berselisih, **node kanonik menang**; perbaiki web,
   jangan sesuaikan hulu ke web.

## C. Register Bahasa Publik (Turunan Lapis Metaphor)
Audiens web adalah pembaca umum yang tidak mengenal kosakata teknis framework. Karena itu:
- **Titik-tolak penulisan adalah lapis Metaphor** (`ho-zon/knowledge/metaphor/[Node]-Metaphor.md`),
  bukan lapis `concepts/` yang analitis. Metaphor sudah membuang aparat dokumentasi
  (SSOT, Aksioma-N, Resolusi, Referensi Silang) dan menyisakan esai mengalir — itulah
  bahan baku web, dipoles lebih ringkas lagi.
- **Dilarang** membawa jargon internal Logos ke konten publik: `//draft`·`//commit`,
  istilah `lapis-N`/`jenjang-N`, "off-ledger", "node kanonik", "SSOT", nama Aksioma,
  penomoran topologi. Semua itu bahasa dapur, bukan bahasa ruang tamu.
- **Nada**: mengundang, kontemplatif, jernih. Hindari bahasa dogmatis, klise denominasi,
  dan polemik doktrinal hampa (lih. `content/id/about.md` sebagai patokan nada).
- Istilah Yunani/Ibrani inti (*Logos, Agape, Zoe, ...*) **boleh dipertahankan** sebagai
  daya-pikat, selalu disertai glos singkat dan minimal satu kutipan Kitab Suci.

## D. Invarian Dwibahasa (id → en)
- **id adalah sumber, en adalah terjemahan.** Setiap file di `content/id/**` WAJIB punya
  pasangan berjudul-file sama di `content/en/**` dengan struktur frontmatter identik
  (hanya nilai teks yang diterjemahkan; kunci frontmatter tetap sama).
- Terjemahan menjaga makna kanonik (§B). Kutipan Kitab Suci memakai versi berbahasa
  Inggris yang lazim; istilah Yunani/Ibrani tetap.
- **Larangan rilis timpang**: sebuah konten belum "selesai" sampai kedua bahasa ada dan
  ter-kompilasi. Frontmatter boleh menandai `status: draft` bila en belum siap, agar shell
  tidak menautkannya sebagai konten publik.

## E. Kunci 10 Konsep
`content/{id,en}/concepts/` **dikunci pada tepat 10 file** — ringkasan publik dari 10 topik
inti Ho Zon (lihat `concepts:` di frontmatter). Aturan:
- **Tidak boleh** ada file ke-11 di `concepts/` tanpa keputusan eksplisit pengguna untuk
  mengubah kunci ini (dan pembaruan angka `concepts_locked`).
- Menambah/mengganti anggota daftar 10 = keputusan editorial tingkat-manifest, bukan edit
  konten biasa. Topik lain yang lebih panjang masuk ke `studies/` atau `dialogue/`, bukan
  memekarkan `concepts/`.

## F. Kategori Konten
| Folder | Isi | Status |
| :--- | :--- | :--- |
| `concepts/` | 10 ringkasan konsep inti | **terkunci** (§E) |
| `studies/`  | esai publik perluasan dari lapis Metaphor, judul menarik | editorial terbuka (aktif) |
| `dialogue/` | dialog kontras posisi | **nav disembunyikan** (2026-07-10) |
| `library/`  | lembar manuskrip kuno | **nav disembunyikan** (2026-07-10) |
| `about.md`  | halaman tentang portal | tunggal |

Hanya `concepts/` yang terkunci jumlahnya; kategori lain boleh tumbuh selama tunduk §B–D.

**Studies — aturan konten (audit 2026-07-10).** Tiap node `studies/` adalah **uraian publik
yang memperluas** satu/lebih file `ho-zon/knowledge/metaphor/`, **bukan salinan** — angkat
motif/kisah baru, beri judul yang menarik, tetap tunduk §B (non-kontradiksi) & §C (register
publik). Grid terisi otomatis per `.md`; menambah studi = tambah pasangan `id`+`en`, lalu
`node compile.js`.

**DIALOGUE & LIBRARY disembunyikan sementara.** Tombol nav (desktop + mobile) dikomentari di
`index.html`; file lama tetap ada tapi tak terjangkau. Alasan: sebagian isinya
menjadikan kerangka luar sebagai **fondasi**, bukan titik-banding — `dialogue/trinitas.md`
mengafirmasi dogma Trinitas/Perichoresis; `studies/patristik.md` (sudah dihapus) memakai
Kristologi konsili sebagai frame — keduanya melanggar §B-2. Aktifkan kembali hanya setelah
kontennya ditulis ulang jadi **kontras** (posisi luar disingkap lalu dilampaui oleh Ho Zon),
bukan endorsemen.

## G. Alur Kerja & Sinkronisasi
1. **Pemicu**: konten web ditulis/di-perbarui hanya sebagai hilir dari node ho-zon yang
   sudah matang (`//commit`). Web tidak punya trigger sendiri.
2. **Rantai-sinkron saat node kanonik berubah** — bila `ho-zon/knowledge/concepts/[Node].md`
   berubah material dan Node itu termasuk 10-konsep web, satu operasi perbaikan menyentuh
   **empat** berkas, dihitung sebagai satu kesatuan:
   `concepts/[Node].md` (hulu) → `metaphor/[Node]-Metaphor.md` → `web id` → `web en`.
   Ini paralel dengan disiplin wajib-sinkron Metaphor (`specs` §3) — titik-rawan yang sama:
   perbaikan berhenti di tengah rantai.
3. **Kompilasi**: setelah mengedit `.md`, jalankan `node compile.js` agar
   `content/compiled_content.js` diperbarui (portal berjalan `file://` tanpa CORS — lih.
   `README.md`). Konten yang belum dikompilasi = belum terbit.

## H. Peta Nama & Celah Terbuka
**Peta nama** (web huruf-kecil ↔ kanonik ho-zon):
`hozon↔Ho_Zon` · `logos↔Logos` · `phos↔Phos` · `zoe↔Zoe` · `agape↔Agape` ·
`pneuma↔Pneuma` · `aletheia↔Aletheia` · `doxa↔Doxa` · `christos↔Christos`.

**Celah yang harus ditutup (utang, per 2026-07-10):**
- **`hodos`** ada di web tetapi **belum ada** node kanonik `ho-zon/knowledge/concepts/Hodos.md`
  (hanya terdaftar di `ho-zon/framework.md`). Melanggar §B-1 (klaim tanpa hulu). Ditandai
  `status: draft`; matangkan `Hodos` sebagai node kanonik + Metaphor lebih dulu.
- **DIALOGUE & LIBRARY** (disembunyikan) menyimpan konten off-kerangka (§F) — tulis ulang jadi
  kontras sebelum diaktifkan lagi.
- **Paritas en (concepts, studies, about): LUNAS** per 2026-07-10 — 10 concepts + 4 studies +
  about semua punya `en`. Sisa fallback hanya di `dialogue/` & `library/` yang sedang di-hide.

## I. Checklist Sebelum "Selesai"
Sebuah tugas yang menyentuh konten web belum selesai sampai:
- [ ] Setiap klaim baru dapat dilacak ke node kanonik ho-zon (§B-1).
- [ ] Register publik terjaga — tak ada jargon internal bocor (§C).
- [ ] Setiap file `id` yang disentuh punya pasangan `en` yang setara (§D).
- [ ] `concepts/` tetap tepat 10 (§E).
- [ ] Bila node kanonik ikut berubah, keempat mata-rantai (§G-2) tersentuh — hitung ulang.
- [ ] `node compile.js` dijalankan (§G-3).
