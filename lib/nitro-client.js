// client for nitro

var request = require('request'),
    qs = require('qs'),

apiKey = process.env.nitro_apikey || '',


serviceId = 'bbc_radio_two';


// http://d.bbc.co.uk/stage/nitro/api/broadcasts?api_key=xxxxxxxx&sid=bbc_radio_two&start_from=2014-02-12T00:00:00Z&start_to=2014-02-12T23:59:59Z&sort=start_date&sort_direction=ascending&mixin=titles&page_size=20


function getNitro(path, params, callback) {

    var url = 'http://d.bbc.co.uk/stage/nitro/api';

    url += path + '?' + qs.stringify(params);

    var options = {
        'url': url,
        'json': true,
        'proxy': process.env.http_proxy || process.env.HTTP_PROXY,
        'timeout': 3000 // 3 secs
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            callback(body);
        } else {
            console.error('Nitro error: ', error, body);
        }
    });


}


exports.getBroadcasts = function(date, callback) {

    var params = {
        'api_key': apiKey,
        'sid': serviceId,
        'sort': 'start_date',
        'sort_direction': 'ascending',
        'mixin': 'titles',
        'page_size': 20
    };

    params.start_from = '2014-02-12T00:00:00Z';
    params.start_to = '2014-02-12T23:59:59Z';


    getNitro('/broadcasts', params, callback);

};
