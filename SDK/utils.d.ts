export declare function safe(func: () => Promise<void>): Promise<void>;
export declare function delay(ms: any): Promise<void>;
export declare function runAsync<T>(func: () => T | Promise<T>): Promise<T>;
export declare function equalsIgnoreCase(value1: string, value2: string): boolean;
declare global {
    interface String {
        equalsIgnoreCase(value: string): boolean;
    }
}
export declare function isDevMode(): boolean;
export declare function removeVersion(url: string): string;
