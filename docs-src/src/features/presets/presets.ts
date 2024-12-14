import { demoItems } from '../../demoItems';

export const presets = [
    {
        name: 'One Image',
        items: [demoItems.img_infinite],
    },
    {
        name: 'Two Images',
        items: [demoItems.img_short1, demoItems.img_middle1],
    },
    {
        name: 'Two Videos',
        items: [demoItems.video1, demoItems.video2],
    },
    {
        name: 'Image and Video',
        items: [demoItems.img_short1, demoItems.video1],
    },
    {
        name: 'Video and Image',
        items: [demoItems.video1, demoItems.img_short1],
    },
];
