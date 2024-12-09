import { useContext } from 'react';
import { DebugContext } from './DebugContext';

export function useDebug() {
    return useContext(DebugContext);
}
