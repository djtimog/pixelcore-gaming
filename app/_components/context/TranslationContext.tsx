"use client";
import { toast } from "@/hooks/use-toast";
import { createContext, useState, useEffect, ReactNode } from "react";

interface TranslationContextType {
  language: string;
  languageLoading: boolean;
  handleLanguageChange: (langTo: string) => void;
}

export const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<string>("en"); 
  const [languageLoading, setLanguageLoading] = useState<boolean>(false);

  useEffect(() => {
    const storedOriginalText = localStorage.getItem("originalText");
    if (!storedOriginalText) {
      saveOriginalText();
    }
  }, []);

  // Save all translatable text to local storage on first load
  const saveOriginalText = () => {
    const elements = document.querySelectorAll("[data-translate]");
    const textMap: Record<string, string> = {};

    elements.forEach((el, index) => {
      textMap[`text_${index}`] = el.textContent?.trim() || "";
    });

    localStorage.setItem("originalText", JSON.stringify(textMap));
  };

  const fetchTranslations = async (langTo: string) => {
    setLanguageLoading(true);

    if (langTo === language) {
      setLanguageLoading(false);
      return;
    }

    const storedOriginalText = localStorage.getItem("originalText");
    if (!storedOriginalText) {
      toast({
        title: "Error",
        description: "Original text not found. Try refreshing.",
        variant: "destructive",
      });
      setLanguageLoading(false);
      return;
    }

    if (langTo === "en") {
      // Restore English text from localStorage instead of making API call
      updatePageText(JSON.parse(storedOriginalText));
      setLanguage("en");
      setLanguageLoading(false);
      return;
    }

    const originalText = JSON.parse(storedOriginalText);
    const cachedTranslations = JSON.parse(localStorage.getItem(`translations_${langTo}`) || "{}");

    const translatedText: Record<string, string> = { ...cachedTranslations };
    const missingKeys = Object.keys(originalText).filter(key => !cachedTranslations[key]);

    if (missingKeys.length === 0) {
      updatePageText(translatedText);
      setLanguage(langTo);
      setLanguageLoading(false);
      return;
    }

    try {
      for (const key of missingKeys) {
        const text = encodeURIComponent(originalText[key]);
        const request = `https://api.mymemory.translated.net/get?q=${text}&langpair=en|${langTo}`;
        const response = await fetch(request);
        const data = await response.json();

        translatedText[key] = data.responseData.translatedText || originalText[key];
      }

      localStorage.setItem(`translations_${langTo}`, JSON.stringify(translatedText));
      updatePageText(translatedText);
      setLanguage(langTo);
    } catch (error) {
      toast({
        title: "Language Change Failed",
        description: `Error fetching translation: ${error}`,
        variant: "destructive",
      });
    } finally {
      setLanguageLoading(false);
    }
  };

  const updatePageText = (translatedText: Record<string, string>) => {
    const elements = document.querySelectorAll("[data-translate]");
    elements.forEach((el, index) => {
      el.textContent = translatedText[`text_${index}`] || el.textContent;
    });
  };

  const handleLanguageChange = (langTo: string) => {
    if (langTo !== language) {
      fetchTranslations(langTo);
    }
  };

  return (
    <TranslationContext.Provider value={{ language, languageLoading, handleLanguageChange }}>
      {children}
    </TranslationContext.Provider>
  );
};
