import { IRetryService } from "./retry.service";
export declare class RetryIntervalService implements IRetryService {
    private _func;
    private _retryDelays;
    private _interval;
    private _log;
    private _retryFactory;
    private _timeout;
    private _aborted;
    constructor(_func: () => Promise<void>, _retryDelays: number[], _interval: number);
    run(): Promise<void>;
    private _runWithRetry;
    private _run;
    abort(): Promise<void>;
}
