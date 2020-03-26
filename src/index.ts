import {ICommonArguments} from "./spammer/interfaces/arguments.interface";
import QueueSpammer from "./spammer/queue-spammer";
import ConnectorFactory from "./connectors/connector.factory";
import {Answers} from "inquirer";
import yargs = require('yargs');
import ora = require('ora');
import inquirer = require('inquirer');

require('dotenv').config();

const argv: any = yargs.options({
    connector: {
        type: "string",
        alias: "c",
        description: 'Queue connector to be used'
    },
    file: {
        type: "string",
        alias: "f",
        description: "Path of JSON file to be sent"
    },
    json: {
        type: "string",
        alias: "j",
        description: "JSON string as input"
    },
    howmany: {
        type: "number",
        default: 1,
        alias: "n",
        description: "How many messages to send"
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
        if (answers.connector) CLIArguments.connector = answers.connector;
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
        spinner.start("Processing your request...\n");
        queueSpammer.run();

        spinner.succeed("Your messages have been sent");
    } catch (e) {
        spinner.fail(e.toString());
        process.exit(1);
    }
};

runProcess(argv);
