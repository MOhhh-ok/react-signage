import { useContext } from 'react';
import { PreloaderContext } from './contexts';

export function usePreloader() {
    const context = useContext(PreloaderContext);
    if (!context) {
        throw new Error('usePreloaderContext must be used within a Preloader');
    }
    return context;
}
