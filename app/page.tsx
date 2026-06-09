export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      {/* Hero */}
      <section id="hero" className="py-20">
        <h1 className="text-4xl font-bold sm:text-5xl">
          Halo, saya <span className="text-accent">Ryan</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          {/* TODO: ganti dengan role Anda, mis. "Frontend Developer" */}
          Your Role Here
        </p>
      </section>

      {/* About */}
      <section id="about" className="py-12">
        <h2 className="text-2xl font-semibold">About</h2>
        {/* TODO: isi deskripsi singkat tentang diri Anda */}
      </section>

      {/* Projects */}
      <section id="projects" className="py-12">
        <h2 className="text-2xl font-semibold">Projects</h2>
        {/* TODO: tampilkan 3-5 proyek (judul, deskripsi, link demo & GitHub) */}
      </section>

      {/* Skills */}
      <section id="skills" className="py-12">
        <h2 className="text-2xl font-semibold">Skills</h2>
        {/* TODO: daftar tech stack yang dikuasai */}
      </section>

      {/* Contact */}
      <section id="contact" className="py-12">
        <h2 className="text-2xl font-semibold">Contact</h2>
        {/* TODO: email, LinkedIn, GitHub, tombol download CV */}
      </section>
    </main>
  );
}
