import { createContext, useContext } from "react";

type DebugContextType = { debug: boolean; }
export const DebugContext = createContext<DebugContextType>({ debug: false });
export function useDebug() {
    return useContext(DebugContext);
}