import { useEffect, useRef } from "react";
import { useSwiper, useSwiperSlide } from "swiper/react";

export function VideoSlide(props: { src: string }) {
    const { src } = props;
    const swiper = useSwiper();
    const slide = useSwiperSlide();
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (!slide.isActive) return;
        console.log('play video', src)
        videoRef.current?.play();
    }, [slide.isActive, src]);

    function onEnded() {
        swiper.slideNext();
    }

    return <>
        <video src={src} onEnded={onEnded} ref={videoRef} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
    </>
}