import { usePreloader } from "../hooks";
import { PreloaderImage } from "./PreloaderImage";
import { PreloaderVideo } from "./PreloaderVideo";

export function PreloaderMedia() {
    const { items, currentIndex } = usePreloader();

    const type = items[currentIndex]?.type;

    switch (type) {
        case 'image':
            return <PreloaderImage src={items[currentIndex].src} />;
        case 'video':
            return <PreloaderVideo src={items[currentIndex].src} />;
        default:
            return null;
    }
}


