import { IdentifiableSignageItem, SignageItem } from './types';

export function generateKey() {
    return (
        performance.now().toString(36) +
        '-' +
        Math.random().toString(36).substring(2, 9)
    );
}

export function generateIdentifiableSignageItem(
    item: SignageItem
): IdentifiableSignageItem {
    return { ...item, id: generateKey() };
}
