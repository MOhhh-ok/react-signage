import { DebugProvider, SignageItem } from '@masa-dev/react-signage';
import { LiteSignage } from '@masa-dev/react-signage/lite';
import { useEffect, useState } from 'react';

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

const BaseItems: SignageItem[] = [
    Item1,
    // Item2,
    // Item3,
]

export function ItemChangeTest() {
    const [play, setPlay] = useState(false)
    const [fullScreen, setFullScreen] = useState(false)
    const [items, setItems] = useState(BaseItems)

    useEffect(() => {
        setTimeout(() => {
            setItems([Item3])
        }, 10_000);
    }, []);

    return <>
        <p>Item change test</p>
        <button onClick={() => setPlay(true)}>Play</button>
        {JSON.stringify(items)}
        <DebugProvider debug={true}>
            <LiteSignage
                play={play}
                fullScreen={fullScreen}
                items={items}
            // mute={true}
            />
        </DebugProvider>
    </>
}

