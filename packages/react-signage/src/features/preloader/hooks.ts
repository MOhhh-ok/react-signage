import { createContext, ReactNode, useContext } from 'react';
import { SignageItem } from '../../types';
import { PreloaderContext } from './contexts';

export function usePreloaderContext() {
    const context = useContext(PreloaderContext);
    if (!context) {
        throw new Error('usePreloaderContext must be used within a Preloader');
    }
    return context;
}
