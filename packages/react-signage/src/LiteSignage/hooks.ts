import { useRef } from 'react';
import { LiteSignageRefType } from './types';

export function useLiteSignage() {
    const ref = useRef<LiteSignageRefType>(null);
    return { ref };
}
