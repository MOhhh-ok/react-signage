import { useEffect } from "react";
import { usePreloader } from "../hooks.js";

export function PreloaderImage({ src }: { src: string }) {
    const { advance, setStatus } = usePreloader();

    useEffect(() => {
        setStatus({ type: 'loadingImage', src });
    }, []);

    function handleLoad() {
        advance();
    }

    return <img
        src={src}
        onLoad={handleLoad}
        style={{ width: '100%', height: '100%', objectFit: "contain" }}
    />;
}