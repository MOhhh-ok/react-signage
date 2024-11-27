import { useEffect, useState } from "react";
import { DefaultFadeDuration } from "../consts";
import { SignageContext } from "../contexts";
import { SignageItem } from "../types";

export type SignageProviderProps = {
    items: SignageItem[];
    play: boolean;
    fullScreen: boolean;
    onFullscreenStateChange?: (fullscreen: boolean) => void;
    onSlideChange?: (params: { item: SignageItem; index: number }) => void;
    fadeDuration?: number;
    children: React.ReactNode;
    mute?: boolean;
}

export function SignageProvider(providerProps: SignageProviderProps) {
    providerProps = initProps(providerProps);

    const { items, children } = providerProps;
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const currentItem = items[currentIndex];

    useEffect(() => {
        if (items.length === 0) return;
        setCurrentIndex(0);
    }, [items.length]);

    function advanceNext() {
        setCurrentIndex(prev => {
            const newIndex = prev + 1;
            return items.length <= newIndex ? 0 : newIndex;
        });
    }

    return <SignageContext.Provider value={{ providerProps, advanceNext, currentIndex, currentItem }}>
        {children}
    </SignageContext.Provider>
}

function initProps(providerProps: SignageProviderProps): SignageProviderProps {
    return { ...providerProps, fadeDuration: providerProps.fadeDuration ?? DefaultFadeDuration }
}