import { animated, easings, useSpring } from "@react-spring/web";
import { CSSProperties, useEffect } from "react";
import { useSignage, useSignageSlide } from "../hooks.js";
import { SignageImage } from "../types.js";

const BaseStyle: CSSProperties = { width: "100%", height: "100%", objectFit: "contain", objectPosition: "center" }

export function ImageSlide() {
    const { item, index } = useSignageSlide();
    const { src, second, animation } = item as SignageImage;
    const { fromScale, toScale } = animation || {};
    const { providerProps, advanceNext } = useSignage();
    const { onSlideChange } = providerProps;
    const { isActive, fadeSpring } = useSignageSlide();
    const [zoomInSpring, zoomInApi] = useSpring(() => ({
        from: { scale: fromScale ?? 1 },
        to: { scale: toScale ?? 1.2 },
        config: { duration: second * 1000, easing: easings.easeInOutSine }
    }));

    useEffect(() => {
        if (!isActive) return;
        console.log('useractivation', navigator.userActivation)
        onSlideChange?.({ item, index });
        setTimeout(() => {
            advanceNext();
        }, second * 1000);
    }, [isActive, src, second]);

    useEffect(() => {
        if (!isActive) return;
        if (animation?.type === 'zoomIn') {
            zoomInApi.start({ reset: true });
        }
    }, [isActive]);

    return <animated.img
        src={src}
        style={{
            ...BaseStyle,
            ...fadeSpring,
            ...zoomInSpring
        }} />
}