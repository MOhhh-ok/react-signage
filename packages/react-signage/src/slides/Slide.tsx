import { useSlide } from "../hooks";
import { ImageSlide } from "./ImageSlide";
import { VideoSlide } from "./VideoSlide";

export function Slide() {
    const { item, index } = useSlide();
    const { type } = item;
    return <div style={{ position: "absolute", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        {type === "image" && <ImageSlide />}
        {type === "video" && <VideoSlide />}
    </div>
}
