export type DebugMessageSeverity = 'info' | 'warning' | 'error';
export type DebugData = {
    message: string;
    severity: DebugMessageSeverity;
};
