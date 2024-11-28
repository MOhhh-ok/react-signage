import { SignageItem } from "@masa-dev/react-signage";
import { LiteSignage, useLiteSignage } from "@masa-dev/react-signage/experimental";
import { useState } from "react";

export function Test2(props: { items: SignageItem[] }) {
    const { ref } = useLiteSignage();
    const [play, setPlay] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);

    return <>
        <button onClick={() => setPlay(prev => !prev)}>{play ? "pause" : "play"}</button>
        <input type="checkbox" checked={fullScreen} onChange={e => setFullScreen(e.target.checked)} />
        <LiteSignage ref={ref} items={props.items} play={play} fullScreen={fullScreen} />
    </>
}
