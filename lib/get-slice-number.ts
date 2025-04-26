'use client'
import { useIsMobile } from "@/hooks/use-mobile";

export const getSliceNumber = () => {return(useIsMobile() ? 15 : 30)};