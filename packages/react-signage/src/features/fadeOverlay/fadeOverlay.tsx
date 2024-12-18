import { useSpring, animated } from '@react-spring/web';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { MediaRef } from './types';
import { getMediaSrcSize } from './utils/utils';
import { calculateOffset } from './utils/calculateOffset';


type Props = {
}

type FadeoutOverlayRef = {
    startFadeout: (params: { mediaRef: MediaRef | undefined, duration: number }) => void;
}

export function useFadeoutOverlay() {
    const ref = useRef<FadeoutOverlayRef>(null);
    return { ref };
}

export const FadeoutOverlay = forwardRef(
    function FadeoutOverlay(props: Props, ref: React.Ref<FadeoutOverlayRef>) {
        const canvasRef = useRef<HTMLCanvasElement>(null);
        const [spring, springApi] = useSpring(() => ({ opacity: 0 }));

        useImperativeHandle(ref, () => ({
            startFadeout: (params) => {
                const { mediaRef, duration } = params;
                if (!canvasRef.current || !mediaRef) return;
                captureFrame(mediaRef);
                springApi.start({ from: { opacity: 1 }, to: { opacity: 0 }, config: { duration } });
            }
        }));

        useEffect(() => {
            if (!canvasRef.current) return;
            const parent = canvasRef.current.parentElement;
            const updateCanvasSize = () => {
                if (canvasRef.current) {
                    canvasRef.current.width = parent?.clientWidth ?? 0;
                    canvasRef.current.height = parent?.clientHeight ?? 0;
                }
            };

            updateCanvasSize(); // 初期サイズ設定

            // ResizeObserverを使用して親要素のサイズ変更を監視
            const resizeObserver = new ResizeObserver(updateCanvasSize);
            if (parent) {
                resizeObserver.observe(parent);
            }

            return () => {
                resizeObserver.disconnect();
            };


            // window.addEventListener('resize', updateCanvasSize);
            // parent?.addEventListener('resize', updateCanvasSize);

            // return () => {
            //     window.removeEventListener('resize', updateCanvasSize);
            //     parent?.removeEventListener('resize', updateCanvasSize);
            // };
        }, []);

        function captureFrame(mediaRef: MediaRef) {
            const media = mediaRef.current;
            const canvas = canvasRef.current;

            if (!media || !canvas) {
                throw new Error('media or canvas is null');
            }

            const context = canvas.getContext("2d");
            if (!context) {
                throw new Error('context is null');
            }

            context.fillStyle = '#000000';
            context.fillRect(0, 0, canvas.width, canvas.height);
            const srcSize = getMediaSrcSize(media);
            const { xOffset, yOffset, newWidth, newHeight } = calculateOffset(
                srcSize,
                { width: canvas.width, height: canvas.height });
            console.log({ xOffset, yOffset, newWidth, newHeight });
            context.drawImage(media, xOffset, yOffset, newWidth, newHeight);
        }

        return <>
            <animated.canvas ref={canvasRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    ...spring
                }} />
        </>
    }
);
