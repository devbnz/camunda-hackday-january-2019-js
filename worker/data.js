const {Client, logger, Variables} = require("camunda-external-task-client-js"),
    request = require('request');

const config = {baseUrl: "http://localhost:8095/rest", use: logger, asyncResponseTimeout: 5000};
const client = new Client(config);

client.subscribe("news", async function ({task, taskService}) {
    const options = {
        url: 'URL',
        method: 'GET'
    };

    request(options, function (err, res, body) {
        let json = JSON.parse(body);
        const processVariables = new Variables();
        let num = Math.floor(Math.random() * 10) + 1;
        processVariables.set("news", json.items[num].title);
        taskService.complete(task, processVariables);
    });
});