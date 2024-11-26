export type SignageAnimation = SignageZoomIn;
export type SignageZoomIn = {
    type: 'zoomIn';
    fromScale?: number;
    toScale?: number;
};

export type SignageItem = SignageImage | SignageVideo;

export type SignageImage = {
    type: 'image';
    src: string;
    second: number;
    animation?: SignageAnimation;
};

export type SignageVideo = {
    type: 'video';
    src: string;
};
