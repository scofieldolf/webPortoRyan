# CLAUDE.md

Panduan untuk Claude Code CLI saat bekerja di repository ini.

## Tentang Project

Web portofolio pribadi milik **Ryan**. Tujuan: menampilkan profil, skill, dan
proyek secara profesional untuk dilihat oleh recruiter.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Bahasa:** TypeScript
- **Styling:** Tailwind CSS
- **Animasi:** Framer Motion (opsional, tambahkan saat dibutuhkan)
- **Deploy:** Vercel

## Perintah Penting

```bash
npm install        # install dependencies
npm run dev        # jalankan dev server (http://localhost:3000)
npm run build      # build production
npm run lint       # cek linting
```

## Struktur Folder

- `app/` — halaman & layout (App Router Next.js)
  - `layout.tsx` — root layout, metadata, font
  - `page.tsx` — halaman utama (hero, about, projects, contact)
  - `globals.css` — style global + directive Tailwind
- Komponen baru sebaiknya diletakkan di `app/components/`.

## Konvensi Kode

- Gunakan **TypeScript** untuk semua file (.tsx / .ts), hindari `any`.
- Gunakan **functional component** + hooks.
- Styling pakai **utility class Tailwind**, hindari CSS inline kecuali perlu.
- Nama komponen: `PascalCase`. Nama file komponen: `PascalCase.tsx`.
- Pastikan setiap section responsif (mobile-first).

## Tema Desain

- Style: **Minimalis + dark/light mode toggle**.
- Font: sans-serif modern (Inter).
- 1 warna aksen utama (didefinisikan di `tailwind.config.ts`).
- Prioritaskan ruang kosong (white space) dan keterbacaan.

## Catatan untuk Recruiter (jangan dihapus)

Section yang wajib ada & rapi: Hero (nama + role), About, Projects
(dengan link demo + GitHub), Skills, Contact (email + LinkedIn + GitHub),
dan tombol download CV.
