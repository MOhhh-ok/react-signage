import { CSSProperties } from 'react';

export const ContainerBaseStyle: CSSProperties = {
    background: 'black',
    width: '300px',
    height: '200px',
};

export const FallbackFullscreenStyle: CSSProperties = {
    position: 'fixed',
    margin: 0,
    padding: 0,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
    zIndex: 1000,
};
