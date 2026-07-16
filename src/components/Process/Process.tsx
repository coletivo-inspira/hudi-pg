import styles from "./Process.module.css";

const processSteps = [
  {
    title: "Você monta",
    description: "Preencha identidade, história, projetos e tema com prévia ao vivo.",
  },
  {
    title: "O Coletivo revisa",
    description: "Conteúdo e endereço passam por uma moderação humana e transparente.",
  },
  {
    title: "O HUDI publica",
    description: "A automação cria um repositório próprio e ativa o GitHub Pages.",
  },
  {
    title: "Você continua",
    description: "Um link privado permite atualizar conteúdo sem aprender Git ou código.",
  },
] as const;

export function Process() {
  return (
    <section id="como-funciona" className={styles.section} aria-labelledby="process-title">
      <div className="page-container">
        <div className="section-heading">
          <p className="eyebrow">Publicação responsável</p>
          <h2 id="process-title">Grátis para começar. Estruturado para continuar.</h2>
          <p>
            Cada smartfolio nasce independente, com histórico próprio e espaço para crescer
            sem perder o padrão do ecossistema.
          </p>
        </div>
        <ol className={styles.timeline}>
          {processSteps.map((item, index) => (
            <li className={styles.step} key={item.title}>
              <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
              <div className={styles.content}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className={styles.note}>
          HTML personalizado entra apenas em templates revisados. Seus dados e seus visitantes
          não ficam expostos a scripts arbitrários.
        </p>
      </div>
    </section>
  );
}

