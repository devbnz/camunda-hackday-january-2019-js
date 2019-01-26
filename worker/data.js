const {Client, logger, Variables} = require("camunda-external-task-client-js"),
    request = require('request'),
    path = require('path'),
    camCommon = require(path.resolve(__dirname, "./common.js"));

const config = {baseUrl: "http://localhost:8095/rest", use: logger, asyncResponseTimeout: 5000};


const client = new Client(config);

client.subscribe("news", async function ({task, taskService}) {
    const options = {
        url: 'https://api.bnz-power.com/camunda/hackday/news',
        method: 'GET'
    };

    request(options, function (err, res, body) {
        let json = JSON.parse(body);
        const processVariables = new Variables();
        processVariables.set("news", json.items[0].title);
        taskService.complete(task, processVariables);
    });
});