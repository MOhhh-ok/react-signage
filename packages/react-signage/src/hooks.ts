import { useContext } from 'react';
import { DebugContext, SignageContext, SignageSlideContext } from './contexts';

export function useDebug() {
    return useContext(DebugContext);
}

export function useSignage() {
    return useContext(SignageContext);
}

export function useSignageSlide() {
    return useContext(SignageSlideContext);
}
