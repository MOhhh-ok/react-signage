import { toast } from "react-hot-toast";
import { DebugContext } from "./DebugContext";
import { DebugData, DebugMessageSeverity } from "./types";



const backgrounds: Record<DebugMessageSeverity, string> = {
    info: 'white',
    warning: 'yellow',
    error: 'red'
}

const colors: Record<DebugMessageSeverity, string> = {
    info: 'black',
    warning: 'black',
    error: 'white'
}
type Props = {
    debug: boolean;
    children: React.ReactNode
}

export function DebugProvider(props: Props) {
    const { debug, children } = props;

    function debugMessage(data: DebugData) {
        if (!debug || !data.message) return;
        console.log(data);
        toast(data.message, {
            duration: 5000,
            style: {
                backgroundColor: backgrounds[data.severity],
                color: colors[data.severity],
            }
        })
    }

    return <DebugContext.Provider value={{ debug, debugMessage }}>
        {/* {debug && <Toaster position="bottom-right" containerStyle={{ zIndex: 9999 }} />} */}
        {children}
    </DebugContext.Provider>
}
