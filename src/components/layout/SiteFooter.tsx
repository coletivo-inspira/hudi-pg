import { HudiLogo } from "@/components/brand/HudiLogo";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className="page-container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <HudiLogo inverted />
            <p>
              Uma ferramenta Hudi Labs criada com o Coletivo Inspira para ampliar o acesso a
              uma presença digital digna, clara e sustentável.
            </p>
          </div>
          <nav className={styles.links} aria-label="Links do rodapé">
            <a href="https://hudi.inspira.dev.br/">Hudi Labs</a>
            <a href="https://hudi.inspira.dev.br/brandbook/">Brand Book</a>
            <a href="https://github.com/coletivo-inspira/hudi-pg">Código no GitHub</a>
          </nav>
        </div>
        <div className={styles.bottom}>
          <span>© 2026 HUDI Pages.</span>
          <span>Ideias úteis, páginas que abrem caminhos.</span>
        </div>
      </div>
    </footer>
  );
}

