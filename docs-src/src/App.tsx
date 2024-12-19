import { Signage } from '@masa-dev/react-signage';
import { useState } from 'react';
import { usePreset } from './features/presets/context';
import { PresetProvider } from './features/presets/PresetProvider';
import { PresetSelectPanel } from './features/presets/PresetSelectPanel';
import { DemoPreloader } from './features/preloader/DemoPreloader';
import { BrowserRouter } from 'react-router';
import { H1, H2 } from '@masa-dev/mui-enhance';
import { Button, FormControlLabel, Stack, Switch, ThemeProvider } from '@mui/material';
import { globalTheme } from './theme';
import './App.css';
import { NoChromeWarning } from './SafariWarning';

export default function App() {
    return <>
        <BrowserRouter>
            <ThemeProvider theme={globalTheme}>
                <PresetProvider>
                    <main>
                        <H1>React Signage Demo</H1>
                        <NoChromeWarning />
                        <H2>Preload</H2>
                        <DemoPreloader />
                        <H2>Signage</H2>
                        <div style={{ display: "flex", gap: "20px" }}>
                            <PresetSelectPanel />
                            <Test />
                        </div>
                    </main>
                </PresetProvider>
            </ThemeProvider>
        </BrowserRouter>
    </>
}

function Test() {
    const { preset } = usePreset();
    const [play, setPlay] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);
    const [mute, setMute] = useState(false);

    return <Stack direction="column" spacing={1}>
        <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={() => setPlay(!play)}>{play ? 'Stop' : 'Play'}</Button>
            <FormControlLabel label="FullScreen" control={<Switch checked={fullScreen} onChange={ev => setFullScreen(ev.target.checked)} />} />
            <FormControlLabel label="Mute" control={<Switch checked={mute} onChange={ev => setMute(ev.target.checked)} />} />
        </Stack>
        <Signage
            items={preset.items}
            play={play}
            fullScreen={fullScreen}
            onFullScreenChange={isFullscreen => setFullScreen(isFullscreen)}
            mute={mute}
        />
    </Stack>
}
