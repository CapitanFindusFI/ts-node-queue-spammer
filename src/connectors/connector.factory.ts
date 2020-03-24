import {SQSConnector} from "./impl/sqs/sqs.connector";
import {QueueConnector} from "./connector.abstract";

export default class ConnectorFactory {

    public static ALLOWED_CONNECTORS = [
        'sqs'
    ];

    public static getConnector(name: string): QueueConnector<any> {
        switch (name) {
            case 'sqs':
                return new SQSConnector();
            default:
                throw new Error(`Unknown connector: ${name}`)
        }
    }
}
