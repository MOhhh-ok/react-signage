import { animated } from '@react-spring/web';
import { useEffect, useRef } from "react";
import { useDebug, useSignage, useSignageSlide } from "../hooks.js";
import { SignageVideo } from "../types.js";

export function VideoSlide() {
    const { item, index, isActive, fadeSpring } = useSignageSlide();
    const { src } = item as SignageVideo;
    const { providerProps, advanceNext } = useSignage();
    const { onSlideChange, fadeDuration } = providerProps;
    const videoRef = useRef<HTMLVideoElement>(null);
    const { debug } = useDebug();

    useEffect(() => {
        const timer = setInterval(interval, 1000);
        interval();
        return () => clearInterval(timer);
    }, [isActive, videoRef.current, debug]);

    function interval() {
        if (!isActive) return;
        videoRef.current?.play();
    }

    useEffect(() => {
        onSlideChange?.({ item, index });
        if (!videoRef.current) return;
        if (!isActive) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
    }, [isActive, src]);

    function onEnded() {
        advanceNext();
    }

    return <>
        <animated.video
            src={src}
            onEnded={onEnded}
            ref={videoRef}
            style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                ...fadeSpring
            }}
        />
    </>
}