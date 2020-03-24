import {ICommonArguments} from "./interfaces/arguments.interface";
import {IConnector} from "../connectors/interfaces/connector.interface";
import ConnectorFactory from "../connectors/connector.factory";
import * as fs from 'fs'

export default class QueueSpammer {

    protected readonly CLIArguments: ICommonArguments;

    private connector: IConnector<any> | undefined;

    constructor(CLIArguments: ICommonArguments) {
        this.CLIArguments = CLIArguments;
    }

    public run(): void {
        this.validate();
        this.process();
    }

    static fileToString(filePath: string): string {
        return fs.readFileSync(filePath).toString();
    }

    static fileExists(filePath: string): boolean {
        return fs.existsSync(filePath);
    }

    static fileAsJSON(filePath: string): Object {
        const fileContent = QueueSpammer.fileToString(filePath);
        return JSON.parse(fileContent);
    }

    static isValidJSON(jsonString: string): boolean {
        try {
            JSON.parse(jsonString);
            return true
        } catch (e) {
            return false
        }
    }

    private validate(): void {
        const {file} = this.CLIArguments;
        if (file) {
            if (!QueueSpammer.fileExists(file)) {
                throw new Error(`File not found: ${file}`)
            }

            this.CLIArguments.json = QueueSpammer.fileToString(file);
            delete this.CLIArguments.file
        }

        const {json} = this.CLIArguments;
        if (!QueueSpammer.isValidJSON(json)) {
            throw new Error('Invalid JSON provided');
        }
    }

    private process(): void {
        this.connector = ConnectorFactory.getConnector(this.CLIArguments.connector);
        this.connector.run(this.CLIArguments.json)
    }
}
