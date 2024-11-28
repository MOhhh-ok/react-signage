import { DebugProvider, SignageItem } from "@masa-dev/react-signage";
import { LiteSignage } from "@masa-dev/react-signage/lite";
import { useState } from "react";

export function Test2(props: { items: SignageItem[] }) {
    const [play, setPlay] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);

    return <>
        <button onClick={() => setPlay(prev => !prev)}>{play ? "pause" : "play"}</button>
        <input type="checkbox" checked={fullScreen} onChange={e => setFullScreen(e.target.checked)} />
        <DebugProvider debug={true}>
            <LiteSignage items={props.items} play={play} fullScreen={fullScreen} />
        </DebugProvider>
    </>
}
