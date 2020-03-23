import {ICommonArguments} from "./interfaces/arguments.interface";
import GenericSpammer from "./impl/GenericSpammer";
import yargs = require('yargs');
import ora = require('ora');

const argv: ICommonArguments = yargs.options({
    file: {
        type: "string",
        default: '',
        alias: "f",
        defaultDescription: "pass a JSON file to send inside queues"
    },
    json: {
        type: "string",
        default: '',
        alias: "j",
        defaultDescription: "directly input JSON"
    },
    howmany: {
        type: "number",
        alias: 'm',
        defaultDescription: 'how many items to spam, defaults to 1',
        default: 1
    }
}).argv;

const runProcess = (argv: ICommonArguments): void => {
    const spinner = ora({
        color: "cyan"
    });
    const queueSpammer = new GenericSpammer(argv);
    try {
        spinner.start("Processing your request, QueueSpammer working...\n");
        queueSpammer.run();

        spinner.stop();
    } catch (e) {
        spinner.fail(e.toString());
        process.exit(1);
    }
};

runProcess(argv);
