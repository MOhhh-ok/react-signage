export type SignageItem = SignageImage | SignageVideo;

export type SignageImage = {
    type: 'image';
    src: string;
    second: number;
};

export type SignageVideo = {
    type: 'video';
    src: string;
};

export type SignageProps = {
    play: boolean;
    items: SignageItem[];
    fullScreen?: boolean;
    onFullscreenStateChange?: (fullscreen: boolean) => void;
    onSlideChange?: (params: { item: SignageItem; index: number }) => void;
    width?: number;
    height?: number;
};
