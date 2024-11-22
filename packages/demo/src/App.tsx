import { Signage, SignageItem } from '@masa-dev/react-signage'
import { PreloaderProvider, PreloaderMedia, PreloaderMessage } from '@masa-dev/react-signage/preloader';
import { useState } from 'react'

export default function App() {
    const [play, setPlay] = useState(false)
    const [fullScreen, setFullScreen] = useState(false)

    const items: SignageItem[] = [
        {
            type: 'image',
            src: "https://images-assets.nasa.gov/image/iss070e044474/iss070e044474~orig.jpg",
            second: 3,
        },
        {
            type: 'video',
            src: "/video1.mp4"
        },
        {
            type: 'video',
            src: "https://images-assets.nasa.gov/video/NHQ_2020_0427_How to Make Demo-2 Straw Rockets/NHQ_2020_0427_How to Make Demo-2 Straw Rockets~orig.mp4?c"
        },
        {
            type: 'image',
            src: "https://images-assets.nasa.gov/image/11 14 24 fuel depot/11 14 24 fuel depot~orig.jpg",
            second: 2,
        },
        {
            type: 'video',
            src: "https://images-assets.nasa.gov/video/MSFC_If You Can Build A Rocket/MSFC_If You Can Build A Rocket~orig.mp4?c",
        }
    ]

    return <>

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
        <Signage
            play={play}
            fullScreen={fullScreen}
            items={items}
            onFullscreenStateChange={(fullscreen) => {
                console.log('onFullscreenStateChange', fullscreen)
            }}
        />

        <p>Preloader</p>
        <PreloaderProvider items={items}>
            <PreloaderMessage />
            <div style={{ width: "150px", height: "100px", maxWidth: "150px", maxHeight: "100px" }}>
                <PreloaderMedia />
            </div>
        </PreloaderProvider>
    </>
}

