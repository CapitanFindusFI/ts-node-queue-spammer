import {ICLIArguments} from "../interfaces/icliarguments.interface";
import * as fs from 'fs'

const ora = require('ora');

export default class QueueSpammer {

    private readonly CLIArguments: ICLIArguments;

    constructor(CLIArguments: ICLIArguments) {
        this.CLIArguments = CLIArguments;
    }

    validate(): void {
        const spinner = ora({
            color: "red"
        });

        spinner.start("validating input");

        const errorMessages: string[] = [];

        const {file} = this.CLIArguments;
        if (file) {
            const fileExists: boolean = fs.existsSync(file);
            if (!fileExists) errorMessages.push(`invalid file path specified: ${file}`);
        }

        if (errorMessages.length) {
            spinner.fail(errorMessages.join('\n'));
            throw new Error('Invalid input provided');
        }

        spinner.succeed('validation passed')
    }

    process(): void {
        this.validate();

        const spinner = ora({
            color: "blue"
        });

        spinner.start("processing request");
    }
}
