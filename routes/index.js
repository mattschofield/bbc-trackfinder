var fs = require('fs')
  , path = require('path')
  , request = require('request');

/*
 * GET home page.
 */

var tempResults = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/results.json')))

exports.index = function(req, res){

  request("http://www.bbc.co.uk/frameworks/barlesque/orb/webservice.json", function (err, response, body) {
    var barlesque = JSON.parse(body).barlesque;

    res.locals.barlesque = barlesque;

    res.render('index', { title: 'Express', results: tempResults.results, log: console.log });
  })

};