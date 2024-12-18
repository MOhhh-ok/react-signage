import { Media } from '../types';

export function getMediaSrcSize(media: Media) {
    if (media instanceof HTMLImageElement) {
        return { width: media.naturalWidth, height: media.naturalHeight };
    } else if (media instanceof HTMLVideoElement) {
        return { width: media.videoWidth, height: media.videoHeight };
    } else {
        throw new Error('media is not HTMLImageElement or HTMLVideoElement');
    }
}
