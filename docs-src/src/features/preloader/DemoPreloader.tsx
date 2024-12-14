import { PreloaderMedia, PreloaderMessage, PreloaderProvider } from "@masa-dev/react-signage";
import { useState } from "react";
import { demoItems } from "../../demoItems";

export function DemoPreloader() {
    const [open, setOpen] = useState(false);

    return <div>
        {!open
            &&
            <button onClick={() => setOpen(true)}>Open</button>
        }
        {open
            &&
            <PreloaderProvider items={Object.values(demoItems)}>
                <PreloaderMessage />
                <PreloaderMedia />
            </PreloaderProvider>
        }
    </div>
}