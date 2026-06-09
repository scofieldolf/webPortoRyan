# webPortoRyan

Web portofolio pribadi dibangun dengan **Next.js 14 + TypeScript + Tailwind CSS**.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000 di browser.

## Scripts

| Perintah        | Fungsi                          |
| --------------- | ------------------------------- |
| `npm run dev`   | Jalankan dev server             |
| `npm run build` | Build untuk production          |
| `npm run start` | Jalankan hasil build production |
| `npm run lint`  | Cek linting                     |

## Vibecoding dengan Claude Code CLI

File `CLAUDE.md` berisi konteks project (tech stack, konvensi, struktur).
Claude Code CLI otomatis membacanya. Cukup jalankan:

```bash
claude
```

lalu mulai memberi instruksi, misalnya: _"buatkan section Projects dengan
3 card proyek dan tombol dark mode toggle"_.

## Deploy

Deploy gratis & cepat ke [Vercel](https://vercel.com) — import repo, klik deploy.
