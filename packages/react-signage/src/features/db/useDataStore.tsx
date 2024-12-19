import { db } from './db';
import { MediaData, MediaStatus } from './tables';

export function useDataStore() {
    async function getMediaData(url: string): Promise<MediaData | undefined> {
        await updateMediaStatus(url, { accessedAt: new Date() });
        return await db.mediaData.get(url);
    }

    async function upsertMediaData(params: Pick<MediaData, 'url' | 'blob'>): Promise<boolean> {
        const size = params.blob?.size ?? 0;
        await updateMediaStatus(params.url, { size, accessedAt: new Date() });
        while (true) {
            try {
                await db.mediaData.put({ url: params.url, blob: params.blob, updatedAt: new Date() });
                return true;
            } catch (e) {
                const deletedSize = await deleteLeastAccessedMediaData();
                if (!deletedSize) {
                    return false;
                }
            }
        }
    }

    async function deleteLeastAccessedMediaData(): Promise<number> {
        const orderKey: keyof MediaStatus = 'accessedAt';
        const data = await db.mediaStatus.orderBy(orderKey).first();
        if (!data) return 0;
        return await deleteMediaData(data.url);
    }

    async function deleteMediaData(url: string): Promise<number> {
        const status = await db.mediaStatus.get(url);
        if (!status) return 0;
        await db.mediaStatus.delete(url);
        await db.mediaData.delete(url);
        return status.size;
    }

    async function mediaDataExists(url: string): Promise<boolean> {
        const urlKey: keyof MediaData = 'url';
        const count = await db.mediaData.where(urlKey).equals(url).count();
        return count > 0;
    }

    async function updateMediaStatus(url: string, status: Partial<MediaStatus>): Promise<void> {
        const defaultStatus: MediaStatus = {
            url,
            status: 'pending',
            size: 0,
            accessedAt: new Date()
        };
        await db.mediaStatus.put({
            ...defaultStatus,
            ...status,
        });
    }

    async function getTotalSize(): Promise<number> {
        const statuses = await db.mediaStatus.toArray();
        return statuses.reduce((acc, status) => acc + status.size, 0);
    }

    return {
        upsertMediaData,
        getMediaData,
        deleteMediaData,
        mediaDataExists,
        updateMediaStatus,
    };
}
