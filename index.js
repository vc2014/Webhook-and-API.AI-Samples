"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/echo", function(req, res) {
  var intent = 
	req.body.queryResult &&
	req.body.queryResult.intent &&
	req.body.queryResult.intent.DisplayName 
		? req.body.queryResult.intent.DisplayName
		: "intent not picked"
  var speech =
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.echoText
      ? req.body.queryResult.parameters.echoText
      : "Seems like some problem. Speak again.";

  console.log("intent :" + intent)
  console.log("text :" + speech)
  sendTextMessage(req,res)
});

function sendCard(req, res){
	var cardTitle = 'test'
	var cardSubTitle = 'test'
	var buttonText = 'button';
	return res.json({
    fulfillmentText: cardTitle,
	fulfillmentMessages: [
    {
      card: {
        title: cardTitle,
        subtitle: cardSubTitle,
        imageUri: "https://assistant.google.com/static/images/molecule/Molecule-Formation-stop.png",
        buttons: [
          {
            text: buttonText,
            postback: "https://assistant.google.com/"
          }
        ]
      }
    }
  ],
    source: "webhook-echo-sample"
  }); 
}

function sendTextMessage(req,res){
	return res.json({
	  fulfillmentText: "text response",
	  fulfillmentMessages: [
		{
		  text: [
			"text response"
		  ],
		}
	  ],
	  source: "webhook-echo-sample",
	  payload: {
		google: {
		  expectUserResponse: true,
		  richResponse: {
			items: [
			  {
				simpleResponse: {
				  "textToSpeech": "this is a simple response"
				}
			  }
			]
		  }
		},
		facebook: {
		  text: "Hello, Facebook!"
		},
		slack: {
		  text: "This is a text response for Slack."
		}
	  }
	});
}

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
