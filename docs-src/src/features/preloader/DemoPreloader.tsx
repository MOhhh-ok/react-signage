import { PreloaderMedia, PreloaderMessage, PreloaderProvider } from "@masa-dev/react-signage";
import { useState } from "react";
import { demoItems } from "../../demoItems";

export function DemoPreloader() {
    const [open, setOpen] = useState(true);

    return <div>
        {!open
            &&
            <button onClick={() => setOpen(true)}>Open Preloader</button>
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