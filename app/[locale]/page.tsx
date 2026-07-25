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
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 flex flex-col space-y-16 md:space-y-24 pb-12">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <CertificatesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}