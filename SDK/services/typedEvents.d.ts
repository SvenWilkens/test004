/**
 * @hidden
 */
/** */
export type Listener<T> = (event: T) => any;
export interface Disposable {
    dispose(): any;
}
export declare class TypedEvent<T> {
    private listeners;
    private listenersOncer;
    on: (listener: Listener<T>) => Disposable;
    once: (listener: Listener<T>) => void;
    off: (listener: Listener<T>, clearAll?: boolean) => void;
    emit: (event: T) => void;
    pipe: (te: TypedEvent<T>) => Disposable;
}
