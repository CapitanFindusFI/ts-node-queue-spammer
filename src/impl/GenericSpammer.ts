import {ICommonArguments} from "../interfaces/arguments.interface";
import QueueSpammer from "../classes/queue-spammer.abstract";

export default class GenericSpammer extends QueueSpammer {

    constructor(CLIArguments: ICommonArguments) {
        super(CLIArguments);
    }

    validate(): void {
        const spinner = super.getSpinner({
            color: "yellow"
        });

        spinner.start('validating input');

        const errorMessages: string[] = [];

        const {file} = this.CLIArguments;
        if (file) {
            const fileExists: boolean = super.fileExists(file);
            if (!fileExists) errorMessages.push(`invalid file path specified: ${file}`);
        }

        if (errorMessages.length) {
            spinner.fail(errorMessages.join('\n'));
            throw new Error('Invalid input provided');
        }

        spinner.succeed('validation passed')
    }

    process(): void {
        const spinner = super.getSpinner({
            color: "blue"
        });

        spinner.start('processing request');

        const errorMessages: string[] = [];

        const {file} = this.CLIArguments;
        if (file) {
            const isValidJSON = super.isValidJSON(file);
            if (!isValidJSON) errorMessages.push('invalid JSON file');
        }

        if (errorMessages.length) {
            const errorMessage = errorMessages.join('\n');
            spinner.fail(errorMessage);
            throw new Error(errorMessage)
        }

        spinner.succeed('process completed');
    }
}
