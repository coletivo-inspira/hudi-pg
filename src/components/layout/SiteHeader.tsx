import { HudiLogo } from "@/components/brand/HudiLogo";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={`page-container ${styles.inner}`}>
        <a href="#inicio" className={styles.brand} aria-label="HUDI Pages, início">
          <HudiLogo />
        </a>
        <nav className={styles.nav} aria-label="Navegação principal">
          <a href="#criar">Criar</a>
          <a href="#templates">Temas</a>
          <a href="#como-funciona">Como funciona</a>
        </nav>
        <a href="#criar" className={`button-primary ${styles.cta}`}>
          Criar grátis
        </a>
      </div>
    </header>
  );
}

