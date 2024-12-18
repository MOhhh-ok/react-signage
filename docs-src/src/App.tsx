import { H1, H2 } from '@masa-dev/mui-enhance';
import { Signage } from '@masa-dev/react-signage';
import { Cacher } from '@masa-dev/react-signage';
import { Button, FormControlLabel, Stack, Switch, ThemeProvider } from '@mui/material';
import { useState } from 'react';
import { BrowserRouter } from 'react-router';
import './App.css';
import { demoItems } from './demoItems';
import { usePreset } from './features/presets/context';
import { PresetProvider } from './features/presets/PresetProvider';
import { PresetSelectPanel } from './features/presets/PresetSelectPanel';
import { NoChromeWarning } from './SafariWarning';
import { globalTheme } from './theme';

export default function App() {
    const cacheItems = Object.values(demoItems);
    return <>
        <BrowserRouter>
            <ThemeProvider theme={globalTheme}>
                <PresetProvider>
                    <main>
                        <H1>React Signage Demo</H1>
                        <NoChromeWarning />
                        <H2>Preload</H2>
                        <Cacher
                            items={cacheItems}
                        />
                        <H2>Signage</H2>
                        <Stack direction={'row'} spacing={2}>
                            <PresetSelectPanel />
                            <Test />
                        </Stack>
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
    const [useDbCache, setUseDbCache] = useState(false);

    return <Stack direction="column" spacing={1}>
        <Stack direction="row" spacing={2}>
            <Stack direction="column" spacing={2}>
                <Button
                    variant="contained"
                    sx={{ width: "120px" }}
                    onClick={() => setPlay(!play)}>{play ? 'Stop' : 'Play'}
                </Button>
                <Signage
                    items={preset.items}
                    play={play}
                    fullScreen={fullScreen}
                    onFullScreenChange={isFullscreen => setFullScreen(isFullscreen)}
                    mute={mute}
                    size={{ width: 300, height: 200 }}
                    useDbCache={useDbCache}
                />
                <Stack direction="row" spacing={0} >
                    <FormControlLabel label="FullScreen" control={<Switch checked={fullScreen} onChange={ev => setFullScreen(ev.target.checked)} />} />
                    <FormControlLabel label="Mute" control={<Switch checked={mute} onChange={ev => setMute(ev.target.checked)} />} />
                    <FormControlLabel label="DB Cache" control={<Switch checked={useDbCache} onChange={ev => setUseDbCache(ev.target.checked)} />} />
                </Stack>
            </Stack>
        </Stack>
    </Stack>
}
