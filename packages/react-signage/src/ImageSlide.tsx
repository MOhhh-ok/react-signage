import { useEffect, useState } from "react";
import { useSwiper, useSwiperSlide } from "swiper/react";

export function ImageSlide(props: { src: string, second: number }) {
    const { src, second } = props;
    const swiper = useSwiper();
    const slide = useSwiperSlide();
    const [key, setKey] = useState('');

    useEffect(() => {
        if (!slide.isActive) return;
        setKey(Math.random().toString(36).substring(2, 15)); // For reset animation
        setTimeout(() => {
            swiper.slideNext();
        }, second * 1000);
    }, [slide.isActive, src, second]);

    if (!slide.isActive) return null;

    return <img
        src={src}
        key={key}
        style={{
            width: slide.isActive ? "100%" : "10px", // Prevent overflow from other slides
            height: slide.isActive ? "100%" : "10px",
            objectFit: "contain", objectPosition: "center",
            animation: `zoomIn ${second}s forwards`
        }} />
}