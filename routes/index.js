var fs = require('fs')
  , path = require('path')
  , request = require('request')
  , moment = require('moment')
  , finder = require('../lib/finder');

/*
 * GET home page.
 */

var tempResults = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/results.json')))

exports.index = function(req, res){

  finder.findByDay(moment('2014-01-01', 'YYYY-MM-DD').toDate(), function (foundResults) {

    var options = {
      'url': "http://www.bbc.co.uk/frameworks/barlesque/orb/webservice.json",
      'proxy': process.env.http_proxy || process.env.HTTP_PROXY
    };

    request(options, function (err, response, body) {
      var barlesque = JSON.parse(body).barlesque;

      res.locals.barlesque = barlesque;

      res.render('index', { title: 'Express', results: foundResults.results, log: console.log });
    })
  })



};
