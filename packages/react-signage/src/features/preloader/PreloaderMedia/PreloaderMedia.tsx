import { usePreloader } from "../hooks";
import { PreloaderImage } from "./PreloaderImage";
import { PreloaderVideo } from "./PreloaderVideo";

export function PreloaderMedia() {
    const { items, currentIndex } = usePreloader();

    const item = items[currentIndex];
    if (!item) return null;

    const type = item.type;

    switch (type) {
        case 'image':
            return <PreloaderImage src={item.src} />;
        case 'video':
            return <PreloaderVideo src={item.src} />;
        default:
            return null;
    }
}


