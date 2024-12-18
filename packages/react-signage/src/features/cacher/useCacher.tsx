import axios, { AxiosRequestConfig } from "axios";
import { useEffect } from "react";
import { db } from "./db";
import { MediaStatus } from "./tables";
import { useDataStore } from "./useDataStore";

export function useCacher() {
    const { upsertMediaData, updateMediaStatus } = useDataStore();

    useEffect(() => {
        resetDownloadingStatuses();
    }, []);

    async function getStatus(url: string) {
        return await db.mediaStatus.get(url);
    }

    async function getOrFetchAndCache(url: string, ops?: Pick<AxiosRequestConfig, 'onDownloadProgress'>) {
        const status = await getStatus(url);
        if (status?.status === 'success') {
            const data = await db.mediaData.get(url);
            if (data?.blob) {
                return URL.createObjectURL(data.blob);
            }
        }
        fetchAndCache(url, ops);
        return url;
    }

    async function fetchAndCache(url: string, ops?: Pick<AxiosRequestConfig, 'onDownloadProgress'>) {
        const status = await getStatus(url);
        if (status?.status === 'downloading') return;
        await updateMediaStatus(url, { status: 'downloading' });

        const res = await axios.get(url, {
            responseType: 'blob',
            ...ops,
        });
        const blob = res.data;
        await upsertMediaData({ url, blob });
        await updateMediaStatus(url, { status: 'success', size: blob.size });
    }

    async function resetDownloadingStatuses() {
        const whereKey: keyof MediaStatus = 'status';
        const whereValue: MediaStatus['status'] = 'downloading';
        const statuses = await db.mediaStatus.where(whereKey).equals(whereValue).toArray();
        for (const status of statuses) {
            await updateMediaStatus(status.url, { status: 'pending' });
        }
    }

    return { getStatus, fetchAndCache, getOrFetchAndCache };
}