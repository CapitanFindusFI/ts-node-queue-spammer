import {ICommonArguments} from "./spammer/interfaces/arguments.interface";
import QueueSpammer from "./spammer/queue-spammer";
import yargs = require('yargs');
import ora = require('ora');

const argv: ICommonArguments = yargs.options({
    connector: {
        type: "string",
        default: '',
        alias: 'c',
        defaultDescription: 'Queue connector to be used'
    },
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

const runProcess = (CLIArguments: ICommonArguments): void => {
    const spinner = ora({
        color: "cyan"
    });
    const queueSpammer = new QueueSpammer(CLIArguments);
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
