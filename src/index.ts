import yargs = require('yargs');
import {ICLIArguments} from "./interfaces/icliarguments.interface";
import QueueSpammer from "./classes/QueueSpammer";

const argv: ICLIArguments = yargs.options({
    file: {
        type: "string",
        demandOption: true,
        alias: "f",
        defaultDescription: "pass a JSON file to send inside queues"
    }
}).argv;

const queueSpammer = new QueueSpammer(argv);
queueSpammer.process();
