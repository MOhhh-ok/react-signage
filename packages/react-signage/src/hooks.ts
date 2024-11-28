import { useContext } from 'react';
import {
    DebugContext,
    SignageContext,
    SingleSlideContext,
    SlideContext,
} from './contexts';

export function useDebug() {
    return useContext(DebugContext);
}

export function useSignage() {
    return useContext(SignageContext);
}

export function useSlide() {
    return useContext(SlideContext);
}

export function useSingleSlide() {
    return useContext(SingleSlideContext);
}
