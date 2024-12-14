import { usePreset } from "./context";
import { presets } from "./presets";

export function PresetSelectPanel() {
    return <div style={{ display: "flex", flexDirection: "column" }}>
        Select Preset<br />
        <Select />
        <Display />
    </div>
}

function Select() {
    const { preset, setPreset } = usePreset();

    return <select
        value={preset.name}
        onChange={(e) => setPreset(presets.find(p => p.name === e.target.value)!)}
    >
        {presets.map((preset) => (
            <option key={preset.name} value={preset.name}>
                {preset.name}
            </option>
        ))}
    </select>
}

function Display() {
    const { preset } = usePreset();
    return <div style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(preset.items, null, 2)}</div>
}