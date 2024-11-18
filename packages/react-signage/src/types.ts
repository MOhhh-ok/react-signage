export type SignageItem = SignageImage | SignageVideo;

type SignageImage = {
    type: 'image';
    src: string;
    second: number;
};

type SignageVideo = {
    type: 'video';
    src: string;
};
