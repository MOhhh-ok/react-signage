import { useEffect } from "react";

type Props = {
    onFullScreenChange?: (fullScreen: boolean) => void;
}

export function FullScreenListener(props: Props) {
    const { onFullScreenChange } = props;

    useEffect(() => {
        const fullscreenchanged = () => {
            const isFullScreen = !!document.fullscreenElement;
            onFullScreenChange?.(isFullScreen);
        }
        window.addEventListener('fullscreenchange', fullscreenchanged);
        return () => window.removeEventListener('fullscreenchange', fullscreenchanged);
    });

    return null;
}