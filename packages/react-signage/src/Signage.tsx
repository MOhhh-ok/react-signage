import { animated, useSpring } from '@react-spring/web';
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { Toaster } from 'react-hot-toast';
import { interactionDummyVideo } from './assets/interactionDummyVideo';
import { DEFAULT_SIZE, FADE_DURATION } from './consts';
import { Container } from "./Container";
import { useDebug } from './features/debug/useDebug';
import { FadeoutOverlay, useFadeoutOverlay } from './features/fadeOverlay/fadeOverlay';
import { FullScreenListener } from './features/fullscreen/FullScreenListener';
import { ItemBaseStyle } from "./styles";
import { SignageItem, SignageRefType } from "./types";
import { Video } from './features/media/Video';
import { Img } from './features/media/Img';


export type SignageProps = {
    items: SignageItem[];
    play: boolean;
    fullScreen: boolean;
    onFullScreenChange?: (fullScreen: boolean) => void;
    size?: { width: number, height: number };
    mute?: boolean;
}

type IndexData = {
    index: number;
    changedAt: number;
}


export const Signage = forwardRef<SignageRefType, SignageProps>(
    function Signage(props, ref) {
        const { play, fullScreen, mute, items, onFullScreenChange, size = DEFAULT_SIZE } = props;
        const [indexData, setIndexData] = useState<IndexData>({ index: 0, changedAt: 0 });
        const item = items[indexData.index];
        const imgRef = useRef<HTMLImageElement>(null);
        const videoRef = useRef<HTMLVideoElement>(null);
        const { ref: overlayRef } = useFadeoutOverlay();
        const timerRef = useRef<number | undefined>(undefined);
        const { debug, debugMessage } = useDebug();
        const [fadeInSpring, fadeInSpringApi] = useSpring(() => ({}));

        useImperativeHandle(ref, () => ({
            advanceNext,
        }));

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
                overlayRef.current?.startFadeout({ mediaRef: [imgRef, videoRef].filter(isVisible)[0], duration: FADE_DURATION });
                fadeInSpringApi.start({ from: { opacity: 0 }, to: { opacity: 1 }, config: { duration: FADE_DURATION } });
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

        return <>
            <FullScreenListener onFullScreenChange={onFullScreenChange} />
            <Container play={play} fullScreen={fullScreen} style={{ position: "relative", ...size }}>
                <Img
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
                <FadeoutOverlay ref={overlayRef} {...size} />
                {debug && <Toaster position="bottom-right" />}
            </Container>
        </>
    }
);


function isVisible(ref: React.RefObject<HTMLElement>) {
    if (!ref.current) return false;
    return ref.current.style.display != 'none';
}
