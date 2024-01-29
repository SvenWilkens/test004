export interface IStorage {
    getOrCreate(key: string, defaultValue?: string): any;
}
export declare class LocalStorage implements IStorage {
    getOrCreate(key: string, defaultValue?: string): string;
}
