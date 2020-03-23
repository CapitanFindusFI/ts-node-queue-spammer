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

    static fileToString(filePath: string): string {
        return fs.readFileSync(filePath).toString();
    }

    static fileExists(filePath: string): boolean {
        return fs.existsSync(filePath);
    }

    static fileAsJSON(filePath: string): Object {
        const fileContent = QueueSpammer.fileToString(filePath);
        return JSON.parse(fileContent);
    }

    static isValidJSON(jsonString: string): boolean {
        try {
            JSON.parse(jsonString);
            return true
        } catch (e) {
            return false
        }
    }

    abstract process(): void;

    abstract validate(): void;
}
