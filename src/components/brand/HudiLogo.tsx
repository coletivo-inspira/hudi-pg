import styles from "./HudiLogo.module.css";

interface HudiLogoProps {
  inverted?: boolean;
}

export function HudiLogo({ inverted = false }: HudiLogoProps) {
  return (
    <span className={`${styles.logo} ${inverted ? styles.inverted : ""}`}>
      <span className={styles.mark} aria-hidden="true" />
      <span>
        <span className={styles.name}>HUDI</span>{" "}
        <span className={styles.product}>Pages</span>
      </span>
    </span>
  );
}

