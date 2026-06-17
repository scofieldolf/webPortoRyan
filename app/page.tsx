import fs from "fs";
import path from "path";
import PortfolioClient from "./components/PortfolioClient";

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
  avatar_url?: string;
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
      role: "Fullstack Developer & AI Engineer",
      location: "Indonesia",
      email: "i.viryavan@binus.ac.id",
      phone: "https://wa.me/6287886790981",
      github_url: "https://github.com/scofieldolf",
      linkedin_url: "https://www.linkedin.com/in/i-made-viryavan-751766413/",
      cv_url: "/cv-ryan.pdf",
      avatar_url: "/fotoryan.png",
      about_summary: "6th-semester Computer Science student at Binus University, focused on fullstack development and AI engineering. I build things end-to-end — from interactive user interfaces to the systems and models running underneath.",
      about_details: "Currently exploring the intersection of real-time data, mapping, and AI-powered applications. Open to internship, freelance, and full-time opportunities — remote or hybrid.",
      skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React.js", "Next.js", "Tailwind CSS"],
    };
    projects = [];
  }

  return <PortfolioClient profile={profile} projects={projects} />;
}
