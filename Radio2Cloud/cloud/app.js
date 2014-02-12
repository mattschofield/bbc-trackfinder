var twilio = require('twilio')('AC6fce2fb8441b4279897882f82ad80ed3', 'c1805ed5bd9fc3a8d17a200688421600');
var twiliolib = require('twilio');
// These two lines are required to initialize Express in Cloud Code.
var express = require('express');
var app = express();


// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body

// This is an example of hooking up a request handler with a specific request
// path and HTTP verb using the Express routing API.
app.get('/hello', function(req, res) {
  res.render('hello', { message: 'Congrats, you just set up your app!' });
});

// This is an example of hooking up a request handler with a specific request
// path and HTTP verb using the Express routing API.
app.post('/track', function(req, res) {
    
    var trackUrl = "http://static.bbci.co.uk/snippets/segments/cb/p002j9cb_noisrc_imeldamay_bigbadhandsomeman.mp3";

    var twiml = new twiliolib.TwimlResponse();
    res.send(twiml.play(trackUrl).toString());  

});

// // Example reading from the request query string of an HTTP get request.
// app.get('/test', function(req, res) {
//   // GET http://example.parseapp.com/test?message=hello
//   res.send(req.query.message);
// });

// // Example reading from the request body of an HTTP post request.
// app.post('/test', function(req, res) {
//   // POST http://example.parseapp.com/test (with request body "message=hello")
//   res.send(req.body.message);
// });

// Attach the Express app to Cloud Code.
app.listen();
