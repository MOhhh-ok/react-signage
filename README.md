# React Signage

This is a react library for signage.

- Auto slide image and video with cross fade.
- Can toggle fullscreen.


## Install

```
npm i @masa-dev/react-signage
```

## Usage

```typescript
import { Signage } from '@masa-dev/react-signage'
import { useState } from 'react'

export default function App() {
    const [play, setPlay] = useState(false)
    const [fullScreen, setFullScreen] = useState(false)

    return <>

        <p>Use buttons to get user interaction for playing videos.</p>
        <button onClick={() => setPlay(!play)}>{play ? 'Stop' : 'Play'}</button>
        <button onClick={() => setFullScreen(!fullScreen)}>{fullScreen ? 'Inline' : 'FullScreen'}</button>

        <p>Inline Container</p>
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
}
```

## Lisence

MIT