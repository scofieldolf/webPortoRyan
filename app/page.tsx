import fs from "fs";
import path from "path";
import ContactForm from "./components/ContactForm";
import ProjectCard from "./components/ProjectCard";
import Navbar from "./components/Navbar";
import FloatingParticles from "./components/FloatingParticles";
import TiltCard from "./components/TiltCard";

// Project data type
interface Project {
  title: string;
  description: string;
  tech: string[];
  github_url: string;
  demo_url: string;
}

// Profile data type
interface Profile {
  name: string;
  role: string;
  location: string;
  email: string;
  phone?: string;
  github_url: string;
  linkedin_url: string;
  cv_url: string;
  about_summary: string;
  about_details: string;
  skills: string[];
}

export const revalidate = 0; // Force page to always fetch latest data

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
    console.error("Failed to read JSON data file:", err);
    // Fallback data if file reading fails
    profile = {
      name: "Ryan",
      role: "Frontend Developer",
      location: "Indonesia",
      email: "i.viryavan@binus.ac.id",
      phone: "https://wa.me/6287886790981",
      github_url: "https://github.com/scofieldolf",
      linkedin_url: "https://www.linkedin.com/in/i-made-viryavan-751766413/",
      cv_url: "/cv-ryan.pdf",
      about_summary: "I am an IT student/professional passionate about developing modern websites.",
      about_details: "My main focus is deepening my knowledge of the React and Next.js ecosystem.",
      skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React.js", "Next.js", "Tailwind CSS"],
    };
    projects = [];
  }

  return (
    <div className="relative min-h-screen bg-[#050200] text-gray-200 selection:bg-amber-500/30 selection:text-amber-200 overflow-x-hidden">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-60 z-0" />
      <div className="absolute inset-0 cyber-grid-dots pointer-events-none opacity-45 z-0" />

      {/* Ambient Radial Glows */}
      <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[40%] right-[5%] w-[500px] h-[500px] rounded-full bg-amber-600/4 blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] left-[15%] w-[450px] h-[450px] rounded-full bg-amber-500/3 blur-[130px] pointer-events-none z-0" />

      {/* Background Floating Particles */}
      <FloatingParticles />

      {/* Navbar */}
      <Navbar name={profile.name} />

      <main className="relative mx-auto max-w-5xl px-6 py-16 md:py-24 space-y-36 z-10">
        {/* Hero Section */}
        <section id="hero" className="relative flex flex-col items-center text-center md:items-start md:text-left justify-between md:flex-row gap-12 py-12">
          {/* Tech Grid Accents */}
          <div className="absolute -left-4 top-0 w-8 h-8 border-t-2 border-l-2 border-amber-500/20 pointer-events-none" />

          <div className="space-y-6 max-w-2xl">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full text-xs font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              STATUS: AVAILABLE_FOR_PROJECTS
            </div>

            <h1 className="text-4xl font-extrabold sm:text-7xl tracking-tight leading-none text-white font-mono uppercase">
              Hello, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 drop-shadow-[0_2px_10px_rgba(245,158,11,0.2)]">{profile.name}</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-xl font-sans">
              A <span className="font-semibold text-white">{profile.role}</span> focused on engineering immersive, hyper-responsive, and user-centric digital environments.
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
              <a
                href="#contact"
                className="px-6 py-3.5 rounded-xl font-mono text-sm font-semibold bg-amber-500 hover:bg-amber-600 text-black transition-all neon-glow-amber border border-amber-400/20 active:scale-95"
              >
                {"// CONTACT_ME"}
              </a>
              <a
                href="#projects"
                className="px-6 py-3.5 rounded-xl font-mono text-sm font-semibold bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 hover:border-amber-500/30 transition-all active:scale-95"
              >
                {"// VIEW_PROJECTS"}
              </a>
              <a
                href={profile.cv_url}
                download
                className="px-6 py-3.5 rounded-xl font-mono text-sm font-semibold bg-transparent border border-amber-500/20 text-amber-400 hover:bg-amber-500/10 hover:border-amber-400/40 transition-all"
              >
                {"// DOWNLOAD_CV"}
              </a>
            </div>
          </div>

          <div className="flex-shrink-0 relative">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-300 opacity-20 blur-xl animate-pulse" />
            <TiltCard className="rounded-full">
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full glass-panel border border-amber-500/20 flex items-center justify-center text-white text-6xl md:text-8xl font-black tracking-tighter shadow-2xl">
                {/* Tech ticks circle background */}
                <div className="absolute inset-2 border border-dashed border-amber-500/15 rounded-full animate-[spin_60s_linear_infinite]" />
                <div className="absolute inset-4 border border-amber-500/5 rounded-full" />
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-tr from-white via-amber-200 to-amber-400 drop-shadow-[0_2px_8px_rgba(245,158,11,0.3)]">
                  {profile.name.charAt(0)}
                </span>
              </div>
            </TiltCard>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="scroll-mt-32 relative space-y-8">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-amber-500/60 font-semibold">[SECT.01]</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight uppercase font-mono">About Me</h2>
            <div className="flex-grow h-px bg-gradient-to-r from-amber-500/20 to-transparent" />
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-lg leading-relaxed text-gray-400">
            <div className="md:col-span-2 space-y-6 text-justify md:text-left font-sans">
              <p className="first-letter:text-4xl first-letter:font-bold first-letter:text-amber-400 first-letter:mr-2">{profile.about_summary}</p>
              <p>{profile.about_details}</p>
            </div>

            <TiltCard className="rounded-2xl h-full">
              <div className="glass-panel border border-amber-500/10 p-6 rounded-2xl h-full space-y-6 text-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 rounded-bl-full pointer-events-none" />
                <h3 className="font-mono font-bold text-white text-base flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Quick Info
                </h3>
                <div className="space-y-4 font-mono">
                  <div className="border-b border-white/5 pb-2">
                    <span className="text-amber-400/70 block text-xs">{"// LOCATION"}</span>
                    <p className="font-semibold text-gray-200">{profile.location}</p>
                  </div>
                  <div className="border-b border-white/5 pb-2">
                    <span className="text-amber-400/70 block text-xs">{"// PRIMARY_ROLE"}</span>
                    <p className="font-semibold text-gray-200">{profile.role} / Student</p>
                  </div>
                  <div>
                    <span className="text-amber-400/70 block text-xs">{"// SPECIALIZATION"}</span>
                    <p className="font-semibold text-gray-200">Interactive Web Interfaces</p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="scroll-mt-32 relative space-y-8">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-amber-500/60 font-semibold">[SECT.02]</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight uppercase font-mono">Featured Projects</h2>
            <div className="flex-grow h-px bg-gradient-to-r from-amber-500/20 to-transparent" />
          </div>

          {projects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <div className="text-center py-16 glass-panel border border-amber-500/10 rounded-2xl text-gray-500 font-mono">
              {"// NO_PROJECTS_REGISTERED"}
            </div>
          )}
        </section>

        {/* Skills Section */}
        <section id="skills" className="scroll-mt-32 relative space-y-8">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-amber-500/60 font-semibold">[SECT.03]</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight uppercase font-mono">Skills &amp; Tech Stack</h2>
            <div className="flex-grow h-px bg-gradient-to-r from-amber-500/20 to-transparent" />
          </div>

          <p className="text-gray-400 font-sans">
            A modular map of tools, platforms, and environments I use to build scalable web applications:
          </p>

          <div className="flex flex-wrap gap-4">
            {profile.skills.map((skill, idx) => (
              <TiltCard key={idx} className="rounded-2xl">
                <div className="glass-panel border border-amber-500/10 hover:border-amber-500/30 px-6 py-4 rounded-2xl font-mono text-sm font-semibold text-gray-300 hover:text-amber-400 transition-all duration-300 flex items-center gap-2">
                  <span className="text-amber-500/40 font-normal">#</span>
                  {skill}
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="scroll-mt-32 relative space-y-8">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-amber-500/60 font-semibold">[SECT.04]</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight uppercase font-mono">Contact Me</h2>
            <div className="flex-grow h-px bg-gradient-to-r from-amber-500/20 to-transparent" />
          </div>

          <div className="glass-panel border border-amber-500/10 p-8 md:p-10 rounded-3xl grid md:grid-cols-2 gap-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-amber-500/5 to-transparent pointer-events-none" />

            <div className="space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-2xl font-extrabold text-white tracking-tight uppercase font-mono">Let&apos;s Build Something Together</h3>
                <p className="text-gray-400 leading-relaxed font-sans">
                  Have an interesting project, a job opportunity, or just want to chat about web engineering? Reach out using the form, or ping me directly on my social lines.
                </p>
              </div>

              <div className="space-y-4 text-sm font-mono pt-6 md:pt-0">
                <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                  <span className="text-amber-400 font-semibold">{"// EMAIL:"}</span>
                  <a href={`mailto:${profile.email}`} className="hover:text-amber-300 text-gray-300 transition-colors">
                    {profile.email}
                  </a>
                </div>
                {profile.phone && (
                  <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                    <span className="text-amber-400 font-semibold">{"// WHATSAPP:"}</span>
                    <a
                      href={profile.phone}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-amber-300 text-gray-300 transition-colors"
                    >
                      {profile.phone.replace("https://wa.me/", "+").replace("628", "08")}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                  <span className="text-amber-400 font-semibold">{"// GITHUB:"}</span>
                  <a
                    href={profile.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-300 text-gray-300 transition-colors"
                  >
                    {profile.github_url.replace("https://", "")}
                  </a>
                </div>
                {profile.linkedin_url && (
                  <div className="flex items-center gap-3">
                    <span className="text-amber-400 font-semibold">{"// LINKEDIN:"}</span>
                    <a
                      href={profile.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-amber-300 text-gray-300 transition-colors"
                    >
                      {profile.linkedin_url.replace("https://", "")}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Form - Client Component */}
            <div className="relative z-10">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-amber-500/10 py-10 text-center text-xs font-mono text-gray-500 z-10 bg-[#050200]/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2026 {profile.name.toUpperCase()}. ALL RIGHTS RESERVED.</p>
          <p className="text-amber-500/50">ENG: NEXT.JS_14 + TAILWIND_CSS + FRAMER_MOTION</p>
        </div>
      </footer>
    </div>
  );
}
