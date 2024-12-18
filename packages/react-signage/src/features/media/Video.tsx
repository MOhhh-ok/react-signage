import { animated } from "@react-spring/web";
import { VideoHTMLAttributes, forwardRef, useRef, useEffect } from "react";
import { MAX_RETRY_SPAN, MIN_RETRY_SPAN } from "../../consts";
import { useDebug } from "../debug/useDebug";

type VideoProps = VideoHTMLAttributes<HTMLVideoElement> & {
    // onRetryOver?: () => void;
}

export const Video = forwardRef<HTMLVideoElement, VideoProps>(
    function Video(props, ref) {
        const { debugMessage } = useDebug();
        const retrySpanRef = useRef<number>(1000);
        const retryTimerRef = useRef<number | undefined>(undefined);

        useEffect(() => {
            clearTimeout(retryTimerRef.current);
        }, [props.src]);

        function onVideoError() {
            if (typeof ref === 'function' || !ref?.current?.src) return;
            debugMessage({ message: 'video error. retrying...', severity: 'error' })
            clearTimeout(retryTimerRef.current);
            retryTimerRef.current = setTimeout(() => {
                // debugMessage({ message: `retry. span: ${retrySpanRef.current}ms`, severity: 'info' });
                ref.current?.load();
                ref.current?.play();
                upSpan();
            }, retrySpanRef.current);
        }

        function upSpan() {
            retrySpanRef.current = Math.min(retrySpanRef.current * 1.2, MAX_RETRY_SPAN);
        }

        function resetSpan() {
            retrySpanRef.current = MIN_RETRY_SPAN;
        }

        function onEnded(ev: any) {
            resetSpan();
            return props.onEnded?.(ev);
        }

        return <animated.video
            ref={ref}
            {...props}
            onError={onVideoError}
            onEnded={onEnded}
            onWaiting={() => debugMessage({ message: 'video waiting', severity: 'warning' })}
            playsInline={true}
        />
    });
