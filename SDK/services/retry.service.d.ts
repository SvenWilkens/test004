import { ILogger } from "@microsoft/signalr";
export declare class LogManager {
    debug: (message: string) => void;
    info: (message: string) => void;
    error: (message: string) => void;
    private static format;
    private static Console;
    static GetSignalRLogger(name?: string): ILogger;
    static GetLogger(name?: string): LogManager;
}
export declare enum LogSeverity {
    Debug = 0,
    Info = 1,
    Error = 2
}
export interface IRetryService {
    run: () => Promise<void>;
    abort: () => Promise<void>;
}
export interface IRetryFactory {
    createTimeout(func: () => Promise<void>, leftRetries: number[]): Promise<IRetryService>;
    createInterval(func: () => Promise<void>, leftRetries: number[], interval: number): Promise<IRetryService>;
}
export declare class RetryFactory implements IRetryFactory {
    createTimeout(func: () => Promise<void>, retryDelays?: number[]): Promise<IRetryService>;
    createInterval(func: () => Promise<void>, retryDelays?: number[], interval?: number): Promise<IRetryService>;
}
export declare class RetryService implements IRetryService {
    private _func;
    private _leftRetries;
    private _timeoutHandler;
    private _log;
    private _aborted;
    constructor(_func: () => Promise<void>, _leftRetries: number[]);
    run(): Promise<void>;
    private _retry;
    abort(): Promise<void>;
}
