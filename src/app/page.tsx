import { PortfolioBuilder } from "@/components/Builder/PortfolioBuilder";
import { Hero } from "@/components/Hero/Hero";
import { Process } from "@/components/Process/Process";
import { TemplateShowcase } from "@/components/TemplateShowcase/TemplateShowcase";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <SiteHeader />
      <main id="conteudo">
        <Hero />
        <PortfolioBuilder />
        <TemplateShowcase />
        <Process />
      </main>
      <SiteFooter />
    </>
  );
}

