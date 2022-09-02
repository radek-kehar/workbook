import {useState} from "react";

class StorageWrapper {

    private storage: Storage;

    constructor(storage: Storage) {
        this.storage = storage;
    }

    getStorage<T extends any>(key: string): T | null {
        const stored = this.storage.getItem(key);
        if (!stored) {
            return null;
        }
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.warn(`Unable to parse session storage value of key "${key}"`, e);
            return null;
        }
    }

    getStorageOrDefault<T extends any>(key: string, defaultValue: () => T | null): T {
        const stored = this.getStorage<T>(key);
        if (stored === null) {
            return defaultValue();
        }
        return stored;
    }

    setStorage<T extends any>(key: string, value: T): void {
        this.storage.setItem(key, JSON.stringify(value));
    }

    removeStorage(key: string): void {
        this.storage.removeItem(key);
    }
}

export const SessionStorage = new StorageWrapper(sessionStorage);

export const LocalStorage = new StorageWrapper(localStorage);

// export function useSessionStorage<T extends any>(keyName: string, defaultValue?: () => T): [T | null, (newValue: T) => void, () => void] {
//     const [storedValue, setStoredValue] = useState<T>(() => {
//         return getSessionStorageOrDefault(keyName, defaultValue ? defaultValue : () => null);
//     });
//
//     const setValue = (newValue: T) => {
//         setSessionStorage(keyName, newValue);
//         setStoredValue(newValue);
//     };
//
//     const removeValue = () => {
//         removeSessionStorage(keyName);
//         setStoredValue(defaultValue ? defaultValue() : null);
//     };
//
//     return [storedValue, setValue, removeValue];
// };
