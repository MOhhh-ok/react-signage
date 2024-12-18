import { CSSProperties, useEffect, useRef, useState } from "react";

const ContainerBaseStyle: CSSProperties = {
    background: "black",
    width: '300px',
    height: '200px',
}

const FallbackFullscreenStyle: CSSProperties = {
    position: 'fixed',
    margin: 0,
    padding: 0,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
    zIndex: 1000,
};

export function Container(props: { play: boolean, fullScreen: boolean, style?: CSSProperties, children: React.ReactNode }) {
    const { fullScreen, style, play, children } = props;
    const containerRef = useRef<HTMLDivElement>(null);
    const [fallbackStyle, setFallbackStyle] = useState<CSSProperties>({});

    useEffect(() => {
        handleFullScreen();
    }, [fullScreen, play]);

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