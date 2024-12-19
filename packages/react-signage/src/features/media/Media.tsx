import { forwardRef, useRef } from "react";
import { MediaRef } from "./types";
import { Img } from "./Img";
import { Video } from "./Video";

interface Props {

}

export const Media = forwardRef<MediaRef, Props>(function Media(props, ref) {
    const imgRef = useRef<HTMLImageElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    return <>
        {/* <Img
            ref={imgRef}
            style={{
                ...ItemBaseStyle,
                ...fadeInSpring,
            }}
        />
        <Video
            ref={videoRef}
            style={{
                ...ItemBaseStyle,
                ...fadeInSpring,
            }}
            onEnded={advanceNext}
            muted={mute}
        /> */}
    </>
});
