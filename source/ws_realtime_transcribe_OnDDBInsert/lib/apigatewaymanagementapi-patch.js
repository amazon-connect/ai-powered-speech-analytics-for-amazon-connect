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

require('aws-sdk/lib/node_loader');
var AWS = require('aws-sdk/lib/core');
var Service = AWS.Service;
var apiLoader = AWS.apiLoader;

apiLoader.services['apigatewaymanagementapi'] = {};
AWS.ApiGatewayManagementApi = Service.defineService('apigatewaymanagementapi', ['2018-11-29']);
Object.defineProperty(apiLoader.services['apigatewaymanagementapi'], '2018-11-29', {
  get: function get() {
    var model = {
      "metadata": {
        "apiVersion": "2018-11-29",
        "endpointPrefix": "execute-api",
        "signingName": "execute-api",
        "serviceFullName": "AmazonApiGatewayManagementApi",
        "serviceId": "ApiGatewayManagementApi",
        "protocol": "rest-json",
        "jsonVersion": "1.1",
        "uid": "apigatewaymanagementapi-2018-11-29",
        "signatureVersion": "v4"
      },
      "operations": {
        "PostToConnection": {
          "http": {
            "requestUri": "/@connections/{connectionId}",
            "responseCode": 200
          },
          "input": {
            "type": "structure",
            "members": {
              "Data": {
                "type": "blob"
              },
              "ConnectionId": {
                "location": "uri",
                "locationName": "connectionId"
              }
            },
            "required": [
              "ConnectionId",
              "Data"
            ],
            "payload": "Data"
          }
        }
      },
      "shapes": {}
    }
    model.paginators = {
      "pagination" : { }
    }
    return model;
  },
  enumerable: true,
  configurable: true
});

module.exports = AWS.ApiGatewayManagementApi;
