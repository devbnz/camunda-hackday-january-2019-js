const r = require('request'),
    p = require('request');

const service = {
    ajax: {
        promise: {
            get: function (url) {
                return new p(function (resolve, reject) {
                    console.log(url);
                    r(url, function (error, response, body) {
                        if (error) reject(error);
                        else {
                            resolve(body)
                        }
                    });
                });
            }
        }
    },
    log: function (msg, level) {
        var now = new Date(),
            pre = now.toISOString();

        if (!level) {
            level = 'INFO';
        }

        console.log(pre + ' ' + level + ' ' + msg);
    }
};

module.exports = service;