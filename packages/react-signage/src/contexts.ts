import { createContext, useContext } from 'react';
import { SignageItem } from './types';
import { SignageProviderProps } from './providers/SignageProvider';
import { SpringValues } from '@react-spring/web';

export type DebugContextType = { debug: boolean };

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

export const DebugContext = createContext<DebugContextType>({ debug: false });
export const SignageContext = createContext<SignageContextType>(null!);
export const SlideContext = createContext<SlideContextType>(null!);
export const SingleSlideContext = createContext<SingleSlideContextType>(null!);
