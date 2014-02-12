var nitro = require('./nitro-client'),
    progs = require('./programmes-client'),
    _ = require('underscore'),
    async = require('async'),
    moment = require('moment');


function getTrackListFromVersion(pid, callback) {

    progs.getVersion(pid, function(data) {

        var out = [];

        if (data.version) {
            data.version.segment_events.forEach(function(segmentEvent) {
                if (segmentEvent.segment) {

                    var segment = segmentEvent.segment;

                    var trackOut = {
                        "artist": segment.artist,
                        "title": segment.track_title,
                        "snippet": segment.snippet_url
                        // "start-time": "2014-02-08T08:08:00Z"
                    };

                    if (segment.record_id) {
                        trackOut.image = "http://www.bbc.co.uk/music/images/records/96x96/" + segment.record_id;
                    }

                    out.push(trackOut);

                }
            });
        }


        callback(out);
    });

}


function getVersionPidFromBroadcast(broadcast) {
    if (broadcast.broadcast_of instanceof Array) {

        var data = _.find(broadcast.broadcast_of, function(x) { return x.result_type == 'version'; });

        if (data && data.pid) {
            return data.pid;
        }
    }
}


/**
 * Find for 24 hour period.
 * @param  {Date}   date
 * @param  {Function} callback
 */
exports.findByDay = function(date, callback) {
    exports.findByDateRange(date, moment(date).add('d', 1).toDate(), callback);
};


/**
 * Find BBC Radio 2 programmes between two date ranges
 * @param  {Date}   dateStart
 * @param  {Date}   dateEnd
 * @param  {Function} callback
 */
exports.findByDateRange = function(dateStart, dateEnd, callback) {
    nitro.getBroadcasts(dateStart, dateEnd, function(body) {

        var out = {
            "dateStart": dateStart,
            "dateEnd": dateEnd,
            "station": "radio2",
            results: []
        },


        processBroadcast = function(broadcast, done) {

            var episode = broadcast.ancestors_titles.episode,
            brand = broadcast.ancestors_titles.brand,

            episodeOut = {
                "pid": broadcast.ancestors_titles.episode.pid,
                "broadcast-start": broadcast.published_time.start,
                "broadcast-end": broadcast.published_time.end,
                // "image": "http://ichef.bbci.co.uk/images/ic/640x360/p01rlf4v.jpg",
                "image": broadcast.image.template_url.replace('$recipe', '640x360'),
                "title": episode.title,
                "url": "http://www.bbc.co.uk/programmes/" + episode.pid
            };

            if (brand) {
                episodeOut.brand = {
                    "pid": brand.pid,
                    "url": "http://www.bbc.co.uk/programmes/" + brand.pid,
                    "title": brand.title
                };
            }



            // get track list
            var versionPid = getVersionPidFromBroadcast(broadcast);

            if (versionPid) {
                getTrackListFromVersion(versionPid, function(trackList) {

                    if (trackList) {
                        episodeOut.tracks = trackList;
                    }

                    out.results.push(episodeOut);

                    done();
                });
            }

        };


        async.eachLimit(body.nitro.results.items, 3, processBroadcast, function(err) {

            if (err) {
                console.error('error', err);

            } else {
                callback(out);
            }

        });


    });
};


// exports.findByDay(moment('2014-01-01', 'YYYY-MM-DD').toDate(), function(response) {


//     console.log('output', JSON.stringify(response));
// });


// progs.getVersion('b03trnlt', function(data) {
//     console.log('progrs data', JSON.stringify(data));
// });


// getTrackListFromVersion('b03trnlt', function(data) {
//     console.log('track list data', data);
// });
