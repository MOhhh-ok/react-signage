import { animated, useSpring } from '@react-spring/web';
import { forwardRef, useImperativeHandle, useRef } from "react";
import { FADE_DURATION } from '../../../consts';
import { ItemBaseStyle } from './consts';
import { MediaItemRefBase } from './types';
type Props = {
    // style: CSSProperties
}

export interface ImgRef extends MediaItemRefBase {
    elementRef: React.RefObject<HTMLImageElement>;
}

export const Img = forwardRef<ImgRef, Props>(
    function Img(props, ref) {
        const elementRef = useRef<HTMLImageElement>(null);
        const [fadeInSpring, fadeInSpringApi] = useSpring(() => ({}));

        useImperativeHandle(ref, () => ({
            changeShow: (show: boolean) => {
                if (!elementRef.current) return;
                elementRef.current.style.display = show ? 'block' : 'none';
            },
            fadeIn: () => {
                fadeInSpringApi.start({
                    from: { opacity: 0 },
                    to: { opacity: 1 },
                    config: { duration: FADE_DURATION }
                });
            },
            setSrc: async (src: string) => {
                if (!elementRef.current) return;
                elementRef.current.src = src;
            },
            elementRef: elementRef
        }));

        return <>
            <animated.img
                ref={elementRef}
                style={{
                    ...ItemBaseStyle,
                    ...fadeInSpring
                }}
            />
        </>
    }
);
