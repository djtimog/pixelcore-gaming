"use client";
import React, { useContext } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { ExpandMore } from "@mui/icons-material";
import { TranslationContext } from "@/app/_components/context/TranslationContext";
import { Loader } from "lucide-react";

const LanguageButton = () => {
  const translationContext = useContext(TranslationContext);

  if (!translationContext) return null;

  const { language, languageLoading, handleLanguageChange } =
    translationContext;

    if(languageLoading){
        return(
            <Loader className="animate-spin" />
        )
    }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <p className="hover:text-[#14C570] flex items-center space-x-1 border-[0px] p-1">
          <ExpandMore />
          <span className="font-medium">{language.toLocaleUpperCase()}</span>
        </p>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="absolute w-max">
        {["en", "fr", "es", "de"].map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => handleLanguageChange(lang)}
            className="max-w-max"
          >
            {lang.toLocaleUpperCase()}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageButton;
//     {
//         //  ?
//            :
//     null
// }
