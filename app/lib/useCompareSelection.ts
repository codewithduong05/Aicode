"use client";

import { useEffect, useState } from "react";

const COMPARE_STORAGE_KEY = "laptop-store-compare-selection";

function normalizeSelection(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return [...new Set(value.filter((item): item is string => typeof item === "string"))].slice(0, 2);
}

export function readStoredCompareSelection() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawValue = window.localStorage.getItem(COMPARE_STORAGE_KEY);

    if (!rawValue) {
      return [];
    }

    return normalizeSelection(JSON.parse(rawValue));
  } catch {
    return [];
  }
}

export function useCompareSelection() {
  const [selection, setSelection] = useState<string[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    setSelection(readStoredCompareSelection());
    setHasLoaded(true);

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === COMPARE_STORAGE_KEY) {
        setSelection(readStoredCompareSelection());
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    if (!hasLoaded) {
      return;
    }

    window.localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(selection));
  }, [hasLoaded, selection]);

  const toggleSelection = (slug: string) => {
    setSelection((current) => {
      if (current.includes(slug)) {
        return current.filter((item) => item !== slug);
      }

      if (current.length === 2) {
        return [current[1], slug];
      }

      return [...current, slug];
    });
  };

  const removeSelection = (slug: string) => {
    setSelection((current) => current.filter((item) => item !== slug));
  };

  const clearSelection = () => {
    setSelection([]);
  };

  return {
    selection,
    toggleSelection,
    removeSelection,
    clearSelection,
  };
}
