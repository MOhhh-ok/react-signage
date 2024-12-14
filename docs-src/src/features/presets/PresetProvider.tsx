import { useEffect, useState } from 'react';
import { Preset } from '../../types';
import { Context } from './context';
import { presets } from './presets';
import { useSearchParams } from 'react-router';


type PresetProviderProps = {
    children: React.ReactNode;
}
export function PresetProvider({ children }: PresetProviderProps) {
    const [preset, setPreset] = useState<Preset>(presets[0]);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const presetName = searchParams.get('preset');
        if (presetName) {
            setPreset(presets.find(p => p.name === presetName) || presets[0]);
        }
    }, [searchParams]);

    function setPresetName(presetName: string) {
        const preset = presets.find(p => p.name === presetName);
        if (!preset) return;
        setPreset(preset);
        const url = new URL(window.location.href);
        url.searchParams.set('preset', presetName);
        window.history.pushState({}, '', url.toString());
    }


    return <Context.Provider value={{ preset, setPresetName }}>
        {children}
    </Context.Provider>;
}