"use client";

import { useEffect, useMemo, useState } from "react";
import { Language, translate } from "@/src/lib/i18n";

export function useLanguage() {
  const [lang, setLang] = useState<Language>("es");

  useEffect(() => {
    const stored = window.localStorage.getItem("language");
    if (!stored) {
      window.localStorage.setItem("language", "es");
      return;
    }
    if (stored === "es" || stored === "en" || stored === "fr") {
      setLang(stored);
    }
  }, []);

  const t = useMemo(() => {
    return (key: string) => translate(lang, key);
  }, [lang]);

  const selectLanguage = (next: Language) => {
    window.localStorage.setItem("language", next);
    window.location.reload();
  };

  return { lang, t, selectLanguage };
}
