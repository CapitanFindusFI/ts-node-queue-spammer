import {ICommonArguments} from "../interfaces/arguments.interface";
import {IQueueSpammer} from "../interfaces/queue-spammer.interface";
import * as fs from 'fs'

export default abstract class QueueSpammer implements IQueueSpammer {

    protected readonly CLIArguments: ICommonArguments;

    protected constructor(CLIArguments: ICommonArguments) {
        this.CLIArguments = CLIArguments;
    }

    public run(): void {
        this.validate();
        this.process();
    }

    protected fileExists(): boolean {
        return fs.existsSync(this.CLIArguments.file);
    }

    protected isValidJSON(): boolean {
        try {
            const fileContent = fs.readFileSync(this.CLIArguments.file).toString();
            JSON.parse(fileContent);
            return true
        } catch (e) {
            return false
        }
    }

    protected fileAsJSON(): Object {
        const fileContent = fs.readFileSync(this.CLIArguments.file).toString();
        return JSON.parse(fileContent);
    }

    abstract process(): void;

    abstract validate(): void;
}
