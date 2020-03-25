import {ISQSCredentials} from "../interfaces/sqs-credentials.interface";

export const SQSCredentials = (): ISQSCredentials => {
    return {
        queueUrl: process.env.SQS_QUEUE_URL || "",
        consumerKey: process.env.SQS_CONSUMER_KEY || "",
        consumerSecret: process.env.SQS_CONSUMER_SECRET || "",
        awsRegion: process.env.AWS_REGION || ""
    }
};
