import { createContext, useContext } from 'react';
import { SignageItem } from './types';
import { SignageProviderProps } from './providers/SignageProvider';
import { SpringValues } from '@react-spring/web';

type DebugContextType = { debug: boolean };

type SignageContextType = {
    providerProps: Omit<SignageProviderProps, 'children'>;
    currentIndex: number;
    currentItem: SignageItem | null;
    advanceNext: () => void;
};

type SignageSlideContextType = {
    isActive: boolean;
    item: SignageItem;
    index: number;
    fadeSpring: {};
};

export const DebugContext = createContext<DebugContextType>({ debug: false });
export const SignageContext = createContext<SignageContextType>(null!);
export const SignageSlideContext = createContext<SignageSlideContextType>(
    null!
);
