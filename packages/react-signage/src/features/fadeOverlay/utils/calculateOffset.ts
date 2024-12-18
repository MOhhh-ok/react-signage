import { Size } from '../types';

export function calculateOffset(srcSize: Size, targetSize: Size) {
    const srcRatio = srcSize.width / srcSize.height;
    const targetRatio = targetSize.width / targetSize.height;

    let newWidth, newHeight;

    if (srcRatio > targetRatio) {
        newWidth = targetSize.width;
        newHeight = targetSize.width / srcRatio;
    } else {
        newHeight = targetSize.height;
        newWidth = targetSize.height * srcRatio;
    }

    return {
        xOffset: (targetSize.width - newWidth) / 2,
        yOffset: (targetSize.height - newHeight) / 2,
        newWidth,
        newHeight,
    };
}
