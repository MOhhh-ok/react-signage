import { SignageItem } from "@/types";
import { ReactNode, createContext } from "react";
import { PreloaderStatus } from "./types";

type ContextType = {
    items: SignageItem[];
    currentIndex: number;
    advance: () => void;

    status: PreloaderStatus;
    setStatus: (status: PreloaderStatus) => void;
};

export const PreloaderContext = createContext<ContextType>(null!);
