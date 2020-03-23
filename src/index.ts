import yargs = require('yargs');
import {ICommonArguments} from "./interfaces/arguments.interface";
import GenericSpammer from "./impl/GenericSpammer";

const ora = require('ora');

const argv: ICommonArguments = yargs.options({
    file: {
        type: "string",
        demandOption: true,
        alias: "f",
        defaultDescription: "pass a JSON file to send inside queues"
    },
    howmany: {
        type: "number",
        demandOption: true,
        alias: 'm',
        defaultDescription: 'how many items to spam, defaults to 1',
        default: 1
    }
}).argv;

const spinner = ora({
    color: "cyan"
});

const queueSpammer = new GenericSpammer(argv);
try {
    spinner.start("Processing your request, QueueSpammer working...");
    queueSpammer.run();
} catch (e) {
    spinner.fail(e.toString());
}
