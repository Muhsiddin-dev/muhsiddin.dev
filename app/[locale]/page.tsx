import { AboutSection } from "@/components/AboutSection";
import { CertificatesSection } from "@/components/certificates-section";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/footer";
import Header from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ProjectsSection } from "@/components/projects-section";
import { SkillsSection } from "@/components/skills-section";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection/>
      <SkillsSection />
      <ProjectsSection />
      <CertificatesSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
