import {ICommonArguments} from "../interfaces/arguments.interface";
import {IQueueSpammer} from "../interfaces/queue-spammer.interface";
import {Options, Ora} from 'ora';
import * as fs from 'fs'

const ora = require('ora');

export default abstract class QueueSpammer implements IQueueSpammer {

    protected readonly CLIArguments: ICommonArguments;

    protected constructor(CLIArguments: ICommonArguments) {
        this.CLIArguments = CLIArguments;
    }

    public run(): void {
        this.validate();
        this.process();
    }

    protected getSpinner(options: Options): Ora {
        return ora(options)
    }

    protected fileExists(filePath: string): boolean {
        return fs.existsSync(filePath);
    }

    protected isValidJSON(filePath: string): boolean {
        try {
            const fileContent = fs.readFileSync(filePath).toString();
            JSON.parse(fileContent);
            return true
        } catch (e) {
            return false
        }
    }

    abstract process(): void;

    abstract validate(): void;
}
