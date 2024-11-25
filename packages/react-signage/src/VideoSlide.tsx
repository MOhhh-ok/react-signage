import { useEffect, useRef } from "react";
import { useSwiper, useSwiperSlide } from "swiper/react";
import { SignageVideo } from "./types.js";
import { useSignage } from "./Signage.js";

export function VideoSlide(props: { item: SignageVideo, index: number }) {
    const { item, index } = props;
    const { src } = item;
    const swiper = useSwiper();
    const slide = useSwiperSlide();
    const { props: { onSlideChange } } = useSignage();
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const timer = setInterval(interval, 1000);
        return () => clearInterval(timer);
    }, [slide.isActive]);

    function interval() {
        if (!slide.isActive) return;
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
        <video src={src} onEnded={onEnded} ref={videoRef} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
    </>
}