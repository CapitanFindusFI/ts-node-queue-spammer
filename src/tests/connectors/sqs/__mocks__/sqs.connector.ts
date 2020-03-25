import {v4 as uuidv4} from "uuid";
import AWS = require('aws-sdk');

const SQSMockConnector = jest.fn().mockImplementation(() => {
    return {
        collectBatchMessagePayload(payload: string): AWS.SQS.SendMessageBatchRequestEntry {
            return {
                Id: uuidv4(),
                MessageBody: payload
            }
        },
        createMessageBatch(payload: string, batchSize: number): AWS.SQS.SendMessageBatchRequest {
            return {
                Entries: [...Array(batchSize).keys()].map(() => this.collectBatchMessagePayload(payload)),
                QueueUrl: 'https://example.me'
            }
        },
        collectBatchMessages(payload: string, howmany: number): AWS.SQS.SendMessageBatchRequest[] {
            const MAX_MESSAGES_PAR_BATCH = 10;
            const chunkSize = Math.min(MAX_MESSAGES_PAR_BATCH, howmany);
            const payloadList: string[] = [...Array(howmany).keys()].map(() => payload);

            return new Array(Math.ceil(payloadList.length / chunkSize))
                .fill(payload)
                .map(() => payloadList.splice(0, chunkSize))
                .map(items => this.createMessageBatch(payload, items.length))
        },
        run(payload: string, howmany: number): void {
            return this.collectBatchMessages(payload, howmany);
        }
    }
});

// @ts-ignore
export default SQSMockConnector;
