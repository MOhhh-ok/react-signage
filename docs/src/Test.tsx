import { useEffect, useRef, useState } from "react"

export function Test() {
    const ref = useRef<HTMLVideoElement>(null);
    const [index, setIndex] = useState(0);
    const srcs = ["/video3.mp4", "/video4.mp4", ""]

    function onEnded() {
        proceed();
    }

    function proceed() {
        setIndex(prev => {
            const newIndex = prev + 1;
            return newIndex < srcs.length ? newIndex : 0;
        });
    }

    useEffect(() => {
        const src = srcs[index]
        if (!src) {
            setTimeout(() => {
                proceed();
            }, 3000);
        }
    }, [index]);

    return <>
        <button onClick={proceed}>Next</button>
        <video
            ref={ref}
            src={srcs[index]}
            onEnded={onEnded}
            style={{ width: 300, height: 200 }}
            autoPlay
        />
    </>
}