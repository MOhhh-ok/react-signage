import { useEffect, useMemo, useState } from "react";
import { DefaultFadeDuration } from "../consts";
import { SignageContext } from "../contexts";
import { SignageItem } from "../types";
import { useDebug } from "../hooks";

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

export function SignageProvider(props: SignageProviderProps) {
    const providerProps = useMemo(() => initProps(props), [props]);

    const { items, children } = providerProps;
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const currentItem = items[currentIndex];
    const { debug } = useDebug();

    useEffect(() => {
        if (debug) console.log('items length changed', { length: items.length });
        if (items.length === 0) return;
        setCurrentIndex(0);
    }, [items.length]);

    useEffect(() => {
        if (debug) console.log('currentItem changed', currentItem);
    }, [currentIndex]);

    function advanceNext() {
        setCurrentIndex(prev => {
            const newIndex = prev + 1;
            const result = items.length <= newIndex ? 0 : newIndex;
            if (debug) console.log('advanceNext', `${result} / ${items.length - 1}`);
            return result;
        });
    }

    return <SignageContext.Provider value={{ providerProps, advanceNext, currentIndex, currentItem }}>
        {children}
    </SignageContext.Provider>
}

function initProps(props: SignageProviderProps): SignageProviderProps {
    // console.log('initProps');
    return {
        ...props,
        fadeDuration: props.fadeDuration ?? DefaultFadeDuration
    }
}