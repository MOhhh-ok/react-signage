import { useEffect, useState } from "react";
import { useSwiper, useSwiperSlide } from "swiper/react";

export function ImageSlide(props: { src: string, second: number }) {
    const { src, second } = props;
    const swiper = useSwiper();
    const slide = useSwiperSlide();
    const [key, setKey] = useState('');

    useEffect(() => {
        if (!slide.isActive) return;
        setKey(Math.random().toString(36).substring(2, 15)); // アニメーションリセットのため
        console.log('show image', src)
        setTimeout(() => {
            swiper.slideNext();
        }, second * 1000);
    }, [slide.isActive, src, second]);

    return <img
        src={src}
        key={key}
        style={{
            width: "100%", height: "100%", objectFit: "contain", objectPosition: "center",
            animation: `zoomIn ${second}s forwards`
        }} />
}