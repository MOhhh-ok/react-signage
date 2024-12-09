import { SignageItem } from "@/types";
import { ReactNode, createContext } from "react";
import { PreloaderStatus } from "./types";

type ContextType = {
    items: SignageItem[];
    currentIndex: number;
    advance: () => void;

    status: PreloaderStatus;
    message: ReactNode;

    setStatus: (status: PreloaderStatus) => void;
    setMessage: (message: string) => void;
};

export const PreloaderContext = createContext<ContextType>(null!);
