import { BASE_PATH } from '../config';

export const demoItems = {
    img_infinite: {
        type: 'image',
        src: BASE_PATH + '/img1.jpg',
        second: 0,
    },
    img_short1: {
        type: 'image',
        src: BASE_PATH + '/img2.jpg',
        second: 2,
    },
    img_middle1: {
        type: 'image',
        src: BASE_PATH + '/img3.jpg',
        second: 5,
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
