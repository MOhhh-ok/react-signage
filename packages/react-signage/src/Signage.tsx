import { animated, useSpring } from '@react-spring/web';
import { CSSProperties, forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState, VideoHTMLAttributes } from "react";
import { SignageItem, SignageRefType } from "./types";
import { Container } from "./Container";
import { ItemBaseStyle, ItemHideStyle } from "./styles";
import { Toaster } from 'react-hot-toast';
import { interactionDummyVideo } from './assets/interactionDummyVideo';
import { useDebug } from './features/debug/useDebug';

const MAX_RETRY_SPAN = 10_000;
const MIN_RETRY_SPAN = 1000;

export type SignageProps = {
    items: SignageItem[];
    play: boolean;
    fullScreen: boolean;
    onFullScreenChange?: (fullScreen: boolean) => void;
    style?: CSSProperties;
    mute?: boolean;
}

type IndexData = {
    index: number;
    changedAt: number;
}


export const Signage = forwardRef<SignageRefType, SignageProps>(
    function Signage(props, ref) {
        const { play, fullScreen, mute, items, onFullScreenChange } = props;
        const [indexData, setIndexData] = useState<IndexData>({ index: 0, changedAt: 0 });
        const item = items[indexData.index];
        const imgRef = useRef<HTMLImageElement>(null);
        const videoRef = useRef<HTMLVideoElement>(null);
        const timerRef = useRef<number | undefined>(undefined);
        const { debug, debugMessage } = useDebug();
        const [fadeInSpring, fadeInSpringApi] = useSpring(() => ({}));

        useImperativeHandle(ref, () => ({
            advanceNext,
        }));

        useEffect(() => {
            const fullscreenchanged = () => {
                const isFullScreen = !!document.fullscreenElement;
                onFullScreenChange?.(isFullScreen);
            }
            window.addEventListener('fullscreenchange', fullscreenchanged);
            return () => window.removeEventListener('fullscreenchange', fullscreenchanged);
        });

        const itemsJson = useMemo(() => JSON.stringify(items), [items]);
        useEffect(() => {
            debugMessage({ message: `items changed`, severity: 'info' });
            setIndexData(prev => {
                const index = prev.index < items.length ? prev.index : 0;
                return { index, changedAt: Date.now() };
            });
        }, [itemsJson]);

        useEffect(() => {
            if (!play) return;
            startItem({ isFirst: false });
        }, [indexData]);

        useEffect(() => {
            if (play) {
                startItem({ isFirst: true });
            } else {
                stopItem();
            }
            return () => stopItem();
        }, [play]);

        function startItem(params: { isFirst: boolean }) {
            if (!videoRef.current) return;

            const process = () => {
                fadeInSpringApi.start({ from: { opacity: 0 }, to: { opacity: 1 }, config: { duration: 1000 } });
                setElements();
                resetEvents();
            };
            // 古い端末用に、一旦ダミー動画を再生させる
            if (params.isFirst) {
                videoRef.current.src = interactionDummyVideo;
                videoRef.current.play().then(process);
            } else {
                process();
            }
        }

        function stopItem() {
            videoRef.current?.pause();
            clearTimeout(timerRef.current)
            changeShow('none');
        }


        function advanceNext() {
            setIndexData(prev => {
                const newIndex = prev.index + 1;
                const result = newIndex >= items.length ? 0 : newIndex
                debugMessage({ message: `advanceNext: ${result}`, severity: 'info' });
                return { index: result, changedAt: Date.now() };
            });
        }

        function setElements() {
            switch (item.type) {
                case 'image':
                    imgRef.current?.setAttribute('src', item.src);
                    videoRef.current?.pause();
                    changeShow('image');
                    break;
                case 'video':
                    if (videoRef.current) {
                        videoRef.current.setAttribute('src', item.src);
                        debugMessage({ message: 'start video', severity: 'info' });
                        videoRef.current.currentTime = 0;
                        videoRef.current.play();
                        changeShow('video');
                    }
                    break;
            }
        }

        function changeShow(type: 'image' | 'video' | 'none') {
            if (!imgRef.current || !videoRef.current) {
                return;
            }
            if (type == 'image') {
                imgRef.current.style.display = 'block';
                videoRef.current.style.display = 'none';
            } else if (type == 'video') {
                imgRef.current.style.display = 'none';
                videoRef.current.style.display = 'block';
            } else if (type == 'none') {
                imgRef.current.style.display = 'none';
                videoRef.current.style.display = 'none';
            }
        }

        function resetEvents() {
            if (item?.type != 'image') return;
            clearTimeout(timerRef.current);
            const second = item.second ?? 0;
            if (second > 0) {
                timerRef.current = setTimeout(() => {
                    advanceNext();
                }, second * 1000);
            }
        }

        return <Container play={play} fullScreen={fullScreen} style={{ ...props.style, position: "relative" }}>
            <animated.img
                ref={imgRef}
                style={{
                    ...ItemBaseStyle,
                    ...fadeInSpring,
                }}
            />
            <Video
                ref={videoRef}
                style={{
                    ...ItemBaseStyle,
                    ...fadeInSpring,
                }}
                onEnded={advanceNext}
                muted={mute}
            />
            {debug && <Toaster position="bottom-right" />}
        </Container>
    }
);

type VideoProps = VideoHTMLAttributes<HTMLVideoElement> & {
    // onRetryOver?: () => void;
}

const Video = forwardRef<HTMLVideoElement, VideoProps>(
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
