import {ICLIArguments} from "../interfaces/icliarguments.interface";

export default class QueueSpammer {

    private readonly CLIArguments: ICLIArguments;

    constructor(CLIArguments: ICLIArguments) {
        this.CLIArguments = CLIArguments;

        this.process();
    }

    process(): void {
        console.log(this.CLIArguments)
    }
}
