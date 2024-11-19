import { useEffect, useRef } from "react";
import { EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ImageSlide } from "./ImageSlide.js";
import './styles/style.css';
import { SignageItem } from "./types.js";
import { VideoSlide } from "./VideoSlide.js";

const DefaultSize = {
    width: 300,
    height: 200,
}

export type SignageProps = {
    play: boolean,
    items: SignageItem[],
    fullScreen?: boolean,
    onFullscreenStateChange?: (fullscreen: boolean) => void,
    width?: number,
    height?: number,
}

export function Signage(props: SignageProps) {
    const { play, items, width: _width, height: _height, fullScreen, onFullscreenStateChange } = props;
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!play) return;
        if (fullScreen) ref.current?.requestFullscreen();
        ref.current?.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
            ref.current?.removeEventListener('fullscreenchange', handleFullscreenChange);
        }
    }, [fullScreen, play]);

    function handleFullscreenChange() {
        if (document.fullscreenElement) {
            onFullscreenStateChange?.(true);
        } else {
            onFullscreenStateChange?.(false);
        }
    }

    useEffect(() => {
        if (!play) return;
        console.log('play items', items)
    }, [play]);

    let width = 0;
    let height = 0;
    if (!fullScreen) {
        width = _width ?? DefaultSize.width;
        height = _height ?? DefaultSize.height;
    }

    return <>
        <div ref={ref} style={{ width, height, maxWidth: width, maxHeight: height, background: "black", position: "relative" }}>
            <Swiper
                style={{ width: "100%", height: "100%" }}
                modules={[EffectFade]}
                onSlideChange={(swiper) => console.log('slide change to', swiper.activeIndex)}
                onSwiper={(swiper) => console.log(swiper)}
                effect="fade"
                fadeEffect={{
                    crossFade: true,
                }}
                loop={true}
            >
                {play && <>
                    {items.map((item, index) => <SwiperSlide key={index}>
                        <Item {...item} />
                    </SwiperSlide>)}
                </>}
            </Swiper>
        </div>
    </>
};

function Item(props: SignageItem) {
    const { type } = props;
    return <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        {type === "image" && <ImageSlide {...props} />}
        {type === "video" && <VideoSlide {...props} />}
    </div>
}

