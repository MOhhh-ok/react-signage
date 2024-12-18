import { animated } from '@react-spring/web';
import { CSSProperties, forwardRef } from "react";

type Props = {
    style: CSSProperties
}

export const Img = forwardRef<HTMLImageElement, Props>(
    function Img(props, ref) {
        const { style } = props;

        return <>
            <animated.img
                ref={ref}
                style={style}
            />
        </>
    }
);
