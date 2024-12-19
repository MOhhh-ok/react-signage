import Dexie, { type EntityTable } from 'dexie';
import { DATABASE_NAME } from './consts';
import { MediaStatus, MediaData } from './tables';

const db = new Dexie(DATABASE_NAME) as Dexie & {
    mediaData: EntityTable<MediaData, 'url'>;
    mediaStatus: EntityTable<MediaStatus, 'url'>;
};

// Schema declaration:
db.version(1).stores({
    mediaData: 'url, blob, updatedAt',
    mediaStatus: 'url, status, size, accessedAt',
});

export { db };
