import { animated } from '@react-spring/web';
import { useEffect, useRef } from "react";
import { useDebug, useSignage, useSignageSlide } from "../hooks.js";
import { SignageVideo } from "../types.js";

export function VideoSlide() {
    const { item, index, isActive, fadeSpring } = useSignageSlide();
    const { src } = item as SignageVideo;
    const { providerProps, advanceNext, } = useSignage();
    const { onSlideChange, fadeDuration, play, mute } = providerProps;
    const videoRef = useRef<HTMLVideoElement>(null);
    const { debug } = useDebug();

    useEffect(() => {
        if (play) {
            // Get User Interaction
            videoRef.current?.play();
            videoRef.current?.pause();
        }
    }, [play]);

    useEffect(() => {
        if (!isActive) {
            videoRef.current?.pause();
        }
        else {
            onSlideChange?.({ item, index });
            if (!videoRef.current) return;
            videoRef.current.currentTime = 0;
            videoRef.current.play();
        }
    }, [isActive]);

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
            playsInline
            autoPlay={play}
            muted={mute}
        />
    </>
}