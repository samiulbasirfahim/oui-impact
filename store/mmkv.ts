import { createMMKV } from "react-native-mmkv";

export const storage = createMMKV({
    id: "app_storage",
    readOnly: false
});

export function setItem(key: string, value: string | number | boolean) {
    storage.set(key, value);
}

export function getString(key: string): string | null {
    return storage.contains(key) ? (storage.getString(key) ?? null) : null;
}

export function getNumber(key: string): number | null {
    return storage.contains(key) ? (storage.getNumber(key) ?? null) : null;
}

export function getBoolean(key: string): boolean | null {
    return storage.contains(key) ? (storage.getBoolean(key) ?? null) : null;
}

export function removeItem(key: string) {
    storage.remove(key);
}

export function updateItem(
    key: string,
    updater: (
        prev: string | number | boolean | null,
    ) => string | number | boolean,
) {
    let prev: string | number | boolean | null = null;

    if (storage.contains(key)) {
        prev =
            storage.getString(key) ??
            storage.getNumber(key) ??
            storage.getBoolean(key) ??
            null;
    }

    const newValue = updater(prev);
    storage.set(key, newValue);
}