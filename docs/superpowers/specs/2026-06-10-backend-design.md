# Rencana Desain Backend Lokal - webPortoRyan

Diperbarui pada: 2026-06-10

## 1. Arsitektur
Aplikasi ini menggunakan **Next.js 14 App Router** terintegrasi dengan database lokal berbasis **file JSON** yang disimpan di dalam direktori `/data`.

- **Frontend**: Halaman utama (`app/page.tsx`) mengambil data langsung dari file JSON lokal (`data/profile.json` dan `data/projects.json`) secara sinkron di sisi server menggunakan React Server Components. Ini memaksimalkan performa dan meniadakan latency request HTTP eksternal.
- **Form Kontak**: Diisi oleh user, dikirim ke API internal `/api/contact` (Route Handler) melalui metode POST, lalu data tersebut ditambahkan (append) ke dalam file `data/contacts.json`.
- **API Projects**: Menyediakan endpoint `/api/projects` untuk query data list proyek portofolio dalam bentuk REST API.

## 2. Struktur Database JSON

### File `data/projects.json`
Menyimpan data list proyek portofolio.
```json
[
  {
    "title": "Nama Project",
    "description": "Deskripsi singkat project...",
    "tech": ["Next.js", "TypeScript", "Tailwind CSS"],
    "github_url": "https://github.com/...",
    "demo_url": "https://..."
  }
]
```

### File `data/profile.json`
Menyimpan data profil, deskripsi "About", list skill, dan link CV.
```json
{
  "name": "Ryan",
  "role": "Frontend Developer",
  "location": "Indonesia",
  "email": "ryan@example.com",
  "github_url": "https://github.com/scofieldolf",
  "linkedin_url": "https://linkedin.com/in/ryan",
  "cv_url": "/cv-ryan.pdf",
  "about_summary": "...",
  "about_details": "...",
  "skills": ["HTML5", "CSS3", "JavaScript", "TypeScript", "React.js", "Next.js", "Tailwind CSS"]
}
```

### File `data/contacts.json`
Menyimpan data submission form kontak secara kronologis (appended).
```json
[
  {
    "name": "Nama Pengirim",
    "email": "email@pengirim.com",
    "message": "Isi pesan...",
    "created_at": "2026-06-10T04:50:00.794Z"
  }
]
```

## 3. Cara Penggunaan Secara Lokal
1. Modifikasi/tambahkan proyek di `data/projects.json`.
2. Modifikasi detail profil Anda di `data/profile.json`.
3. Jalankan `npm run dev` untuk memulai development server pada port default (http://localhost:3000).
4. Submisi form kontak akan terekam langsung di `data/contacts.json`.
