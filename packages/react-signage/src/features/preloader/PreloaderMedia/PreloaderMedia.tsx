import { usePreloader } from "../hooks";
import { PreloaderImage } from "./PreloaderImage";
import { PreloaderVideo } from "./PreloaderVideo";

const DEFAULT_WIDTH = 300;
const DEFAULT_HEIGHT = 200;

export type PreloaderMediaProps = {
    width?: number;
    height?: number;
}

export function PreloaderMedia(props: PreloaderMediaProps) {
    const { width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT } = props;
    const { items, currentIndex } = usePreloader();

    const item = items[currentIndex];
    if (!item) return null;

    const type = item.type;

    return <div style={{ maxWidth: width, maxHeight: height, width, height }}>
        {type == 'image' && <PreloaderImage src={item.src} />}
        {type == 'video' && <PreloaderVideo src={item.src} />}
    </div>
}