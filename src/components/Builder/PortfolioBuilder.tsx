"use client";

import { useMemo, useState } from "react";
import { createPublicationRequest, toPortfolioSlug } from "@/domain/portfolio/slug";
import type {
  PortfolioBlock,
  PortfolioDraft,
  PortfolioProject,
} from "@/domain/portfolio/types";
import {
  createDefaultDraft,
  themes,
  userBlockCatalog,
} from "@/domain/templates/registry";
import { submitPublicationRequest, type SubmissionResult } from "@/services/submission";
import { PortfolioPreview } from "./PortfolioPreview";
import styles from "./PortfolioBuilder.module.css";

const steps = ["Identidade", "Conteúdo", "Visual", "Revisar"] as const;

export function PortfolioBuilder() {
  const [draft, setDraft] = useState<PortfolioDraft>(() => createDefaultDraft());
  const [step, setStep] = useState(0);
  const [submission, setSubmission] = useState<SubmissionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step]);

  const updateField = <K extends keyof PortfolioDraft>(
    field: K,
    value: PortfolioDraft[K],
  ) => {
    setDraft((current) => ({ ...current, [field]: value }));
    setSubmission(null);
  };

  const updateName = (displayName: string) => {
    setDraft((current) => {
      const shouldUpdateSlug =
        current.slug === toPortfolioSlug(current.displayName) || current.slug === "seu-nome";
      return {
        ...current,
        displayName,
        slug: shouldUpdateSlug ? toPortfolioSlug(displayName) : current.slug,
      };
    });
  };

  const updateProject = (
    projectId: string,
    field: keyof Omit<PortfolioProject, "id">,
    value: string,
  ) => {
    updateField(
      "projects",
      draft.projects.map((project) =>
        project.id === projectId ? { ...project, [field]: value } : project,
      ),
    );
  };

  const addProject = () => {
    updateField("projects", [
      ...draft.projects,
      {
        id: `project-${Date.now()}-${draft.projects.length}`,
        title: "Novo projeto",
        description: "Conte o que tornou este projeto importante.",
        url: "",
      },
    ]);
  };

  const removeProject = (projectId: string) => {
    if (draft.projects.length === 1) return;
    updateField(
      "projects",
      draft.projects.filter((project) => project.id !== projectId),
    );
  };

  const updateBlock = <K extends keyof Omit<PortfolioBlock, "id">>(
    blockId: string,
    field: K,
    value: PortfolioBlock[K],
  ) => {
    updateField(
      "blocks",
      draft.blocks.map((block) =>
        block.id === blockId ? { ...block, [field]: value } : block,
      ),
    );
  };

  const addBlock = () => {
    const blockNumber = draft.blocks.length + 1;
    updateField("blocks", [
      ...draft.blocks,
      {
        id: `block-${Date.now()}-${blockNumber}`,
        kind: "about",
        title: `Bloco adicional ${blockNumber}`,
        content: "Conteúdo livre, seguro e adaptado ao tema escolhido.",
      },
    ]);
  };

  const removeBlock = (blockId: string) => {
    updateField(
      "blocks",
      draft.blocks.filter((block) => block.id !== blockId),
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const result = await submitPublicationRequest(createPublicationRequest(draft));
      setSubmission(result);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Não foi possível preparar sua solicitação.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="criar" className={styles.section} aria-labelledby="builder-title">
      <div className="page-container">
        <div className="section-heading">
          <p className="eyebrow">Editor modular</p>
          <h2 id="builder-title">Monte seu smartfolio</h2>
          <p>
            Preencha no seu ritmo. Cada alteração aparece ao lado e vira uma solicitação
            revisável antes da publicação.
          </p>
        </div>

        <div className={styles.workspace}>
          <form className={styles.formPanel} onSubmit={handleSubmit}>
            <div className={styles.progressTrack} aria-hidden="true">
              <span style={{ width: `${progress}%` }} />
            </div>
            <ol className={styles.steps} aria-label="Etapas do editor">
              {steps.map((label, index) => (
                <li key={label}>
                  <button
                    type="button"
                    aria-label={label}
                    aria-current={step === index ? "step" : undefined}
                    onClick={() => setStep(index)}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {label}
                  </button>
                </li>
              ))}
            </ol>

            <div className={styles.stepBody}>
              {step === 0 ? (
                <fieldset className={styles.fieldset}>
                  <legend>Comece pela sua identidade</legend>
                  <div className={styles.fieldGrid}>
                    <label>
                      Nome ou marca
                      <input
                        value={draft.displayName}
                        onChange={(event) => updateName(event.target.value)}
                        autoComplete="name"
                        required
                      />
                    </label>
                    <label>
                      Área de atuação
                      <input
                        value={draft.profession}
                        onChange={(event) => updateField("profession", event.target.value)}
                        required
                      />
                    </label>
                  </div>
                  <label>
                    Frase principal
                    <input
                      value={draft.tagline}
                      onChange={(event) => updateField("tagline", event.target.value)}
                      required
                    />
                  </label>
                  <label>
                    Endereço desejado
                    <div className={styles.slugInput}>
                      <span>inspira.dev.br/</span>
                      <input
                        value={draft.slug}
                        onChange={(event) => updateField("slug", toPortfolioSlug(event.target.value))}
                        aria-label="Endereço desejado"
                        required
                      />
                    </div>
                  </label>
                </fieldset>
              ) : null}

              {step === 1 ? (
                <fieldset className={styles.fieldset}>
                  <legend>Conte sua história com projetos</legend>
                  <label>
                    Apresentação
                    <textarea
                      rows={4}
                      value={draft.bio}
                      onChange={(event) => updateField("bio", event.target.value)}
                      required
                    />
                  </label>
                  <div className={styles.projectList}>
                    {draft.projects.map((project, index) => (
                      <div className={styles.projectEditor} key={project.id}>
                        <div className={styles.projectHeader}>
                          <strong>Projeto {String(index + 1).padStart(2, "0")}</strong>
                          {draft.projects.length > 1 ? (
                            <button type="button" onClick={() => removeProject(project.id)}>
                              Remover
                            </button>
                          ) : null}
                        </div>
                        <label>
                          Título do projeto
                          <input
                            aria-label="Título do projeto"
                            value={project.title}
                            onChange={(event) =>
                              updateProject(project.id, "title", event.target.value)
                            }
                          />
                        </label>
                        <label>
                          Descrição
                          <textarea
                            rows={3}
                            value={project.description}
                            onChange={(event) =>
                              updateProject(project.id, "description", event.target.value)
                            }
                          />
                        </label>
                      </div>
                    ))}
                  </div>
                  <button className={styles.addButton} type="button" onClick={addProject}>
                    <span aria-hidden="true">+</span> Adicionar projeto
                  </button>

                  <div className={styles.blockSection}>
                    <div className={styles.blockSectionHeading}>
                      <div>
                        <h3>Blocos adicionais</h3>
                        <p>Adicione quantos precisar. HTML e scripts não entram no editor público.</p>
                      </div>
                      <span>{draft.blocks.length} ativo(s)</span>
                    </div>

                    {draft.blocks.map((block, index) => (
                      <div className={styles.blockEditor} key={block.id}>
                        <div className={styles.projectHeader}>
                          <strong>Bloco {String(index + 1).padStart(2, "0")}</strong>
                          <button type="button" onClick={() => removeBlock(block.id)}>
                            Remover
                          </button>
                        </div>
                        <label>
                          Tipo de bloco
                          <select
                            aria-label={`Tipo do bloco ${index + 1}`}
                            value={block.kind}
                            onChange={(event) =>
                              updateBlock(
                                block.id,
                                "kind",
                                event.target.value as PortfolioBlock["kind"],
                              )
                            }
                          >
                            {userBlockCatalog.map((item) => (
                              <option key={item.kind} value={item.kind}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label>
                          Título
                          <input
                            aria-label={`Título do bloco ${index + 1}`}
                            value={block.title}
                            onChange={(event) =>
                              updateBlock(block.id, "title", event.target.value)
                            }
                          />
                        </label>
                        <label>
                          Conteúdo
                          <textarea
                            rows={3}
                            value={block.content}
                            onChange={(event) =>
                              updateBlock(block.id, "content", event.target.value)
                            }
                          />
                        </label>
                      </div>
                    ))}

                    <button className={styles.addButton} type="button" onClick={addBlock}>
                      <span aria-hidden="true">+</span> Adicionar bloco
                    </button>
                  </div>
                </fieldset>
              ) : null}

              {step === 2 ? (
                <fieldset className={styles.fieldset}>
                  <legend>Escolha a atmosfera visual</legend>
                  <div className={styles.themeGrid}>
                    {themes.map((theme) => (
                      <label className={styles.themeOption} key={theme.id}>
                        <input
                          type="radio"
                          name="theme"
                          value={theme.id}
                          checked={draft.themeId === theme.id}
                          onChange={() => updateField("themeId", theme.id)}
                        />
                        <span className={styles.themeSwatch} data-tone={theme.previewTone} />
                        <strong>{theme.name}</strong>
                        <small>{theme.description}</small>
                      </label>
                    ))}
                  </div>
                </fieldset>
              ) : null}

              {step === 3 ? (
                <fieldset className={styles.fieldset}>
                  <legend>Revise antes de enviar</legend>
                  <dl className={styles.reviewList}>
                    <div>
                      <dt>Endereço</dt>
                      <dd>inspira.dev.br/{draft.slug}</dd>
                    </div>
                    <div>
                      <dt>Template</dt>
                      <dd>Smartfolio Modular · {draft.themeId}</dd>
                    </div>
                    <div>
                      <dt>Conteúdo</dt>
                      <dd>
                        {draft.projects.length} projeto(s) · {draft.blocks.length} bloco(s)
                      </dd>
                    </div>
                  </dl>
                  <label className={styles.consent}>
                    <input
                      type="checkbox"
                      checked={draft.consentToReview}
                      onChange={(event) =>
                        updateField("consentToReview", event.target.checked)
                      }
                    />
                    <span>
                      Autorizo a revisão do conteúdo pelo Coletivo Inspira antes da
                      publicação gratuita.
                    </span>
                  </label>

                  {submission ? (
                    <div className={styles.successMessage} role="status">
                      <strong>
                        {submission.status === "queued"
                          ? "Solicitação enviada para revisão."
                          : "Seu smartfolio está pronto para integração."}
                      </strong>
                      <p>
                        Protocolo: {submission.requestId}. O Worker seguro fará o envio
                        assim que o endpoint de produção estiver configurado.
                      </p>
                    </div>
                  ) : null}
                  {error ? (
                    <p className={styles.errorMessage} role="alert">
                      {error}
                    </p>
                  ) : null}
                </fieldset>
              ) : null}
            </div>

            <div className={styles.formActions}>
              <button
                type="button"
                className={styles.backButton}
                onClick={() => setStep((current) => Math.max(0, current - 1))}
                disabled={step === 0}
              >
                Voltar
              </button>
              {step < steps.length - 1 ? (
                <button
                  type="button"
                  className={styles.nextButton}
                  onClick={() => setStep((current) => Math.min(steps.length - 1, current + 1))}
                >
                  Continuar <span aria-hidden="true">→</span>
                </button>
              ) : (
                <button
                  type="submit"
                  className={styles.nextButton}
                  disabled={!draft.consentToReview || submitting}
                >
                  {submitting ? "Preparando..." : "Enviar para revisão"}
                </button>
              )}
            </div>
          </form>

          <PortfolioPreview draft={draft} />
        </div>
      </div>
    </section>
  );
}
