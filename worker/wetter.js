const {Client, logger, Variables} = require("camunda-external-task-client-js"),
    path = require('path'),
    request = require('request'),
    camCommon = require(path.resolve(__dirname, "./common.js"));


const config = {baseUrl: "http://localhost:8080/engine-rest", use: logger, asyncResponseTimeout: 5000};

const client = new Client(config);


client.on("poll:start", function () {
    camCommon.log('Polling started');
});

client.subscribe("wetter", async function ({task, taskService}) {
    const options = {
        url: 'https://api.bnz-power.com/camunda/hackday/wetter',
        method: 'GET'
    };

    request(options, function (err, res, body) {
        const processVariables = new Variables();
        processVariables.set("weather", JSON.parse(body));
        taskService.complete(task, processVariables);
    });
});