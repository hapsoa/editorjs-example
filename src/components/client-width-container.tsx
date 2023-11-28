"use client";
import styles from "./client-width-container.module.css";
import { RecoilRoot } from "recoil";

export type PCWidth = "30rem" | "40rem" | "50rem";

function getPCWidthStyle(pcWidth: PCWidth) {
  switch (pcWidth) {
    case "30rem":
      return `${styles.container} ${styles["container-30"]}`;
    case "40rem":
      return `${styles.container} ${styles["container-40"]}`;
    case "50rem":
      return `${styles.container} ${styles["container-50"]}`;
    default:
      return `${styles.container}`;
  }
}

interface Props {
  children: JSX.Element;
  pcWidth?: PCWidth;
}
export function ClientWidthContainer({ children, pcWidth = "40rem" }: Props) {
  return (
    <RecoilRoot>
      <main>
        <div className={`container ${getPCWidthStyle(pcWidth)}`}>
          {children}
        </div>
      </main>
    </RecoilRoot>
  );
}
