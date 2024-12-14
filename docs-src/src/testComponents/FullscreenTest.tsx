import { DebugProvider, Signage, SignageItem } from "@masa-dev/react-signage";
import { useState } from "react";
import { demoItems } from "../demoItems";

const items = [
    // demoItems.img_infinite,
    demoItems.video1,
]

export function FullscreenTest() {
    const [play, setPlay] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);

    return <>
        <button onClick={() => setPlay(prev => !prev)}>{play ? "pause" : "play"}</button>
        <input type="checkbox" checked={fullScreen} onChange={e => setFullScreen(e.target.checked)} />
        <DebugProvider debug={true}>
            <Signage items={items} play={play} fullScreen={fullScreen} />
        </DebugProvider>
    </>
}
