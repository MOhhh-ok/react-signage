import { animated, useSpring } from '@react-spring/web';
import { CSSProperties, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useDebug } from "../hooks";
import { SignageItem } from "../types";
import { Container } from "./Container";
import { ItemBaseStyle, ItemHideStyle } from "./styles";
import { LiteSignageRefType } from "./types";
import { Toaster } from 'react-hot-toast';

type LiteSignageProps = {
    items: SignageItem[];
    play: boolean;
    fullScreen: boolean;
    style?: CSSProperties;
    mute?: boolean;
}

type IndexData = {
    index: number;
    changedAt: number;
}


/**
 * This is for legacy devices. limited some features.
 */
export const LiteSignage = forwardRef<LiteSignageRefType, LiteSignageProps>(
    function LiteSignage(props, ref) {
        const { play, fullScreen, mute, items } = props;
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
            setIndexData(prev => {
                const index = prev.index < items.length ? prev.index : 0;
                return { index, changedAt: Date.now() };
            });
        }, [items]);

        useEffect(() => {
            if (!play) return;
            startItem();
        }, [indexData]);

        useEffect(() => {
            if (play) {
                startItem();
            } else {
                stopItem();
            }
            return () => stopItem();
        }, [play]);


        function startItem() {
            setElements();
            resetEvents();
            fadeInSpringApi.start({ from: { opacity: 0 }, to: { opacity: 1 }, config: { duration: 1000 } });
        }

        function stopItem() {
            videoRef.current?.pause();
            clearTimeout(timerRef.current)
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
            imgRef.current?.setAttribute('src', item?.type == 'image' ? item.src : '');
            videoRef.current?.setAttribute('src', item?.type == 'video' ? item.src : '');
            if (item?.type == 'video') {
                if (videoRef.current) {
                    debugMessage({ message: 'start video', severity: 'info' });
                    videoRef.current.currentTime = 0;
                    videoRef.current.play();
                }
            }
        }

        function resetEvents() {
            if (item?.type != 'image') return 0;
            const second = item.second ?? 0;
            clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
                advanceNext();
            }, second * 1000);
        }

        return <Container play={play} fullScreen={fullScreen} style={{ ...props.style, position: "relative" }}>
            <animated.img
                ref={imgRef}
                style={{
                    ...ItemBaseStyle,
                    ...(item?.type != 'image' ? ItemHideStyle : {}),
                    ...fadeInSpring
                }}
            />
            <animated.video
                ref={videoRef}
                style={{
                    ...ItemBaseStyle,
                    ...(item?.type != 'video' ? ItemHideStyle : {}),
                    ...fadeInSpring
                }}
                onEnded={advanceNext}
                onError={() => debugMessage({ message: 'video error', severity: 'error' })}
                onWaiting={() => debugMessage({ message: 'video waiting', severity: 'warning' })}
                muted={mute}
            />
            {debug && <Toaster position="bottom-right" />}
        </Container>
    }
);
