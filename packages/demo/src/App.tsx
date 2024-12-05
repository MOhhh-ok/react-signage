import { DebugProvider, Signage, SignageItem, SignageProvider } from '@masa-dev/react-signage';
import { PreloaderMedia, PreloaderMessage, PreloaderProvider } from '@masa-dev/react-signage/preloader';
import { useEffect, useState } from 'react';
import { Test2 } from './Test2';

const Item1: SignageItem = {
    type: 'image',
    src: "https://images-assets.nasa.gov/image/iss070e044474/iss070e044474~orig.jpg",
    second: 2,
}

const Item2: SignageItem = {
    type: 'video',
    src: "/video3.mp4"
}

const Item3: SignageItem = {
    type: 'video',
    src: "/video4.mp4",
}

const BaseItems: SignageItem[] = [
    // Item1,
    // Item2,
    Item3,
]

export default function App() {
    const [play, setPlay] = useState(false)
    const [fullScreen, setFullScreen] = useState(false)
    const [items, setItems] = useState(BaseItems)

    useEffect(() => {
        setTimeout(() => {
            setItems([...items, Item3])
        }, 30_000);
    }, []);

    return <>
        <Test2 items={items} />

        <p>Use buttons to get user interaction for playing videos.</p>
        <button onClick={() => setPlay(!play)}>{play ? 'Stop' : 'Play'}</button>
        <button onClick={() => setFullScreen(!fullScreen)}>
            {
                fullScreen
                    ? 'Inline'
                    : document.fullscreenEnabled ? 'FullScreen' : 'Pseudo FullScreen'
            }
        </button>

        <p>Inline Container</p>
        <DebugProvider debug={false}>
            <SignageProvider
                play={play}
                fullScreen={fullScreen}
                items={items}
                onSlideChange={params => { console.log(params) }}
            >
                <Signage />
            </SignageProvider>
        </DebugProvider>

        <p>Preloader</p>
        <PreloaderProvider items={items}>
            <PreloaderMessage />
            <div style={{ width: "150px", height: "100px", maxWidth: "150px", maxHeight: "100px" }}>
                <PreloaderMedia />
            </div>
        </PreloaderProvider>
    </>
}

