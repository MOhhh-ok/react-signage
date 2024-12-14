import { createContext, useContext } from "react";
import { Preset } from "../../types";

type ContextType = {
    preset: Preset
    setPresetName: (presetName: string) => void;
}

export const Context = createContext<ContextType>(null!);

export function usePreset() {
    return useContext(Context);
}
