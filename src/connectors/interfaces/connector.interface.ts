export interface IConnector<T> {
    credentials: T;

    run(payload: string, howmany: number): void;
}
