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

require('aws-sdk/clients/apigatewaymanagementapi');

exports.handler = function (event, context, callback) {
    
    console.log(JSON.stringify(event));
    var apigwManagementApi = new AWS.ApiGatewayManagementApi({
        apiVersion: "2018-11-29",
        endpoint: event.requestContext.domainName + "/" + event.requestContext.stage
    });
    var postParams = {
        Data: '{"connectionId":"' + event.requestContext.connectionId + '"}'
      };
      postParams.ConnectionId = event.requestContext.connectionId;
      apigwManagementApi.postToConnection(postParams, function (err) {
        if (err) {
          // API Gateway returns a status of 410 GONE when the connection is no
          // longer available. 
          if (err.statusCode === 410) {
            console.log("Found stale connection, deleting " + postParams.connectionId);
          } else {
            console.log("Failed to post. Error: " + JSON.stringify(err));
          }
        } 
      }); 
    //we need to send this to capture the connectionId on the client side
    const response = {
        statusCode: 200,
        body: JSON.stringify('Default route, not supported!'),
    };
    return response;
};
