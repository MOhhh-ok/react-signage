# React Signage

This is a react library for signage.

- Auto slide image and video with cross fade.
- Can toggle fullscreen.
- If the browser does not support the Fullscreen API, use a pseudo fullscreen display.


## Install

```
npm i @masa-dev/react-signage
```

## Minimum usage

```tsx
import { Signage } from '@masa-dev/react-signage'
import { useState } from 'react'

export default function App() {
    const [play, setPlay] = useState(false)
    const [fullScreen, setFullScreen] = useState(false)

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

        <p>Component. If not fullscreen, slideshow is shown below.</p>
        <Signage
            play={play}
            fullScreen={fullScreen}
            items={items}
        />
    </>
}
```

## License

MIT