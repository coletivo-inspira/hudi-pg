import type { Metadata } from "next";
import "./globals.css";
import "./motion.css";

export const metadata: Metadata = {
  title: "HUDI Pages | Seu smartfolio gratuito",
  description:
    "Crie um portfólio modular, revise em tempo real e publique gratuitamente com o ecossistema Hudi Labs.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

