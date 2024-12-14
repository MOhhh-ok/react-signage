import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { Preset } from "../../../types";

type ContextType = {
    preset: Preset
    setPreset: Dispatch<SetStateAction<Preset>>;
}

export const Context = createContext<ContextType>(null!);

export function usePreset() {
    return useContext(Context);
}
