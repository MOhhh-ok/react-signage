import { CSSProperties } from 'react';

export const DefaultFadeDuration = 800;
export const DefaultSize = {
    width: 300,
    height: 200,
};
export const FallbackFullscreenStyle: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
    zIndex: 9999,
};
