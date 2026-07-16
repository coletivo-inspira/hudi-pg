import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";

describe("HUDI Pages home", () => {
  it("apresenta o produto e leva ao construtor", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "HUDI Pages" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Monte seu smartfolio" }),
    ).toBeInTheDocument();
  });

  it("permite adicionar projetos, blocos e escolher um tema", () => {
    render(<HomePage />);

    fireEvent.click(screen.getByRole("button", { name: "Conteúdo" }));
    fireEvent.click(screen.getByRole("button", { name: "Adicionar projeto" }));
    expect(screen.getAllByLabelText("Título do projeto")).toHaveLength(2);

    fireEvent.click(screen.getByRole("button", { name: "Adicionar bloco" }));
    expect(screen.getByLabelText("Título do bloco 1")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Visual" }));
    expect(screen.getByRole("radio", { name: /Editorial/ })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /Deep Focus/ })).toBeInTheDocument();
  });
});
