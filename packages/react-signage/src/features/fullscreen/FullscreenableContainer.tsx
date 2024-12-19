import { CSSProperties, useEffect, useRef, useState } from "react";
import { FallbackFullscreenStyle, ContainerBaseStyle } from "./consts";

interface Props {
    play: boolean,
    fullScreen: boolean,
    style?: CSSProperties,
    onFullscreenChange?: (fullscreen: boolean) => void;
    children: React.ReactNode,
}

export function FullscreenableContainer(props: Props) {
    const { fullScreen, style, play, children, onFullscreenChange } = props;
    const containerRef = useRef<HTMLDivElement>(null);
    const [fallbackStyle, setFallbackStyle] = useState<CSSProperties>({});

    useEffect(() => {
        handleFullScreen();
    }, [fullScreen, play]);

    useEffect(() => {
        const fullscreenchanged = () => {
            const isFullScreen = !!document.fullscreenElement;
            onFullscreenChange?.(isFullScreen);
        }
        window.addEventListener('fullscreenchange', fullscreenchanged);
        return () => window.removeEventListener('fullscreenchange', fullscreenchanged);
    });

    function handleFullScreen() {
        if (fullScreen && play) {
            if (document.fullscreenEnabled) {
                containerRef.current?.requestFullscreen();
            } else {
                setFallbackStyle(FallbackFullscreenStyle);
            }
        } else {
            if (document.fullscreenEnabled && document.fullscreenElement) {
                document.exitFullscreen?.();
            } else {
                setFallbackStyle({});
            }
        }
    }
    return <div ref={containerRef} style={{ ...ContainerBaseStyle, ...style, ...fallbackStyle }}>
        {children}
    </div>
}