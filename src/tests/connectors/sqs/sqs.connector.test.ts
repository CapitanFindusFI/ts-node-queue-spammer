import SQSConnector from './__mocks__/sqs.connector';

const jest = require('jest');

jest.mock('./__mocks__/sqs.connector.ts');

const testPayload = JSON.stringify({
    foo: 'bar'
});

describe('it should test SQS connector functionalities', () => {
    const sqsConnector = new SQSConnector();

    beforeEach(() => {
        SQSConnector.mockClear();
    });

    it('should not chunk messages', () => {
        const batchMessages = sqsConnector.collectBatchMessages(
            testPayload, 2
        );

        expect(batchMessages).toHaveLength(1);
        expect(batchMessages[0].Entries).toHaveLength(2);
    });

    it('should correcly chunk messages', () => {
        const batchMessages = sqsConnector.collectBatchMessages(
            testPayload, 11
        );

        expect(batchMessages).toHaveLength(2);
        expect(batchMessages[0].Entries).toHaveLength(10);
        expect(batchMessages[1].Entries).toHaveLength(1);
    });

    it('should correcly chunk more messages', () => {
        const batchMessages = sqsConnector.collectBatchMessages(
            testPayload, 30
        );

        expect(batchMessages).toHaveLength(3);
        expect(batchMessages[0].Entries).toHaveLength(10);
        expect(batchMessages[1].Entries).toHaveLength(10);
        expect(batchMessages[1].Entries).toHaveLength(10);
    })
});
