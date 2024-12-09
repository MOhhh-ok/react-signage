import { createContext } from 'react';
import { DebugData } from './types';

export type DebugContextType = {
    debug: boolean;
    debugMessage: (data: DebugData) => void;
};

export const DebugContext = createContext<DebugContextType>({
    debug: false,
    debugMessage: () => {},
});
