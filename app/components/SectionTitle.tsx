"use client";

import type { ReactNode } from "react";
import styles from "../page.module.css";

// Section title component for reusable content headers across the page.

interface SectionTitleProps {
  title: string;
  rightLabel?: string;
  accent?: ReactNode;
}

export default function SectionTitle({
  title,
  rightLabel,
  accent,
}: SectionTitleProps) {
  return (
    <div className={styles.sectionHeader}>
      <div className={styles.sectionHeading}>
        {accent}
        <h2>{title}</h2>
      </div>
      {rightLabel ? <button className={styles.ghostLink}>{rightLabel}</button> : null}
    </div>
  );
}
