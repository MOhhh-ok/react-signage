import { useEffect, useRef } from "react";
import 'swiper/css';
import 'swiper/css/effect-fade';
import { EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ImageSlide } from "./ImageSlide.js";
import './styles/style.css';
import { SignageItem } from "./types.js";
import { VideoSlide } from "./VideoSlide.js";

export type SignageProps = {
    play: boolean,
    items: SignageItem[],
    fullScreen?: boolean,
    width: number,
    height: number,
}

export function Signage(props: SignageProps) {
    const { play, items, width, height, fullScreen } = props;
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (fullScreen) ref.current?.requestFullscreen();
    }, [fullScreen, play]);

    return <>
        <div ref={ref} style={{ width, height, maxWidth: width, maxHeight: height, background: "black" }}>
            <Swiper
                style={{ width: "100%", height: "100%" }}
                modules={[EffectFade]}
                onSlideChange={() => console.log('slide change')}
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

