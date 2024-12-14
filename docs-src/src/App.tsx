import { Signage } from '@masa-dev/react-signage';
import { useState } from 'react';
import { usePreset } from './features/presets/context';
import { PresetProvider } from './features/presets/PresetProvider';
import { PresetSelectPanel } from './features/presets/PresetSelectPanel';
import { DemoPreloader } from './features/preloader/DemoPreloader';

export default function App() {
    return <>
        <div style={{ width: "600px", margin: "auto" }}>
            <h1 style={{ fontSize: "2rem", borderBottom: "1px solid #aaa", marginBottom: "1em" }}>React Signage Demo</h1>
            <PresetProvider>
                <h2>Preload</h2>
                <DemoPreloader />
                <h2>Signage</h2>
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