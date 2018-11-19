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
        platform: "ACTIONS_ON_GOOGLE",
        simpleResponses: {
          simpleResponses: [
            {
              textToSpeech: "I am checking the weather .... wait sometime"
            }
          ]
        }
      },
      {
        text: {
          text: [
            "I am checking the weather .... wait sometime"
          ]
        },
        platform: "SLACK"
      },
      {
        text: {
          text: [
            "Text"
          ]
        },
        platform: "SLACK"
      },
      {
        platform: "ACTIONS_ON_GOOGLE",
        simpleResponses: {
          simpleResponses: [
            {
              textToSpeech: "Text"
            }
          ]
        }
      },
      {
		  text: {
          text: [
            "I am checking the weather .... wait sometime"
          ]
        }
      }
    ],
  source: "webhook-echo-sample",
  
});
}

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
