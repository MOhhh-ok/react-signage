import { DebugContext, DebugContextType } from "../contexts";

type Props = DebugContextType & {
    children: React.ReactNode
}
export function DebugProvider(props: Props) {
    const { children, ...rest } = props;
    return <DebugContext.Provider value={rest}>
        {children}
    </DebugContext.Provider>
}
