import {IConnector} from "./interfaces/connector.interface";

export abstract class QueueConnector<T> implements IConnector<T> {
    // @ts-ignore
    credentials: T;

    protected constructor() {
    }

    abstract run(payload: string, howmany: number): void;
}
