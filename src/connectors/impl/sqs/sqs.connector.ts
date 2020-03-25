import {ISQSCredentials} from "./interfaces/sqs-credentials.interface";
import {SQSCredentials} from "./credentials/sqs.credentials";
import {QueueConnector} from "../../connector.abstract";
import {v4 as uuidv4} from 'uuid';
import AWS = require('aws-sdk');

export class SQSConnector extends QueueConnector<ISQSCredentials> {

    private sqsClient: AWS.SQS;

    constructor() {
        super();

        this.credentials = SQSCredentials();

        this.sqsClient = new AWS.SQS({
            apiVersion: '2012-11-05',
            region: this.credentials.awsRegion,
            credentials: {
                accessKeyId: this.credentials.consumerKey,
                secretAccessKey: this.credentials.consumerSecret
            }
        })
    }

    private collectBatchMessagePayload(payload: string): AWS.SQS.SendMessageBatchRequestEntry {
        return {
            Id: uuidv4(),
            MessageBody: payload
        }
    }

    private createMessageBatch(payload: string, batchSize: number): AWS.SQS.SendMessageBatchRequest {
        return {
            Entries: [...new Array(batchSize).keys()].map(() => this.collectBatchMessagePayload(payload)),
            QueueUrl: this.credentials.queueUrl
        }
    }

    private collectBatchMessages(payload: string, howmany: number): AWS.SQS.SendMessageBatchRequest[] {
        const MAX_MESSAGES_PAR_BATCH = 10;
        const chunkSize = Math.max(MAX_MESSAGES_PAR_BATCH, howmany);
        const payloadList: string[] = [...new Array(howmany).keys()].map(() => payload);

        return new Array(Math.ceil(payloadList.length / chunkSize))
            .fill(payload)
            .map(() => payloadList.splice(0, chunkSize))
            .map(items => this.createMessageBatch(payload, items.length))
    }

    run(payload: string, howmany: number): void {
        // TODO must be implemented

        const batchMessages = this.collectBatchMessages(payload, howmany);

        console.log(JSON.stringify(batchMessages));
        console.log('\n')
    }

}
