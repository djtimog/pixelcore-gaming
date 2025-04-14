import { useIsMobile } from "@/hooks/use-mobile";

export const getSliceNumber = () => (useIsMobile() ? 15 : 30);