# Rencana Peningkatan Fitur Web Portofolio (Ryan's Portfolio)

Dokumen ini berisi daftar ide peningkatan (roadmap) untuk membuat portofolio Ryan menjadi lebih interaktif, aman, dan siap produksi di masa mendatang.

---

## 1. Integrasi Database untuk Contact Form
*   **Masalah Saat Ini:** API `/api/contact` menulis pesan kontak secara langsung ke file lokal (`contacts.json`) dengan fallback ke `/tmp`. Pada environment Vercel Production, filesystem bersifat *read-only* & *ephemeral*, sehingga data pesan akan hilang setiap kali kontainer Vercel melakukan daur ulang (recycle).
*   **Solusi Peningkatan:**
    *   Integrasikan database gratis seperti **Supabase (PostgreSQL)** atau **MongoDB Atlas**.
    *   Gunakan SDK klien `@supabase/supabase-js` untuk menyimpan pesan form secara real-time ke tabel database.
    *   *Alternative:* Hubungkan Contact Form ke email via **Resend** / **Nodemailer**, atau integrasikan dengan **Discord Webhook** sehingga setiap pesan baru terkirim langsung ke Discord Anda secara instan.

## 2. Optimasi Gambar menggunakan Next.js `<Image />`
*   **Masalah Saat Ini:** Komponen `logos3.tsx` menggunakan tag bawaan HTML `<img>` untuk memuat gambar logo SVG dari eksternal. Hal ini memicu peringatan ESLint dan membuang bandwidth karena tidak ada optimasi aset otomatis.
*   **Solusi Peningkatan:**
    *   Gunakan komponen `<Image />` dari `next/image` dengan properti `width`, `height`, dan `priority` (untuk LCP).
    *   Ini akan mempercepat pemuatan halaman dengan kompresi format modern (WebP) dan penanganan cache gambar di level CDN Vercel.

## 3. Peningkatan Animasi & Interaktivitas (Framer Motion)
*   **Solusi Peningkatan:**
    *   Tambahkan scroll-reveal effects di mana setiap section (About, Projects, Skills, Contact) memudar dan terangkat ke atas secara halus saat di-scroll menggunakan `framer-motion` dan `Intersection Observer`.
    *   Berikan animasi mikro pada tombol kontak, navbar links, dan tombol download CV untuk meningkatkan *delight factor*.
    *   Transisi halus antara dark/light mode dengan memberikan durasi transisi warna background & teks (`transition-colors duration-500`).

## 4. Validasi Form Kontak yang Lebih Kuat
*   **Solusi Peningkatan:**
    *   Gunakan kombinasi **React Hook Form** + **Zod** untuk menangani validasi input (seperti memastikan format email valid dan membatasi jumlah karakter minimal/maksimal untuk pesan).
    *   Tampilkan pesan error langsung di bawah field input yang tidak valid secara dinamis sebelum tombol Submit ditekan.

## 5. Optimalisasi Floating Particles
*   **Masalah Saat Ini:** Efek partikel latar belakang bisa sangat memakan daya CPU di perangkat mobile.
*   **Solusi Peningkatan:**
    *   Gunakan requestAnimationFrame yang efisien di canvas partikel.
    *   Matikan partikel secara otomatis ketika tab browser tidak aktif (di latar belakang) menggunakan Event Listener `visibilitychange` guna menghemat baterai perangkat user.
