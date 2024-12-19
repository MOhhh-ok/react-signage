export interface MediaItemRefBase {
    changeShow: (show: boolean) => void;
    fadeIn: () => void;
    setSrc: (src: string) => Promise<void>;
}
