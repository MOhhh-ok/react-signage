import { useState } from 'react';
import { Preset } from '../../../types';
import { Context } from './context';
import { presets } from './presets';


type PresetProviderProps = {
    children: React.ReactNode;
}
export function PresetProvider({ children }: PresetProviderProps) {
    const [preset, setPreset] = useState<Preset>(presets[0]);
    return <Context.Provider value={{ preset, setPreset }}>
        {children}
    </Context.Provider>;
}