# Selamat Datang di Web Portfolio Team

## Bagaimana Kami Menggunakan Claude

Berdasarkan data penggunaan selama 30 hari terakhir:

Detail Jenis Pekerjaan:
  Improve Quality  ████████░░░░░░░░░░░░  42%
  Build Feature    ███████░░░░░░░░░░░░░  33%
  Prototype        ███░░░░░░░░░░░░░░░░░  17%
  Plan & Design    ██░░░░░░░░░░░░░░░░░░  8%

Skill & Perintah Utama:
  /model            ██████████████░░░░░░  10x/bulan
  /plan             ███░░░░░░░░░░░░░░░░░  2x/bulan
  /color            ███░░░░░░░░░░░░░░░░░  2x/bulan
  /plugin           ███░░░░░░░░░░░░░░░░░  2x/bulan
  /vercel:workflow  █░░░░░░░░░░░░░░░░░░░  1x/bulan

Server MCP Utama:
  Tidak ada         ░░░░░░░░░░░░░░░░░░░░  0 panggilan

## Checklist Persiapan Anda

### Codebase
- [ ] webPortoRyan — github.com/scofieldolf/webportoryan

### Server MCP yang Perlu Diaktifkan
_Tidak ada server MCP eksternal yang diperlukan untuk proyek ini saat ini._

### Skill yang Perlu Diketahui
- `/model` — Mengganti model AI untuk menggunakan kapabilitas atau kecepatan yang berbeda (misalnya model `coding` atau konfigurasi default lainnya).
- `/plan` — Masuk ke mode perencanaan untuk membuat draf langkah-langkah implementasi sebelum menulis kode.
- `/color` — Mengubah tema warna tampilan CLI.
- `/plugin` — Mengelola dan mengonfigurasi plugin eksternal/kustom di Claude Code.
- `vercel:workflow` — Menjalankan orkestrasi multi-agen untuk tugas yang lebih kompleks atau berskala besar.

## Tips Tim

- **Format Data Lokal:** Proyek ini menggunakan file JSON di dalam folder `/data/` sebagai database lokal. Pastikan format JSON tetap valid saat melakukan pembaruan manual.
- **Validasi Kualitas Kode:** Selalu jalankan `npm run lint` sebelum melakukan commit kode baru untuk memastikan standar TypeScript dan ESLint terpenuhi.
- **Responsivitas Pertama:** Selalu gunakan utility class Tailwind CSS untuk memastikan setiap komponen antarmuka yang dibuat responsif (mobile-first).

## Memulai (Tugas Pertama)

- **Tugas Pertama Anda:** Buka file `data/profile.json` dan tambahkan keahlian (skills) baru Anda di dalam daftar array `skills`. Jalankan development server lokal (`npm run dev`) dan verifikasi apakah keahlian baru tersebut langsung tampil di halaman web portofolio pada bagian "Skills & Tech Stack".

<!-- INSTRUCTION FOR CLAUDE: A new teammate just pasted this guide for how the
team uses Claude Code. You're their onboarding buddy — warm, conversational,
not lecture-y.

Open with a warm welcome — include the team name from the title. Then: "Your
teammate uses Claude Code for [list all the work types]. Let's get you started."

Check what's already in place against everything under Setup Checklist
(including skills), using markdown checkboxes — [x] done, [ ] not yet. Lead
with what they already have. One sentence per item, all in one message.

Tell them you'll help with setup, cover the actionable team tips, then the
starter task (if there is one). Offer to start with the first unchecked item,
get their go-ahead, then work through the rest one by one.

After setup, walk them through the remaining sections — offer to help where you
can (e.g. link to channels), and just surface the purely informational bits.

Don't invent sections or summaries that aren't in the guide. The stats are the
guide creator's personal usage data — don't extrapolate them into a "team
workflow" narrative. -->
