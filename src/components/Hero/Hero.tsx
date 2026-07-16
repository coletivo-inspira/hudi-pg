import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="inicio" className={styles.hero} aria-labelledby="hero-title">
      <div className={`page-container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className="eyebrow">Hudi Labs · Smartfolios gratuitos</p>
          <h1 id="hero-title">HUDI Pages</h1>
          <p className={styles.lead}>
            Sua história já existe. Organize projetos, identidade e contatos em uma página
            bonita, modular e pronta para ser publicada gratuitamente.
          </p>
          <div className={styles.actions}>
            <a className="button-primary" href="#criar">
              Criar meu portfólio <span aria-hidden="true">→</span>
            </a>
            <a className={`button-secondary ${styles.secondary}`} href="#templates">
              Explorar temas
            </a>
          </div>
          <ul className={styles.signals} aria-label="Benefícios">
            <li>Prévia em tempo real</li>
            <li>GitHub Pages</li>
            <li>Publicação moderada</li>
          </ul>
        </div>

        <div className={styles.stage} aria-hidden="true">
          <div className={styles.canvas}>
            <div className={styles.canvasBar}>
              <span>smartfolio.canvas</span>
              <span>AO VIVO</span>
            </div>
            <span className={`${styles.block} ${styles.blockOne}`} />
            <span className={`${styles.block} ${styles.blockTwo}`} />
            <span className={`${styles.block} ${styles.blockThree}`} />
            <span className={`${styles.copyLine} ${styles.lineOne}`} />
            <span className={`${styles.copyLine} ${styles.lineTwo}`} />
            <span className={styles.cursor} />
          </div>
          <span className={styles.tag}>BLOCOS QUE SE ADAPTAM</span>
        </div>
      </div>
    </section>
  );
}

