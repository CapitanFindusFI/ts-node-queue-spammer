import {ISQSCredentials} from "./interfaces/sqs-credentials.interface";
import {SQSCredentials} from "./credentials/sqs.credentials";
import {QueueConnector} from "../../connector.abstract";

export class SQSConnector extends QueueConnector<ISQSCredentials> {
    constructor() {
        super();

        this.credentials = SQSCredentials();
    }

    run(payload: string): void {
    }

}
