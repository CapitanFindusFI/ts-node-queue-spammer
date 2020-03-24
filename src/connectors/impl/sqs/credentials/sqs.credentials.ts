import {ISQSCredentials} from "../interfaces/sqs-credentials.interface";

export const SQSCredentials = (): ISQSCredentials => {
    return {
        queueUrl: process.env.SQS_QUEUE_URL || null,
        consumerKey: process.env.SQS_CONSUMER_KEY || null,
        consumerSecret: process.env.SQS_CONSUMER_SECRET || null,
        awsRegion: process.env.AWS_REGION || null
    }
};
