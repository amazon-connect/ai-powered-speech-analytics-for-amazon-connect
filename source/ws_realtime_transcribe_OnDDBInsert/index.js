/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT-0
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var AWS = require('aws-sdk');
AWS.config.update({ region: process.env.AWS_REGION });
var DDB = new AWS.DynamoDB({ apiVersion: "2012-10-08" });

require('./lib/apigatewaymanagementapi-patch.js');

exports.handler = function (event, context, callback) {

  console.log(JSON.stringify(event));

  var scanParams = {
    TableName: process.env.TABLE_NAME,
    ProjectionExpression: "connectionId,contactID"
  };

  DDB.scan(scanParams, function (err, data) {
    if (err) {
      callback(null, {
        statusCode: 500,
        body: JSON.stringify(err)
      });
    } else {
      var apigwManagementApi = new AWS.ApiGatewayManagementApi({
        apiVersion: "2018-11-29",
        endpoint: process.env.DOMAIN_NAME + "/" + process.env.STAGE_NAME
      });

      var st = "";
      var bool ;
      var segId = "";
      //Assuming we will always get ONLY 1 record based on the trigger setup
      var contactID = event.Records[0].dynamodb.Keys.ContactId.S.toString();
      event.Records.forEach(function (element){
        /*try{
          st = st + element.dynamodb.OldImage.Transcript.S;
        }catch(e){
          
        }*/
        try{
          st = element.dynamodb.NewImage.Transcript.S;
          bool = element.dynamodb.NewImage.IsPartial.BOOL;
          segId = element.dynamodb.NewImage.SegmentId.S;
        }catch(e){
          
        }
      });
      var postParams = {
        Data: st + '@' + bool + '@' + segId
      };
      var count = 0;

      data.Items.forEach(function (element) {
        console.log(JSON.stringify(element));
        postParams.ConnectionId = element.connectionId.S;
        console.log('Sending data to connection id : ' + element.connectionId.S);
        try{
            console.log("contactID -> " + contactID + " element.contactID.S -> " + element.contactID.S);
            if(contactID == element.contactID.S){
              console.log("Match found, sending the data");
              apigwManagementApi.postToConnection(postParams, function (err) {
                if (err) {
                  // API Gateway returns a status of 410 GONE when the connection is no
                  // longer available. If this happens, we simply delete the identifier
                  // from our DynamoDB table.
                  if (err.statusCode === 410) {
                    console.log("Found stale connection, deleting " + postParams.connectionId);
                    DDB.deleteItem({ TableName: process.env.TABLE_NAME,
                                     Key: { connectionId: { S: postParams.connectionId } } });
                  } else {
                    console.log("Failed to post. Error: " + JSON.stringify(err));
                  }
                } else {
                  count++;
                }
              }); 
            }
        }catch(e){
          
        }
        

      });

      callback(null, {
        statusCode: 200,
        body: "Data send to " + count + " connection" + (count === 1 ? "" : "s")
      });
    }
  });
};


