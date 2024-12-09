import { useEffect } from "react";
import { usePreloaderContext } from "../hooks.js";

export function PreloaderImage({ src }: { src: string }) {
    const { advance, setMessage } = usePreloaderContext();

    useEffect(() => {
        setMessage(`loading image ${src}`);
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