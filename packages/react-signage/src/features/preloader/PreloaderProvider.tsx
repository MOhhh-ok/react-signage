import { SignageItem } from "@/types";
import { ReactNode, useEffect, useState } from "react";
import { PreloaderContext } from "./contexts";
import { PreloaderStatus } from "./types";

export type PreloaderProviderProps = {
    items: SignageItem[];
    onStateChange?: (status: PreloaderStatus) => void;
    children: ReactNode;
};

export function PreloaderProvider(props: PreloaderProviderProps) {
    const { items, children, onStateChange } = props;
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [status, setStatus] = useState<PreloaderStatus>({ type: 'pending' });

    useEffect(() => {
        onStateChange?.(status);
    }, [status]);

    useEffect(() => {
    }, [currentIndex]);

    function advance() {
        setCurrentIndex(prevIndex => {
            const newIndex = prevIndex + 1;
            if (newIndex >= items.length) {
                setStatus({ type: 'finished' });
                console.log('preload finished');
            } else {
                console.log('preload advance to ', newIndex);
            }
            return newIndex;
        });
    }

    return (
        <PreloaderContext.Provider value={{ items, currentIndex, advance, status, setStatus, }}>
            {children}
        </PreloaderContext.Provider>
    );
}