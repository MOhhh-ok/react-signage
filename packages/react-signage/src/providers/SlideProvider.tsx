import { useSpring, easings } from "@react-spring/web";
import { useEffect } from "react";
import { SlideContext } from "../contexts";
import { useSignage } from "../hooks";
import { SignageItem } from "../types";

type SlideProviderProps = {
    item: SignageItem;
    index: number;
    children: React.ReactNode;
}

export function SlideProvider(props: SlideProviderProps) {
    const { item, index, children } = props;
    const { providerProps, currentIndex } = useSignage();
    const { play, fadeDuration } = providerProps
    const isActive = (play && currentIndex === index);

    const [fadeSpring, fadeApi] = useSpring(() => ({ from: { opacity: 0 }, config: { duration: 0 } }));

    useEffect(() => {
        const fromOpacity = isActive ? 0 : 1;
        const toOpacity = isActive ? 1 : 0;
        fadeApi.start({
            from: {
                opacity: fromOpacity,
            },
            to: {
                opacity: toOpacity,
            },
            config: { duration: fadeDuration }
        })
    }, [isActive, fadeApi]);


    return <SlideContext.Provider key={index} value={{ isActive, item, index, fadeSpring }}>
        {children}
    </SlideContext.Provider>
}