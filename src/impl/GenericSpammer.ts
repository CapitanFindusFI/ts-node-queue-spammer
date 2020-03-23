import {ICommonArguments} from "../interfaces/arguments.interface";
import QueueSpammer from "../classes/queue-spammer.abstract";

export default class GenericSpammer extends QueueSpammer {

    constructor(CLIArguments: ICommonArguments) {
        super(CLIArguments);
    }

    validate(): void {
        const {file} = this.CLIArguments;
        if (file) {
            const fileExists: boolean = QueueSpammer.fileExists(file);
            if (!fileExists) {
                throw new Error(`File: ${file} does not exists`)
            }

            this.CLIArguments.json = QueueSpammer.fileToString(file);
            delete this.CLIArguments.file
        }

        const isValidJSON: boolean = QueueSpammer.isValidJSON(this.CLIArguments.json);
        if (!isValidJSON) {
            throw new Error('Invalid JSON provided')
        }
    }

    process(): void {
        const {howmany, json} = this.CLIArguments;

        let JSONPayload: Object = JSON.parse(json);

        [...new Array(howmany).keys()].forEach(() => {
            console.log(JSONPayload);
        });
    }
}
