import { useMemo } from "react";
import { usePreloader } from "./hooks.js";
import { PreloaderStatus } from "./types.js";

type Props = {
    generateMessage?: (status: PreloaderStatus) => string;
};

export function PreloaderMessage(props: Props) {
    const { status } = usePreloader();

    const message = useMemo(() => {
        const g = props.generateMessage ?? defaultGenerateMessage;
        return g(status);
    }, [status, props.generateMessage]);

    return <div>{message}</div>;
}

function defaultGenerateMessage(status: PreloaderStatus) {
    const { type } = status;
    switch (type) {
        case 'pending':
            return 'pending...';
        case 'loadingImage':
            return `loading image ${status.src}`;
        case 'loadingVideo':
            return `loading video ${status.percent}% ${status.src}`;
        case 'finished':
            return 'preload finished';
    }
}

