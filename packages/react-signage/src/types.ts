export type SignageAnimation = SignageZoomIn;
export type SignageZoomIn = {
    type: 'zoomIn';
    fromScale?: number;
    toScale?: number;
};

export type SignageItem = SignageImage | SignageVideo;
export type IdentifiableSignageItem = SignageItem & { id: string };

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

export type SignageSlideType = 'single' | 'multiple';
