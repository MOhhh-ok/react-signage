import { useEffect, useRef, useState } from "react";
import { useCacher } from "./useCacher";
import { SignageItem } from "../../types";

type Item = Pick<SignageItem, 'src' | 'type'>;

type Props = {
    items: Item[];
    renderProgress?: (props: { progress: Progress | undefined, queue: Item[] }) => React.ReactNode;
}

type Progress = {
    src: string;
    progress: number | undefined;
}

export function Cacher(props: Props) {
    const { items } = props;
    const { fetchAndCache, getStatus } = useCacher();
    const [queue, setQueue] = useState<Item[]>([])
    const processing = useRef(false);
    const [progress, setProgress] = useState<Progress>();

    const itemsJson = JSON.stringify(items);
    useEffect(() => {
        setQueue(prev => [...prev, ...items]);
    }, [itemsJson]);

    useEffect(() => {
        const interval = setInterval(() => process(), 1000);
        return () => clearInterval(interval);
    }, [queue]);

    async function process() {
        if (processing.current) return;
        processing.current = true;

        try {
            const item = queue.shift();
            setQueue([...queue]);
            if (!item) throw new Error('no item');

            setProgress({ src: item.src, progress: 0 })
            const status = await getStatus(item.src)
            if (status?.status != 'success' && status?.status != 'downloading') {
                await fetchAndCache(item.src, {
                    onDownloadProgress: (p) => {
                        setProgress({ src: item.src, progress: p.progress });
                    }
                });
            } else {
            }
            setProgress(undefined);
            processing.current = false;
            process();
        } catch (err: any) {
        } finally {
            processing.current = false;
            setProgress(undefined);
        }
    };

    if (props.renderProgress)
        return props.renderProgress({ progress, queue });

    return <>
        {progress
            ? <>
                loading...
                {(progress?.progress ?? 0) * 100}%
                <br />
                {progress.src}
            </>
            : 'done'
        }
    </>
}

// async function loadImage(src: string) {
//     return new Promise((resolve, reject) => {
//         const img = document.createElement('img');
//         img.src = src;
//         img.onload = () => resolve(img);
//         img.onerror = (e) => reject(e);
//     })
// }