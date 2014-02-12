var twilio = require('twilio')('AC6fce2fb8441b4279897882f82ad80ed3', 'c1805ed5bd9fc3a8d17a200688421600');
var twiliolib = require('twilio');
require('cloud/app.js');
 
 
Parse.Cloud.define("receiveSMS", function(request, response) {
    console.log("Received a new text: " + request.params.From);
 
    var id = request.params.id;
    var numberTo = request.params.From;
 
    xmasMixer.getRemix(numberTo, id, response);
 
     
});
 
Parse.Cloud.define("radio2", function(request, response) {
    console.log("Received a new text: " + request.params.From);
 
    var body = request.params.Body;
    var numberTo = request.params.From;
    if(body.toUpperCase().indexOf("RADIO2") != -1){

    	//then strip RADIO2

    	var data = body.replace("RADIO2", "")

    	console.log(data)



    	twilio.sendSms({
            to: numberTo, 
            from: '+441633538987', 
            body: 'YAY'
        }, function(err, responseData) { 
            if (err) {
              console.log(err);
            } else { 
              console.log(responseData.from); 
              console.log(responseData.body);
            }
          }
        );
     }else{
     	twilio.sendSms({
            to: numberTo, 
            from: '+441633538987', 
            body: 'wrong entry'
        }, function(err, responseData) { 
            if (err) {
              console.log(err);
            } else { 
              console.log(responseData.from); 
              console.log(responseData.body);
            }
          }
        );
        
     }
     response.success();
     
});
