const {Client, logger, Variables} = require("camunda-external-task-client-js"),
    request = require('request');

const config = {baseUrl: "http://localhost:8095/rest", use: logger, asyncResponseTimeout: 5000};
const client = new Client(config);

client.subscribe("weather", async function ({task, taskService}) {
    const options = {
        url: 'URL',
        method: 'GET'
    };

    request(options, function (err, res, body) {
        const processVariables = new Variables();
        processVariables.set("weather", body);
        taskService.complete(task, processVariables);
    });
});
