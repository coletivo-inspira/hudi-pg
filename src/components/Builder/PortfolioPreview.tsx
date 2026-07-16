import type { PortfolioDraft } from "@/domain/portfolio/types";
import { userBlockCatalog } from "@/domain/templates/registry";
import styles from "./PortfolioBuilder.module.css";

interface PortfolioPreviewProps {
  draft: PortfolioDraft;
}

export function PortfolioPreview({ draft }: PortfolioPreviewProps) {
  const previewProjects = draft.projects.slice(0, 3);
  const previewBlocks = draft.blocks.slice(0, 3);

  return (
    <aside className={styles.previewPanel} aria-label="Prévia do portfólio">
      <div className={styles.previewToolbar}>
        <span>inspira.dev.br/{draft.slug || "seu-nome"}</span>
        <span className={styles.liveDot}>prévia</span>
      </div>
      <article className={styles.previewCanvas} data-theme={draft.themeId}>
        <div className={styles.previewHero}>
          <p>{draft.profession || "Sua especialidade"}</p>
          <h3>{draft.displayName || "Seu nome"}</h3>
          <strong>{draft.tagline || "Uma frase clara sobre o que você faz."}</strong>
        </div>

        <div className={styles.previewAbout}>
          <span>01 · Sobre</span>
          <p>{draft.bio || "Sua história aparece aqui."}</p>
        </div>

        <div className={styles.previewProjects}>
          <span>02 · Projetos</span>
          {previewProjects.map((project, index) => (
            <div className={styles.previewProject} key={project.id}>
              <b>{String(index + 1).padStart(2, "0")}</b>
              <div>
                <strong>{project.title || "Projeto sem título"}</strong>
                <p>{project.description || "Descrição do projeto."}</p>
              </div>
            </div>
          ))}
        </div>

        {previewBlocks.map((block, index) => (
          <div className={styles.previewCustomBlock} key={block.id}>
            <span>
              {String(index + 3).padStart(2, "0")} ·{" "}
              {userBlockCatalog.find((item) => item.kind === block.kind)?.name ?? block.kind}
            </span>
            <strong>{block.title}</strong>
            <p>{block.content}</p>
          </div>
        ))}
      </article>
    </aside>
  );
}
