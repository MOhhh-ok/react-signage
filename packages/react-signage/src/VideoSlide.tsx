import { useEffect, useRef, useState } from "react";
import { useSwiper, useSwiperSlide } from "swiper/react";
import { SignageVideo } from "./types.js";
import { useSignage } from "./Signage.js";
import { useDebug } from "./hooks.js";
import { generateKey } from "./utils.js";

export function VideoSlide(props: { item: SignageVideo, index: number }) {
    const { item, index } = props;
    const { src } = item;
    const swiper = useSwiper();
    const slide = useSwiperSlide();
    const { props: { onSlideChange } } = useSignage();
    const videoRef = useRef<HTMLVideoElement>(null);
    const { debug } = useDebug();
    const [key, setKey] = useState('');

    useEffect(() => {
        const timer = setInterval(interval, 300);
        interval();
        return () => clearInterval(timer);
    }, [slide.isActive, videoRef.current, debug]);

    useEffect(() => {
        setKey(generateKey()); // Prevent unexpected video stops
    }, [slide.isActive]);

    function interval() {
        if (!slide.isActive) return;
        // if (debug) console.log('trying to play', item, slide, videoRef.current);
        // Prevent unexpected video stops by forcing play
        videoRef.current?.play();
    }

    useEffect(() => {
        if (!slide.isActive) return;
        onSlideChange?.({ item, index });
        videoRef.current?.play();
    }, [slide.isActive, src]);

    function onEnded() {
        swiper.slideNext();
    }

    return <>
        <video key={key} src={src} onEnded={onEnded} ref={videoRef} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
    </>
}