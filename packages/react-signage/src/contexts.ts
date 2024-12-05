import { createContext, Dispatch, SetStateAction } from 'react';
import { SignageProviderProps } from './providers/SignageProvider';
import { DebugData, SignageItem } from './types';

export type DebugContextType = {
    debug: boolean;
    debugMessage: (data: DebugData) => void;
};

type SignageContextType = {
    providerProps: Omit<SignageProviderProps, 'children'>;
    currentIndex: number;
    currentItem: SignageItem;
    advanceNext: () => void;
};

type SlideContextType = {
    isActive: boolean;
    item: SignageItem;
    index: number;
    fadeSpring: {};
};

type SingleSlideContextType = {
    item: SignageItem;
    index: number;
};

export const DebugContext = createContext<DebugContextType>({
    debug: false,
    debugMessage: () => {},
});
export const SignageContext = createContext<SignageContextType>(null!);
export const SlideContext = createContext<SlideContextType>(null!);
export const SingleSlideContext = createContext<SingleSlideContextType>(null!);
