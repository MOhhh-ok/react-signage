import { ReactNode, useEffect, useRef, useState } from "react";
import { SignageItem } from "../types.js";
import { PreloaderContext, PreloaderStatus, usePreloaderContext } from "./hooks.js";
import { PreloaderVideo } from "./PreloaderVideo.js";
import { PreloaderImage } from "./PreloaderImage.js";

type PreloaderProps = {
    items: SignageItem[];
    onStateChange?: (status: PreloaderStatus) => void;
    children: ReactNode;
};

export function PreloaderProvider(props: PreloaderProps) {
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

export function PreloaderMessage() {
    const { message } = usePreloaderContext();
    return <div>{message}</div>;
}

export function PreloaderMedia() {
    const { items, currentIndex } = usePreloaderContext();

    const type = items[currentIndex]?.type;

    switch (type) {
        case 'image':
            return <PreloaderImage src={items[currentIndex].src} />;
        case 'video':
            return <PreloaderVideo src={items[currentIndex].src} />;
        default:
            return null;
    }
}


