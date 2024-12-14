import { PreloaderMedia, PreloaderMessage, SignageItem } from '@masa-dev/react-signage';
import { PreloaderProvider } from '@masa-dev/react-signage/preloader';

const Item1: SignageItem = {
    type: 'image',
    src: "https://images-assets.nasa.gov/image/iss070e044474/iss070e044474~orig.jpg",
    second: 0,
}

const Item2: SignageItem = {
    type: 'video',
    src: "/video3.mp4"
}

const Item3: SignageItem = {
    type: 'video',
    src: "/video4.mp4",
}

const Items: SignageItem[] = [
    Item1,
    Item2,
    Item3,
]

export function PreloaderTest() {

    return <PreloaderProvider items={Items}>
        <PreloaderMessage generateMessage={(state) => JSON.stringify(state)} />
        <PreloaderMedia />
    </PreloaderProvider>
}
