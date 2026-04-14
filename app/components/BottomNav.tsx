"use client";

import Icon from "./Icon";
import styles from "../page.module.css";

interface BottomNavItem {
  id: string;
  icon: string;
  label: string;
  badge?: number;
}

interface BottomNavProps {
  items: BottomNavItem[];
  activeItem: string;
  onSelect: (itemId: string) => void;
}

export default function BottomNav({ items, activeItem, onSelect }: BottomNavProps) {
  return (
    <nav className={styles.bottomNav} aria-label="Điều hướng chính">
      {items.map((item) => (
        <button
          aria-current={activeItem === item.id ? "page" : undefined}
          className={`${styles.bottomNavItem} ${
            activeItem === item.id ? styles.bottomNavItemActive : ""
          }`}
          key={item.id}
          onClick={() => onSelect(item.id)}
          type="button"
        >
          <span className={styles.bottomNavIconWrap}>
            <Icon name={item.icon} className={styles.bottomNavIcon} />
            {item.badge ? <span className={styles.bottomNavBadge}>{item.badge}</span> : null}
          </span>
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
