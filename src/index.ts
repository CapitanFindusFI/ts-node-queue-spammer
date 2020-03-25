import {ICommonArguments} from "./spammer/interfaces/arguments.interface";
import QueueSpammer from "./spammer/queue-spammer";
import ConnectorFactory from "./connectors/connector.factory";
import {Answers} from "inquirer";
import yargs = require('yargs');
import ora = require('ora');
import inquirer = require('inquirer');

const argv: ICommonArguments = yargs.options({
    connector: {
        type: "string",
        default: '',
        alias: "c",
        defaultDescription: 'Queue connector to be used'
    },
    file: {
        type: "string",
        default: '',
        alias: "f",
        defaultDescription: "pass a JSON file to send inside queues"
    },
    json: {
        type: "string",
        default: '',
        alias: "j",
        defaultDescription: "directly input JSON"
    },
    howmany: {
        type: "number",
        alias: 'm',
        defaultDescription: 'how many items to spam, defaults to 1',
        default: 1
    }
}).argv;

const parseOptions = (CLIArguments: ICommonArguments): Promise<ICommonArguments> => {
    const prompt = inquirer.createPromptModule();
    const promptQuestions = [];

    if (!CLIArguments.connector) {
        promptQuestions.push({
            type: 'list',
            name: 'connector',
            choices: ConnectorFactory.ALLOWED_CONNECTORS,
            message: 'Select which queue connector to use'
        })
    }

    return prompt(promptQuestions).then((answers: Answers) => {
        CLIArguments.connector = answers.connector;
        return CLIArguments
    })
};

const runProcess = async (CLIArguments: ICommonArguments): Promise<void> => {
    CLIArguments = await parseOptions(CLIArguments);
    const spinner = ora({
        color: "cyan"
    });
    const queueSpammer = new QueueSpammer(CLIArguments);
    try {
        spinner.start("Processing your request, QueueSpammer working...\n");
        queueSpammer.run();

        spinner.stop();
    } catch (e) {
        spinner.fail(e.toString());
        process.exit(1);
    }
};

runProcess(argv);
