import { Signage } from '@masa-dev/react-signage';
import { useState } from 'react';
import { PresetProvider } from './features/presets/PresetSelectPanel/PresetProvider';
import { PresetSelectPanel } from './features/presets/PresetSelectPanel/PresetSelectPanel';
import { usePreset } from './features/presets/PresetSelectPanel/context';

export default function App() {
    return <>
        <div style={{ width: "600px", margin: "auto" }}>
            <PresetProvider>
                <div style={{ display: "flex", gap: "20px" }}>
                    <PresetSelectPanel />
                    <Test />
                </div>
            </PresetProvider>
        </div>
    </>
}

function Test() {
    const { preset } = usePreset();
    const [play, setPlay] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);

    return <div>
        <button onClick={() => setPlay(!play)}>{play ? 'Stop' : 'Play'}</button>
        <input type="checkbox" checked={fullScreen} onChange={ev => setFullScreen(ev.target.checked)} />
        FullScreen
        <Signage
            items={preset.items}
            play={play}
            fullScreen={fullScreen}
        />
    </div>
}