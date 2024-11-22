import { ReactNode, useEffect, useRef, useState } from "react";
import { SignageItem } from "../types.js";
import { PreloaderContext, PreloaderStatus, usePreloaderContext } from "./hooks.js";

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

function PreloaderImage({ src }: { src: string }) {
    const { advance, setMessage } = usePreloaderContext();

    useEffect(() => {
        setMessage(`loading image ${src}`);
    }, []);

    function handleLoad() {
        advance();
    }

    return <img
        src={src}
        onLoad={handleLoad}
        style={{ width: '100%', height: '100%', objectFit: "contain" }}
    />;
}

function PreloaderVideo({ src }: { src: string }) {
    const { advance, setMessage } = usePreloaderContext();
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        setMessage(`loading video ${src}`);
        const intervalId = setInterval(() => {
            interval();
        }, 1000);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    function interval() {
        const video = videoRef.current;
        if (!video) return;

        const buffered = video.buffered;

        if (buffered.length > 0) {
            const bufferedEnd = buffered.end(buffered.length - 1);
            const duration = video.duration;
            const percentLoaded = (bufferedEnd / duration) * 100;
            video.currentTime = bufferedEnd;

            setMessage(`Loading: ${Math.round(percentLoaded)}%`);

            // 完全に読み込まれた場合
            if (bufferedEnd === duration) {
                advance();
            }
        }
    }

    return (
        <video
            src={src}
            preload="auto"
            style={{ width: '100%', height: '100%' }}
            ref={videoRef}
        />
    );
}
