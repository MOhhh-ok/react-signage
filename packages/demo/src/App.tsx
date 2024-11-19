import { Signage, SignageItem } from '@masa-dev/react-signage'
import { useRef, useState } from 'react'

export default function App() {
    const [play, setPlay] = useState(false)
    const [fullScreen, setFullScreen] = useState(false)
    const testRef = useRef<HTMLVideoElement>(null);

    const items: SignageItem[] = [
        {
            type: 'image',
            src: '/img1.jpg',
            second: 3,
        },
        {
            type: 'video',
            src: '/video1.mp4'
        }]

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
    </>
}

