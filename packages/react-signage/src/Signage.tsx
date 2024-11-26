import { CSSProperties, useEffect, useRef } from "react";
import { DefaultSize, FallbackFullscreenStyle } from "./consts.js";
import { useSignage } from "./hooks.js";
import { SlideProvider } from "./providers/SlideProvider.js";
import { Slide } from "./slides/Slide.js";

export type SignageProps = {
    width?: number;
    height?: number;
};

export function Signage(props: SignageProps) {
    const { width: _width, height: _height } = props;
    const { providerProps, currentItem, currentIndex } = useSignage();
    const { onFullscreenStateChange, fullScreen, items, play, onSlideChange } = providerProps;
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        ref.current?.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => ref.current?.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    useEffect(() => {
        if (!play) return;
        if (fullScreen && document.fullscreenEnabled) {
            ref.current?.requestFullscreen();
        }
    }, [fullScreen, play]);

    function handleFullscreenChange() {
        if (document.fullscreenElement) {
            onFullscreenStateChange?.(true);
        } else {
            onFullscreenStateChange?.(false);
        }
    }

    let width = 0;
    let height = 0;
    if (!fullScreen) {
        width = _width ?? DefaultSize.width;
        height = _height ?? DefaultSize.height;
    }

    const baseStyle: CSSProperties = { background: "black", position: "relative", overflow: 'hidden' }
    const additionalStyle: CSSProperties = play && fullScreen && !document.fullscreenEnabled ? FallbackFullscreenStyle : {}

    return <>
        <div ref={ref} style={{ ...baseStyle, width, height, maxWidth: width, maxHeight: height, ...additionalStyle }}>
            {items.map((item, index) => {
                return <SlideProvider key={index} item={item} index={index}>
                    <Slide />
                </SlideProvider>
            }
            )}
        </div>
    </>
};

