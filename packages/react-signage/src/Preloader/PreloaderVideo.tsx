import { useEffect, useRef } from "react";
import { usePreloaderContext } from "./hooks.js";

const INTERVAL_MS = 1000;

export function PreloaderVideo({ src }: { src: string }) {
    const { advance, setMessage } = usePreloaderContext();
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        setMessage(`loading video ${src}`);
        const intervalId = setInterval(interval, INTERVAL_MS);
        return () => clearInterval(intervalId);
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

    function handleLoadedData() {
        interval();
    }

    return (
        <video
            src={src}
            preload="auto"
            onLoadedData={handleLoadedData}
            style={{ width: '100%', height: '100%' }}
            ref={videoRef}
        />
    );
}
