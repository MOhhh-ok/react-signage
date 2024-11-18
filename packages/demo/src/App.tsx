import { Signage } from '@masa-dev/react-signage'
import { useState } from 'react'
import './App.css'

export default function App() {
    const [play, setPlay] = useState(false)
    const [fullScreen, setFullScreen] = useState(false)

    return (
        <>
            <button onClick={() => setPlay(!play)}>{play ? 'Stop' : 'Play'}</button>
            <button onClick={() => setFullScreen(!fullScreen)}>{fullScreen ? 'Inline' : 'FullScreen'}</button>
            <Signage
                play={play}
                fullScreen={fullScreen}
                items={[
                    {
                        type: 'image',
                        src: '/img1.jpg',
                        second: 3,
                    },
                    {
                        type: 'video',
                        src: '/video1.mp4'
                    }
                ]}
                width={300}
                height={200}
            />
        </>
    )
}

