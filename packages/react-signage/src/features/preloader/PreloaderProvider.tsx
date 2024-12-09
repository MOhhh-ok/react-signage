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
    const [status, setStatus] = useState<PreloaderStatus>('pending');
    const [message, setMessage] = useState<ReactNode>();

    useEffect(() => {
        setStatus('processing');
    }, []);

    useEffect(() => {
        onStateChange?.(status);
    }, [status]);

    useEffect(() => {
    }, [currentIndex]);

    function advance() {
        setCurrentIndex(prevIndex => {
            const newIndex = prevIndex + 1;
            if (newIndex >= items.length) {
                setMessage('preload finished');
                setStatus('finished');
            }
            return newIndex;
        });
    }

    return (
        <PreloaderContext.Provider value={{ items, currentIndex, advance, status, setStatus, message, setMessage }}>
            {children}
        </PreloaderContext.Provider>
    );
}