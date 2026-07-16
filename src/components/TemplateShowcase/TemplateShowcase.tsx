import { themes } from "@/domain/templates/registry";
import styles from "./TemplateShowcase.module.css";

export function TemplateShowcase() {
  return (
    <section id="templates" className={styles.section} aria-labelledby="templates-title">
      <div className="page-container">
        <div className={`section-heading ${styles.heading}`}>
          <p className="eyebrow">Uma estrutura, múltiplas expressões</p>
          <h2 id="templates-title">Escolha a atmosfera. Preserve sua história.</h2>
          <p>
            Os temas mudam a expressão visual; conteúdo, acessibilidade e desempenho
            continuam no mesmo núcleo confiável.
          </p>
        </div>
        <div className={styles.grid}>
          {themes.map((theme, index) => (
            <article className={styles.card} key={theme.id}>
              <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
              <div className={styles.preview} data-tone={theme.previewTone} aria-hidden="true" />
              <div className={styles.content}>
                <h3>{theme.name}</h3>
                <p>{theme.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

