export interface MediaData {
    url: string;
    blob: Blob;
    updatedAt: Date;
}
export interface MediaStatus {
    url: string;
    status: 'success' | 'downloading' | 'error' | 'pending';
    size: number;
    accessedAt: Date;
}
