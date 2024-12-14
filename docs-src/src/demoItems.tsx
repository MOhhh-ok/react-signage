import { BASE_PATH } from '../config';

export const demoItems = {
    img_infinite: {
        type: 'image',
        src: BASE_PATH + '/img1.jpg',
        second: 0,
    },
    img_short: {
        type: 'image',
        src: BASE_PATH + '/img2.jpt',
        second: 1,
    },
    video1: {
        type: 'video',
        src: BASE_PATH + "/video3.mp4"
    },
    video2: {
        type: 'video',
        src: BASE_PATH + "/video4.mp4"
    },
} as const;
