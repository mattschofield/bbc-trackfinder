// /progs client

var request = require('request'),
    qs = require('qs');


function getProgrammes(path, callback) {

    var url = 'http://www.stage.bbc.co.uk/programmes/';

    url += path;

    var options = {
        'url': url,
        'json': true,
        'proxy': process.env.http_proxy || process.env.HTTP_PROXY,
        'timeout': 3000 // 3 secs
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            callback(body);
        }
    });

}


exports.getVersion = function(versionPid, callback) {

    getProgrammes(versionPid + '.json', callback);

};
