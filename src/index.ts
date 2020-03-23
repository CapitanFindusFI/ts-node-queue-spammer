import yargs = require('yargs');
import {ICLIArguments} from "./interfaces/icliarguments.interface";
import QueueSpammer from "./classes/QueueSpammer";

const argv: ICLIArguments = yargs.options({
    file: {
        type: "string",
        demandOption: true,
        alias: "f"
    }
}).argv;

const queueSpammer = new QueueSpammer(argv);
