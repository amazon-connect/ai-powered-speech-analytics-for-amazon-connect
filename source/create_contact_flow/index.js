/**********************************************************************************************************************
 *  Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved                                            *
 *                                                                                                                    *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated      *
 *  documentation files (the "Software"), to deal in the Software without restriction, including without limitation   *
 *  the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and  *
 *  to permit persons to whom the Software is furnished to do so.                                                     *
 *                                                                                                                    *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO  *
 *  THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE    *
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF         *
 *  CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS *
 *  IN THE SOFTWARE.                                                                                                  *
 **********************************************************************************************************************/
'use strict';

function createContactFlow(properties, callback) {
  if (!properties.bucketName)
    callback("Bucket name not specified");

  var aws = require("aws-sdk");
  var S3 = new aws.S3();

  console.log('Event Details', properties);
  var lambdaInitArn = properties.contactInitFunction;
  var lambdaTriggerArn = properties.kvsTriggerFunction;
  var bucketName = properties.bucketName;
  var mainFlowBody =   `{"modules":[{"id":"07273109-a75a-4742-aaae-ce35603c31fc","type":"PlayPrompt","branches":[{"condition":"Success","transition":"53e6aa2b-e374-4ae6-bfc9-1285d2ac202f"}],"parameters":[{"name":"Text","value":"This is the sample flow to demonstrate customer audio streaming.","namespace":null},{"name":"TextToSpeechType","value":"text"}],"metadata":{"position":{"x":43,"y":400},"useDynamic":false}},{"id":"856dd865-e5a0-49c6-aacc-55fe53c38a22","type":"SetLoggingBehavior","branches":[{"condition":"Success","transition":"07273109-a75a-4742-aaae-ce35603c31fc"}],"parameters":[{"name":"LoggingBehavior","value":"Enable"}],"metadata":{"position":{"x":42,"y":183}}},{"id":"53e6aa2b-e374-4ae6-bfc9-1285d2ac202f","type":"SetRecordingBehavior","branches":[{"condition":"Success","transition":"ef749801-72f5-4aa4-b28d-bd28ad8f052d"}],"parameters":[{"name":"RecordingBehaviorOption","value":"Enable"},{"name":"RecordingParticipantOption","value":"Both"}],"metadata":{"position":{"x":54,"y":587}}},{"id":"ef749801-72f5-4aa4-b28d-bd28ad8f052d","type":"InvokeExternalResource","branches":[{"condition":"Success","transition":"e7825b58-a9db-4935-9f83-e67a564176e8"},{"condition":"Error","transition":"e7825b58-a9db-4935-9f83-e67a564176e8"}],"parameters":[{"name":"FunctionArn","value":"${lambdaInitArn}","namespace":null},{"name":"TimeLimit","value":"8"}],"metadata":{"position":{"x":285,"y":33},"dynamicMetadata":{},"useDynamic":false},"target":"Lambda"},{"id":"e7825b58-a9db-4935-9f83-e67a564176e8","type":"SetAttributes","branches":[{"condition":"Success","transition":"de044ae9-5056-4c9a-a96e-b4d5b6ac27fb"},{"condition":"Error","transition":"de044ae9-5056-4c9a-a96e-b4d5b6ac27fb"}],"parameters":[{"name":"Attribute","value":"true","key":"transcribeCall","namespace":null},{"name":"Attribute","value":"true","key":"saveCallRecording","namespace":null},{"name":"Attribute","value":"aid","key":"aid","namespace":"External"},{"name":"Attribute","value":"sak","key":"sak","namespace":"External"},{"name":"Attribute","value":"sst","key":"sst","namespace":"External"}],"metadata":{"position":{"x":299,"y":273}}},{"id":"de044ae9-5056-4c9a-a96e-b4d5b6ac27fb","type":"GetUserInput","branches":[{"condition":"Evaluate","conditionType":"Equals","conditionValue":"1","transition":"8f76ffad-b7c2-4b71-8eb5-7d1e17c53a33"},{"condition":"Evaluate","conditionType":"Equals","conditionValue":"2","transition":"24e5d5ff-402d-416d-8d04-38020e7f0428"},{"condition":"Timeout","transition":"8f76ffad-b7c2-4b71-8eb5-7d1e17c53a33"},{"condition":"NoMatch","transition":"8f76ffad-b7c2-4b71-8eb5-7d1e17c53a33"},{"condition":"Error","transition":"8f76ffad-b7c2-4b71-8eb5-7d1e17c53a33"}],"parameters":[{"name":"Text","value":"Press 1 for English,  2 for Spanish","namespace":null},{"name":"TextToSpeechType","value":"text"},{"name":"Timeout","value":"5"},{"name":"MaxDigits","value":"1"}],"metadata":{"position":{"x":308,"y":504},"conditionMetadata":[{"id":"370756dc-3074-477b-a0e0-ce4cc19cb208","value":"1"},{"id":"9f1f0912-0606-4ea5-bc23-18ccabfaca8b","value":"2"}],"useDynamic":false},"target":"Digits"},{"id":"8f76ffad-b7c2-4b71-8eb5-7d1e17c53a33","type":"SetAttributes","branches":[{"condition":"Success","transition":"3434e4a0-e2c1-4c3a-9f52-81ae81a852e2"},{"condition":"Error","transition":"3434e4a0-e2c1-4c3a-9f52-81ae81a852e2"}],"parameters":[{"name":"Attribute","value":"en-US","key":"languageCode","namespace":null}],"metadata":{"position":{"x":560,"y":98}}},{"id":"24e5d5ff-402d-416d-8d04-38020e7f0428","type":"SetAttributes","branches":[{"condition":"Success","transition":"3434e4a0-e2c1-4c3a-9f52-81ae81a852e2"},{"condition":"Error","transition":"3434e4a0-e2c1-4c3a-9f52-81ae81a852e2"}],"parameters":[{"name":"Attribute","value":"es-US","key":"languageCode","namespace":null}],"metadata":{"position":{"x":584,"y":351}}},{"id":"04aacf02-1a6a-4df8-9a3b-5cce1d6e25a4","type":"Disconnect","branches":[],"parameters":[],"metadata":{"position":{"x":839,"y":686}}},{"id":"919982d6-3066-49e5-afe5-619896781245","type":"Transfer","branches":[{"condition":"AtCapacity","transition":"04aacf02-1a6a-4df8-9a3b-5cce1d6e25a4"},{"condition":"Error","transition":"04aacf02-1a6a-4df8-9a3b-5cce1d6e25a4"}],"parameters":[],"metadata":{"position":{"x":835,"y":447},"useDynamic":false,"queue":null},"target":"Queue"},{"id":"3434e4a0-e2c1-4c3a-9f52-81ae81a852e2","type":"SetQueue","branches":[{"condition":"Success","transition":"b7fdc484-ccf5-44eb-b89d-a070c6c40212"},{"condition":"Error","transition":"b7fdc484-ccf5-44eb-b89d-a070c6c40212"}],"parameters":[{"name":"Queue","value":"","namespace":null,"resourceName":"BasicQueue"}],"metadata":{"position":{"x":822,"y":58},"useDynamic":false,"queue":{"id":"","text":"BasicQueue"}}},{"id":"b7fdc484-ccf5-44eb-b89d-a070c6c40212","type":"SetContactFlow","branches":[{"condition":"Success","transition":"919982d6-3066-49e5-afe5-619896781245"}],"parameters":[{"name":"ContactFlowId","value":"","resourceName":"agentWhisperKvsStreamingSampleFlow"},{"name":"Type","value":"AgentWhisper"}],"metadata":{"position":{"x":830,"y":270},"contactFlow":{"id":"","text":"agentWhisperKvsStreamingSampleFlow","arn":null,"metricDetail":null,"resourceId":null}}}],"version":"1","type":"contactFlow","start":"856dd865-e5a0-49c6-aacc-55fe53c38a22","metadata":{"entryPointPosition":{"x":20,"y":20},"snapToGrid":false,"name":"kvsStreamingFlow","description":null,"type":"contactFlow","status":"published","hash":"af2c341655b2b855afeedc8b2e0acba7a02cb717a3acf386ab188a071264721a"}}`;
  
   S3.putObject({
         Bucket: bucketName,
         Key: 'kvsStreamingSampleFlow',
         Body: mainFlowBody
    }, function(err, data) {
   
      if (err)
        return callback(err);

      return callback(null, "SUCCESS");
  });

  var whisperFlowBody =   `{"modules":[{"id":"85367e82-3afe-49c1-8bc6-5f6548a81794","type":"SetAttributes","branches":[{"condition":"Success","transition":"95dc2179-0f18-4646-8e15-15377c9cbb29"},{"condition":"Error","transition":"95dc2179-0f18-4646-8e15-15377c9cbb29"}],"parameters":[{"name":"Attribute","value":"Success","key":"kvsTriggerLambdaResult","namespace":null}],"metadata":{"position":{"x":753,"y":227}}},{"id":"74b62683-fcac-47dd-91d4-90e38eaec358","type":"SetAttributes","branches":[{"condition":"Success","transition":"95dc2179-0f18-4646-8e15-15377c9cbb29"},{"condition":"Error","transition":"95dc2179-0f18-4646-8e15-15377c9cbb29"}],"parameters":[{"name":"Attribute","value":"Error","key":"kvsTriggerLambdaResult","namespace":null}],"metadata":{"position":{"x":759,"y":425}}},{"id":"7a7e765b-cd97-4438-a57b-eb8b8601bd97","type":"SetAttributes","branches":[{"condition":"Success","transition":"a0589c4d-e446-48d6-b8dc-d2a5c30667b1"},{"condition":"Error","transition":"a0589c4d-e446-48d6-b8dc-d2a5c30667b1"}],"parameters":[{"name":"Attribute","value":"Success","key":"startStreamingAudioStatus","namespace":null}],"metadata":{"position":{"x":261,"y":225}}},{"id":"a0589c4d-e446-48d6-b8dc-d2a5c30667b1","type":"InvokeExternalResource","branches":[{"condition":"Success","transition":"85367e82-3afe-49c1-8bc6-5f6548a81794"},{"condition":"Error","transition":"74b62683-fcac-47dd-91d4-90e38eaec358"}],"parameters":[{"name":"FunctionArn","value":"${lambdaTriggerArn}","namespace":null},{"name":"TimeLimit","value":"8"}],"metadata":{"position":{"x":485,"y":225},"dynamicMetadata":{},"useDynamic":false},"target":"Lambda"},{"id":"6ea4e539-5982-41c7-a0aa-e82c9fe45cf6","type":"SetAttributes","branches":[{"condition":"Success","transition":"d7b827de-9a0c-414c-81ba-00e55c3a5991"},{"condition":"Error","transition":"d7b827de-9a0c-414c-81ba-00e55c3a5991"}],"parameters":[{"name":"Attribute","value":"true","key":"transcribeCall","namespace":null}],"metadata":{"position":{"x":384,"y":21}}},{"id":"222caecc-c107-4553-87fc-85a74c34bb06","type":"PlayPrompt","branches":[{"condition":"Success","transition":"6ea4e539-5982-41c7-a0aa-e82c9fe45cf6"}],"parameters":[{"name":"Text","value":"$.Queue.Name","namespace":null},{"name":"TextToSpeechType","value":"text"}],"metadata":{"position":{"x":159,"y":29},"useDynamic":false}},{"id":"95dc2179-0f18-4646-8e15-15377c9cbb29","type":"Resume","branches":[],"parameters":[],"metadata":{"position":{"x":517,"y":645}}},{"id":"d7b827de-9a0c-414c-81ba-00e55c3a5991","type":"StartMediaStreaming","branches":[{"condition":"Success","transition":"7a7e765b-cd97-4438-a57b-eb8b8601bd97"},{"condition":"Error","transition":"e9db6800-4cc9-49d9-8cc0-9f6de835c3db"}],"parameters":[{"name":"ParticipantTypes","value":"Customer"},{"name":"MediaStreamTypes","value":"Audio"}],"metadata":{"position":{"x":30,"y":224}}},{"id":"e9db6800-4cc9-49d9-8cc0-9f6de835c3db","type":"SetAttributes","branches":[{"condition":"Success","transition":"95dc2179-0f18-4646-8e15-15377c9cbb29"},{"condition":"Error","transition":"95dc2179-0f18-4646-8e15-15377c9cbb29"}],"parameters":[{"name":"Attribute","value":"Failed","key":"startStreamingAudioStatus","namespace":null}],"metadata":{"position":{"x":261,"y":448}}}],"version":"1","type":"agentWhisper","start":"222caecc-c107-4553-87fc-85a74c34bb06","metadata":{"entryPointPosition":{"x":35,"y":17},"snapToGrid":false,"name":"agentWhisperKvsStreamingSampleFlow","description":"Default whisper played to the agent.","type":"agentWhisper","status":"published","hash":"4d108a50b6f2ebe06528000f91e7f804651b48ed9f0cde97400a0da0215935e6"}}`;
  S3.putObject({
    Bucket: bucketName,
    Key: 'agentWhisperKvsStreamingSampleFlow',
    Body: whisperFlowBody
  }, function(err, data) {

    if (err)
      return callback(err);

    return callback(null, "SUCCESS");
  });
}

createContactFlow.handler = function(event, context) {
  console.log(JSON.stringify(event, null, '  '));

  if (event.RequestType == 'Delete') {
    return sendResponse(event, context, "SUCCESS");
  }

  createContactFlow(event.ResourceProperties, function(err, result) {
    var status = err ? 'FAILED' : 'SUCCESS';
    return sendResponse(event, context, status, result, err);
  });
};

function getReason(err) {
  if (err)
    return err.message;
  else
    return '';
}


function sendResponse(event, context, status, data, err) {
  var responseBody = {
    StackId: event.StackId,
    RequestId: event.RequestId,
    LogicalResourceId: event.LogicalResourceId,
    PhysicalResourceId: context.logStreamName,
    Status: status,
    Reason: getReason(err) + " See details in CloudWatch Log: " + context.logStreamName,
  
  };

  console.log("RESPONSE:\n", responseBody);
  var json = JSON.stringify(responseBody);

  var https = require("https");
  var url = require("url");

  var parsedUrl = url.parse(event.ResponseURL);
  var options = {
    hostname: parsedUrl.hostname,
    port: 443,
    path: parsedUrl.path,
    method: "PUT",
    headers: {
      "content-type": "",
      "content-length": json.length
    }
  };

  var request = https.request(options, function(response) {
    console.log("STATUS: " + response.statusCode);
    console.log("HEADERS: " + JSON.stringify(response.headers));
    context.done(null, data);
  });

  request.on("error", function(error) {
    console.log("sendResponse Error:\n", error);
    context.done(error);
  });

  request.on("end", function() {
    console.log("end");
  });
  request.write(json);
  request.end();
}


module.exports = createContactFlow;

if(require.main === module) {
  console.log("called directly");
  if (process.argv.length < 3)
    usageExit();
  try {
    var data = JSON.parse(process.argv[2]);
  } catch (error) {
    console.error('Invalid JSON', error);
    usageExit();
  }
  createContactFlow(data, function(err, res) {
    console.log("Result", err, res);
  });
}

function usageExit() {
  var path = require('path');
  console.error('Usage: '  + path.basename(process.argv[1]) + ' json-array');
  process.exit(1);
}