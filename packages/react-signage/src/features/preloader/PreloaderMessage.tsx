import { usePreloaderContext } from "./hooks.js";



export function PreloaderMessage() {
    const { message } = usePreloaderContext();
    return <div>{message}</div>;
}
