import fs from "fs";
import path from "path";
import ContactForm from "./components/ContactForm";
import ThemeToggle from "./components/ThemeToggle";
import ProjectCard from "./components/ProjectCard";

// Tipe data untuk Project
interface Project {
  title: string;
  description: string;
  tech: string[];
  github_url: string;
  demo_url: string;
}

// Tipe data untuk Profile
interface Profile {
  name: string;
  role: string;
  location: string;
  email: string;
  github_url: string;
  linkedin_url: string;
  cv_url: string;
  about_summary: string;
  about_details: string;
  skills: string[];
}

export const revalidate = 0; // Memaksa halaman untuk selalu fetch data terbaru

export default async function Home() {
  let profile: Profile;
  let projects: Project[] = [];

  try {
    // Read profile.json
    const profilePath = path.join(process.cwd(), "data", "profile.json");
    const profileRaw = fs.readFileSync(profilePath, "utf-8");
    profile = JSON.parse(profileRaw);

    // Read projects.json
    const projectsPath = path.join(process.cwd(), "data", "projects.json");
    const projectsRaw = fs.readFileSync(projectsPath, "utf-8");
    projects = JSON.parse(projectsRaw);
  } catch (err) {
    console.error("Gagal membaca file data JSON:", err);
    // Fallback data jika terjadi error pembacaan file
    profile = {
      name: "Ryan",
      role: "Frontend Developer",
      location: "Indonesia",
      email: "ryan@example.com",
      github_url: "https://github.com/scofieldolf",
      linkedin_url: "https://linkedin.com/in/ryan",
      cv_url: "/cv-ryan.pdf",
      about_summary: "Saya adalah mahasiswa/profesional IT yang bersemangat mengembangkan website modern.",
      about_details: "Fokus utama saya saat ini adalah mendalami ekosistem React dan Next.js.",
      skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React.js", "Next.js", "Tailwind CSS"],
    };
    projects = [];
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-950 dark:text-gray-100 selection:bg-accent selection:text-white transition-colors duration-200">
      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-950/70 border-b border-gray-200 dark:border-gray-900/50">
        <nav className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <a href="#" className="text-xl font-bold tracking-tight text-accent hover:opacity-95 transition-opacity">
            {profile.name}<span className="text-gray-900 dark:text-white">.dev</span>
          </a>
          <div className="flex items-center gap-6">
            <div className="flex gap-6 text-sm font-medium text-gray-650 text-gray-600 dark:text-gray-400">
              <a href="#about" className="hover:text-accent dark:hover:text-accent transition-colors">About</a>
              <a href="#projects" className="hover:text-accent dark:hover:text-accent transition-colors">Projects</a>
              <a href="#skills" className="hover:text-accent dark:hover:text-accent transition-colors">Skills</a>
              <a href="#contact" className="hover:text-accent dark:hover:text-accent transition-colors">Contact</a>
            </div>
            <div className="border-l border-gray-200 dark:border-gray-800 pl-4">
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12 space-y-24">
        {/* Hero Section */}
        <section id="hero" className="py-16 md:py-24 flex flex-col items-center text-center md:items-start md:text-left justify-between md:flex-row gap-8">
          <div className="space-y-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent dark:bg-accent/20">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              Tersedia untuk Pekerjaan / Project
            </div>
            <h1 className="text-4xl font-extrabold sm:text-6xl tracking-tight leading-none text-gray-900 dark:text-white">
              Halo, Saya <span className="text-accent">{profile.name}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Seorang <span className="font-semibold text-gray-900 dark:text-white">{profile.role}</span> yang berfokus membangun antarmuka web yang interaktif, responsif, dan ramah pengguna.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a
                href="#contact"
                className="px-6 py-3 rounded-xl font-semibold bg-accent text-white hover:bg-accent-hover transition-colors shadow-lg shadow-accent/25 hover:shadow-accent/35"
              >
                Hubungi Saya
              </a>
              <a
                href="#projects"
                className="px-6 py-3 rounded-xl font-semibold border border-gray-300 dark:border-gray-850 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
              >
                Lihat Project
              </a>
              <a
                href={profile.cv_url}
                download
                className="px-6 py-3 rounded-xl font-semibold border border-accent/20 text-accent hover:bg-accent/5 transition-colors"
              >
                Download CV
              </a>
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-to-tr from-accent to-indigo-400 flex items-center justify-center text-white text-5xl md:text-7xl font-bold shadow-2xl border-4 border-white dark:border-gray-900">
              {profile.name.charAt(0)}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="scroll-mt-24 space-y-6">
          <div className="inline-block border-b-2 border-accent pb-1">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Tentang Saya</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            <div className="md:col-span-2 space-y-4 text-justify md:text-left">
              <p>{profile.about_summary}</p>
              <p>{profile.about_details}</p>
            </div>
            <div className="bg-white dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-850 dark:border-gray-800 shadow-sm space-y-4 text-sm">
              <h3 className="font-bold text-gray-900 dark:text-white text-base">Informasi Cepat</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400 dark:text-gray-500 font-medium">Lokasi:</span>
                  <p className="font-semibold text-gray-900 dark:text-white">{profile.location}</p>
                </div>
                <div>
                  <span className="text-gray-400 dark:text-gray-500 font-medium">Pekerjaan:</span>
                  <p className="font-semibold text-gray-900 dark:text-white">{profile.role} / Student</p>
                </div>
                <div>
                  <span className="text-gray-400 dark:text-gray-500 font-medium">Spesialisasi:</span>
                  <p className="font-semibold text-gray-900 dark:text-white">Web Apps, Responsive Design</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="scroll-mt-24 space-y-8">
          <div className="inline-block border-b-2 border-accent pb-1">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Project Saya</h2>
          </div>
          {projects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, idx) => (
                <ProjectCard
                  key={idx}
                  title={project.title}
                  description={project.description}
                  tech={project.tech}
                  github_url={project.github_url}
                  demo_url={project.demo_url}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              Belum ada proyek yang ditampilkan.
            </div>
          )}
        </section>

        {/* Skills Section */}
        <section id="skills" className="scroll-mt-24 space-y-6">
          <div className="inline-block border-b-2 border-accent pb-1">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Skills & Tech Stack</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Berikut adalah beberapa teknologi yang biasa saya gunakan untuk mengembangkan aplikasi web:
          </p>
          <div className="flex flex-wrap gap-3">
            {profile.skills.map((skill, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-900/30 border border-gray-200 dark:border-gray-850 dark:border-gray-800 px-5 py-3 rounded-2xl font-semibold text-gray-800 dark:text-gray-200 shadow-sm hover:border-accent dark:hover:border-accent hover:text-accent dark:hover:text-accent transition-all duration-300"
              >
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="scroll-mt-24 space-y-8">
          <div className="inline-block border-b-2 border-accent pb-1">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Hubungi Saya</h2>
          </div>
          <div className="bg-white dark:bg-gray-900/30 border border-gray-200 dark:border-gray-850 dark:border-gray-800 p-8 rounded-3xl grid md:grid-cols-2 gap-8 shadow-sm">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Mari Diskusi tentang Project Anda</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Apakah Anda memiliki pertanyaan atau ingin berkolaborasi untuk sebuah proyek? Silakan hubungi saya melalui form di samping, atau hubungi saya langsung via platform sosial.
              </p>
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-accent font-bold">Email:</span>
                  <a href={`mailto:${profile.email}`} className="hover:underline text-gray-700 dark:text-gray-300 font-medium">
                    {profile.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-accent font-bold">GitHub:</span>
                  <a
                    href={profile.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-gray-700 dark:text-gray-300 font-medium"
                  >
                    {profile.github_url.replace("https://", "")}
                  </a>
                </div>
                {profile.linkedin_url && (
                  <div className="flex items-center gap-3">
                    <span className="text-accent font-bold">LinkedIn:</span>
                    <a
                      href={profile.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-gray-700 dark:text-gray-300 font-medium"
                    >
                      {profile.linkedin_url.replace("https://", "")}
                    </a>
                  </div>
                )}
              </div>
            </div>
            {/* Contact Form - Client Component */}
            <ContactForm />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-900 py-8 text-center text-sm text-gray-500 dark:text-gray-600">
        <p>© 2026 {profile.name}. All rights reserved.</p>
      </footer>
    </div>
  );
}
