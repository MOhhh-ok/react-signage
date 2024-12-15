import { usePreset } from "./context";
import { presets } from "./presets";
import { MenuItem, Select } from "@mui/material";
export function PresetSelectPanel() {
    return <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: "0.8em" }}>Preset</div>
        <SelectComponent />
        <Display />
    </div>
}

function SelectComponent() {
    const { preset, setPresetName } = usePreset();

    return <Select
        value={preset.name}
        onChange={(e) => setPresetName(e.target.value)}
        label="Select Preset"
    >
        {presets.map((preset) => (
            <MenuItem key={preset.name} value={preset.name}>
                {preset.name}
            </MenuItem>
        ))}
    </Select>
}

function Display() {
    const { preset } = usePreset();
    return <div style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(preset.items, null, 2)}</div>
}