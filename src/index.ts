import yargs = require('yargs');
import {ICLIArguments} from "./interfaces/icliarguments.interface";

const argv: ICLIArguments = yargs.options({
    file: {
        type: "string",
        demandOption: true,
        alias: "f"
    }
}).argv;


