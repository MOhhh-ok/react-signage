import { createContext, ReactNode, useContext } from 'react';
import { SignageItem } from '../types.js';

export type PreloaderStatus = 'pending' | 'processing' | 'finished';

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

export function usePreloaderContext() {
    const context = useContext(PreloaderContext);
    if (!context) {
        throw new Error('usePreloaderContext must be used within a Preloader');
    }
    return context;
}
