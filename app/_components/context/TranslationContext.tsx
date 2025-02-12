"use client";
import { toast } from "@/hooks/use-toast";
import { createContext, useState, ReactNode } from "react";

interface TranslationContextType {
  language: string;
  languageLoading: boolean;
  handleLanguageChange: (langTo: string) => void;
}

export const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider = ({ children }: { children: ReactNode }) => {

  const [language, setLanguage] = useState<string>("en"); 
  const [languageLoading, setLanguageLoading] = useState<boolean>(false);

  const fetchTranslations = async (langTo: string) => {
    setLanguageLoading(true);
    if (langTo === language) return;

    const elements = document.querySelectorAll("[data-translate]");
    const textMap: Record<string, string> = {};
  
    elements.forEach((el, index) => {
      textMap[`text_${index}`] = el.textContent?.trim() || "";
    });
  
    if (Object.keys(textMap).length === 0) return;

    try {
      const translatedText: Record<string, string> = {};
  
      for (const key in textMap) {
        const text = encodeURIComponent(textMap[key]);

        const request = `https://api.mymemory.translated.net/get?q=${text}&langpair=${language}|${langTo}`;
        const response = await fetch(request);

        const data = await response.json();
  
        if (data.matches && data.matches.length > 0) {
            translatedText[key] = data.matches[0].translation;
          } else {
            translatedText[key] = data.responseData.translatedText; 
          }
      }
  
      updatePageText(translatedText);
      toast({
        title: "Language Change",
        description: `Language changed successfully`,
      });
      setLanguage(langTo);
      setLanguageLoading(false);
    } catch (error) {
      toast({
        title: "Language Change",
        description: `Failed to fetch language: ${error}`,
        variant: "destructive",
      });
      setLanguageLoading(false)
      console.error("Translation failed:", error);
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
        fetchTranslations(langTo); // Call translation function here!
    }
  };

  return (
    <TranslationContext.Provider value={{ language, languageLoading, handleLanguageChange }}>
      {children}
    </TranslationContext.Provider>
  );
};
