import { SignageItem } from "@masa-dev/react-signage";

export const demoItems = {
    img_infinite: {
        type: 'image',
        src: "https://images-assets.nasa.gov/image/iss070e044474/iss070e044474~orig.jpg",
        second: 0,
    },
    img_short: {
        type: 'image',
        src: "https://images-assets.nasa.gov/image/iss070e044474/iss070e044474~orig.jpg",
        second: 1,
    },
    video1: {
        type: 'video',
        src: "/video3.mp4"
    },
    video2: {
        type: 'video',
        src: "/video4.mp4"
    },
} as const;
