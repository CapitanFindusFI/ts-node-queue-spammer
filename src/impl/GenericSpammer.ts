import {ICommonArguments} from "../interfaces/arguments.interface";
import QueueSpammer from "../classes/queue-spammer.abstract";

export default class GenericSpammer extends QueueSpammer {

    constructor(CLIArguments: ICommonArguments) {
        super(CLIArguments);
    }

    validate(): void {
        const {file} = this.CLIArguments;
        if (file) {
            const fileExists: boolean = super.fileExists();
            if (!fileExists) {
                throw new Error(`File: ${file} does not exists`)
            }

            const isValidJSON = super.isValidJSON();
            if (!isValidJSON) {
                throw new Error('Invalid JSON file')
            }
        }
    }

    process(): void {
        const JSONPayload = super.fileAsJSON();

    }
}
