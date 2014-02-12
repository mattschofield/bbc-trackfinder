var fs = require('fs')
  , path = require('path');

/*
 * GET home page.
 */

var tempResults = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/results.json')))

exports.index = function(req, res){
  res.render('index', { title: 'Express', results: tempResults.results, log: console.log });
};