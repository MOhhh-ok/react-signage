import { animated, useSpring } from '@react-spring/web';
import { CSSProperties, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useDebug } from "../hooks";
import { SignageItem } from "../types";
import { generateIdentifiableSignageItem } from "../utils";
import { Container } from "./Container";
import { ItemBaseStyle, ItemHideStyle } from "./styles";
import { LiteSignageRefType } from "./types";

type LiteSignageProps = {
    items: SignageItem[];
    play: boolean;
    fullScreen: boolean;
    style?: CSSProperties;
    mute?: boolean;
}


/**
 * This is for legacy devices. limited some features.
 */
export const LiteSignage = forwardRef<LiteSignageRefType, LiteSignageProps>(
    function LiteSignage(props, ref) {
        // const items = props.items.map(generateIdentifiableSignageItem);
        const { play, fullScreen, mute, items } = props;
        const [index, setIndex] = useState(0);
        const item = items[index];
        // const [item, setItem] = useState<SignageItem | undefined>(undefined);
        const imgRef = useRef<HTMLImageElement>(null);
        const videoRef = useRef<HTMLVideoElement>(null);
        const timerRef = useRef<number | undefined>(undefined);
        const { debug } = useDebug();
        const [fadeInSpring, fadeInSpringApi] = useSpring(() => ({}));

        useImperativeHandle(ref, () => ({
            advanceNext: advanceNext,
        }));

        useEffect(() => {
            let newIndex = index;
            if (newIndex >= items.length) {
                newIndex = 0;
            };
            setIndex(newIndex);
        }, [items]);

        useEffect(() => {
            if (debug) console.log('item changed', item);
            if (!play) return;
            startItem();
        }, [index]);

        useEffect(() => {
            if (debug) console.log('play state changed', play)
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
            setIndex(prev => {
                const newIndex = prev + 1;
                const result = newIndex >= items.length ? 0 : newIndex
                if (debug) console.log('advanceNext', result);
                return result;
            });
        }

        function setElements() {
            imgRef.current?.setAttribute('src', item?.type == 'image' ? item.src : '');
            videoRef.current?.setAttribute('src', item?.type == 'video' ? item.src : '');
            if (item?.type == 'video') {
                videoRef.current?.play();
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

        return <Container play={play} fullScreen={fullScreen} style={props.style}>
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
                muted={mute}
            />
        </Container>
    }
);
