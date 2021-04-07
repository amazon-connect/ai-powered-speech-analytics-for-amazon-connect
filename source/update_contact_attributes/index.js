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

'use strict';
const AWS = require('aws-sdk');
 
var Service = AWS.Service;
var apiLoader = AWS.apiLoader;
apiLoader.services['connect'] = {};
AWS.Connect = Service.defineService('connect', ['2017-08-08']); Object.defineProperty(apiLoader.services['connect'], '2017-08-08', { get: function get() { var model = JSON.parse(`{"version":"2.0","metadata":{"apiVersion":"2017-08-08","endpointPrefix":"connect","jsonVersion":"1.1","protocol":"rest-json","serviceAbbreviation":"AmazonConnect","serviceFullName":"AWSAmazonConnectService","signatureVersion":"v4","signingName":"connect","uid":"amazonconnectservice-2017-08-08"}, "operations": { "CreateUser": { "http": { "method": "PUT", "requestUri": "/users/{InstanceId}" }, "input": { "type": "structure", "required": [ "Username", "PhoneConfig", "SecurityProfileIds", "RoutingProfileId", "InstanceId" ], "members": { "Username": {}, "Password": {}, "IdentityInfo": { "shape": "S4" }, "PhoneConfig": { "shape": "S8" }, "DirectoryUserId": {}, "SecurityProfileIds": { "shape": "Se" }, "RoutingProfileId": {}, "HierarchyGroupId": {}, "InstanceId": { "location": "uri", "locationName": "InstanceId" } } }, "output": { "type": "structure", "members": { "UserId": {}, "UserArn": {} } } }, "DeleteUser": { "http": { "method": "DELETE", "requestUri": "/users/{InstanceId}/{UserId}" }, "input": { "type": "structure", "required": [ "InstanceId", "UserId" ], "members": { "InstanceId": { "location": "uri", "locationName": "InstanceId" }, "UserId": { "location": "uri", "locationName": "UserId" } } } }, "DescribeUser": { "http": { "method": "GET", "requestUri": "/users/{InstanceId}/{UserId}" }, "input": { "type": "structure", "required": [ "UserId", "InstanceId" ], "members": { "UserId": { "location": "uri", "locationName": "UserId" }, "InstanceId": { "location": "uri", "locationName": "InstanceId" } } }, "output": { "type": "structure", "members": { "User": { "type": "structure", "members": { "Id": {}, "Arn": {}, "Username": {}, "IdentityInfo": { "shape": "S4" }, "PhoneConfig": { "shape": "S8" }, "DirectoryUserId": {}, "SecurityProfileIds": { "shape": "Se" }, "RoutingProfileId": {}, "HierarchyGroupId": {} } } } } }, "DescribeUserHierarchyGroup": { "http": { "method": "GET", "requestUri": "/user-hierarchy-groups/{InstanceId}/{HierarchyGroupId}" }, "input": { "type": "structure", "required": [ "HierarchyGroupId", "InstanceId" ], "members": { "HierarchyGroupId": { "location": "uri", "locationName": "HierarchyGroupId" }, "InstanceId": { "location": "uri", "locationName": "InstanceId" } } }, "output": { "type": "structure", "members": { "HierarchyGroup": { "type": "structure", "members": { "Id": {}, "Arn": {}, "Name": {}, "LevelId": {}, "HierarchyPath": { "type": "structure", "members": { "LevelOne": { "shape": "Sw" }, "LevelTwo": { "shape": "Sw" }, "LevelThree": { "shape": "Sw" }, "LevelFour": { "shape": "Sw" }, "LevelFive": { "shape": "Sw" } } } } } } } }, "DescribeUserHierarchyStructure": { "http": { "method": "GET", "requestUri": "/user-hierarchy-structure/{InstanceId}" }, "input": { "type": "structure", "required": [ "InstanceId" ], "members": { "InstanceId": { "location": "uri", "locationName": "InstanceId" } } }, "output": { "type": "structure", "members": { "HierarchyStructure": { "type": "structure", "members": { "LevelOne": { "shape": "S10" }, "LevelTwo": { "shape": "S10" }, "LevelThree": { "shape": "S10" }, "LevelFour": { "shape": "S10" }, "LevelFive": { "shape": "S10" } } } } } }, "GetFederationToken": { "http": { "method": "GET", "requestUri": "/user/federate/{InstanceId}" }, "input": { "type": "structure", "required": [ "InstanceId" ], "members": { "InstanceId": { "location": "uri", "locationName": "InstanceId" } } }, "output": { "type": "structure", "members": { "Credentials": { "type": "structure", "members": { "AccessToken": { "shape": "S15" }, "AccessTokenExpiration": { "type": "timestamp" }, "RefreshToken": { "shape": "S15" }, "RefreshTokenExpiration": { "type": "timestamp" } } } } } }, "ListRoutingProfiles": { "http": { "method": "GET", "requestUri": "/routing-profiles-summary/{InstanceId}" }, "input": { "type": "structure", "required": [ "InstanceId" ], "members": { "InstanceId": { "location": "uri", "locationName": "InstanceId" }, "NextToken": { "location": "querystring", "locationName": "nextToken" }, "MaxResults": { "location": "querystring", "locationName": "maxResults", "type": "integer" } } }, "output": { "type": "structure", "members": { "RoutingProfileSummaryList": { "type": "list", "member": { "type": "structure", "members": { "Id": {}, "Arn": {}, "Name": {} } } }, "NextToken": {} } } }, "ListSecurityProfiles": { "http": { "method": "GET", "requestUri": "/security-profiles-summary/{InstanceId}" }, "input": { "type": "structure", "required": [ "InstanceId" ], "members": { "InstanceId": { "location": "uri", "locationName": "InstanceId" }, "NextToken": { "location": "querystring", "locationName": "nextToken" }, "MaxResults": { "location": "querystring", "locationName": "maxResults", "type": "integer" } } }, "output": { "type": "structure", "members": { "SecurityProfileSummaryList": { "type": "list", "member": { "type": "structure", "members": { "Id": {}, "Arn": {}, "Name": {} } } }, "NextToken": {} } } }, "ListUserHierarchyGroups": { "http": { "method": "GET", "requestUri": "/user-hierarchy-groups-summary/{InstanceId}" }, "input": { "type": "structure", "required": [ "InstanceId" ], "members": { "InstanceId": { "location": "uri", "locationName": "InstanceId" }, "NextToken": { "location": "querystring", "locationName": "nextToken" }, "MaxResults": { "location": "querystring", "locationName": "maxResults", "type": "integer" } } }, "output": { "type": "structure", "members": { "UserHierarchyGroupSummaryList": { "type": "list", "member": { "shape": "Sw" } }, "NextToken": {} } } }, "ListUsers": { "http": { "method": "GET", "requestUri": "/users-summary/{InstanceId}" }, "input": { "type": "structure", "required": [ "InstanceId" ], "members": { "InstanceId": { "location": "uri", "locationName": "InstanceId" }, "NextToken": { "location": "querystring", "locationName": "nextToken" }, "MaxResults": { "location": "querystring", "locationName": "maxResults", "type": "integer" } } }, "output": { "type": "structure", "members": { "UserSummaryList": { "type": "list", "member": { "type": "structure", "members": { "Id": {}, "Arn": {}, "Username": {} } } }, "NextToken": {} } } }, "StartOutboundVoiceContact": { "http": { "method": "PUT", "requestUri": "/contact/outbound-voice" }, "input": { "type": "structure", "required": [ "DestinationPhoneNumber", "ContactFlowId", "InstanceId" ], "members": { "DestinationPhoneNumber": {}, "ContactFlowId": {}, "InstanceId": {}, "ClientToken": { "idempotencyToken": true }, "SourcePhoneNumber": {}, "QueueId": {}, "Attributes": { "shape": "S1u" } } }, "output": { "type": "structure", "members": { "ContactId": {} } } }, "StopContact": { "http": { "requestUri": "/contact/stop" }, "input": { "type": "structure", "required": [ "ContactId", "InstanceId" ], "members": { "ContactId": {}, "InstanceId": {} } }, "output": { "type": "structure", "members": {} } }, "UpdateContactAttributes": { "http": { "requestUri": "/contact/attributes" }, "input": { "type": "structure", "required": [ "InitialContactId", "InstanceId", "Attributes" ], "members": { "InitialContactId": {}, "InstanceId": {}, "Attributes": { "shape": "S1u" } } }, "output": { "type": "structure", "members": {} } }, "UpdateUserHierarchy": { "http": { "requestUri": "/users/{InstanceId}/{UserId}/hierarchy" }, "input": { "type": "structure", "required": [ "UserId", "InstanceId" ], "members": { "HierarchyGroupId": {}, "UserId": { "location": "uri", "locationName": "UserId" }, "InstanceId": { "location": "uri", "locationName": "InstanceId" } } } }, "UpdateUserIdentityInfo": { "http": { "requestUri": "/users/{InstanceId}/{UserId}/identity-info" }, "input": { "type": "structure", "required": [ "IdentityInfo", "UserId", "InstanceId" ], "members": { "IdentityInfo": { "shape": "S4" }, "UserId": { "location": "uri", "locationName": "UserId" }, "InstanceId": { "location": "uri", "locationName": "InstanceId" } } } }, "UpdateUserPhoneConfig": { "http": { "requestUri": "/users/{InstanceId}/{UserId}/phone-config" }, "input": { "type": "structure", "required": [ "PhoneConfig", "UserId", "InstanceId" ], "members": { "PhoneConfig": { "shape": "S8" }, "UserId": { "location": "uri", "locationName": "UserId" }, "InstanceId": { "location": "uri", "locationName": "InstanceId" } } } }, "UpdateUserRoutingProfile": { "http": { "requestUri": "/users/{InstanceId}/{UserId}/routing-profile" }, "input": { "type": "structure", "required": [ "RoutingProfileId", "UserId", "InstanceId" ], "members": { "RoutingProfileId": {}, "UserId": { "location": "uri", "locationName": "UserId" }, "InstanceId": { "location": "uri", "locationName": "InstanceId" } } } }, "UpdateUserSecurityProfiles": { "http": { "requestUri": "/users/{InstanceId}/{UserId}/security-profiles" }, "input": { "type": "structure", "required": [ "SecurityProfileIds", "UserId", "InstanceId" ], "members": { "SecurityProfileIds": { "shape": "Se" }, "UserId": { "location": "uri", "locationName": "UserId" }, "InstanceId": { "location": "uri", "locationName": "InstanceId" } } } } }, "shapes": { "S4": { "type": "structure", "members": { "FirstName": {}, "LastName": {}, "Email": {} } }, "S8": { "type": "structure", "required": [ "PhoneType" ], "members": { "PhoneType": {}, "AutoAccept": { "type": "boolean" }, "AfterContactWorkTimeLimit": { "type": "integer" }, "DeskPhoneNumber": {} } }, "Se": { "type": "list", "member": {} }, "Sw": { "type": "structure", "members": { "Id": {}, "Arn": {}, "Name": {} } }, "S10": { "type": "structure", "members": { "Id": {}, "Arn": {}, "Name": {} } }, "S15": { "type": "string", "sensitive": true }, "S1u": { "type": "map", "key": {}, "value": {} } }}`); model.paginators = {}; return model; }, enumerable: true, configurable: true });

const connect = new AWS.Connect();


exports.handler = (event, context, callback) => {
    console.log("incoming event: " + JSON.stringify(event));
    
    var payload = JSON.parse(event.body);

    var contactId = payload.contactId;
    var instanceId = process.env.INSTANCE_ID;
    var attributes={};
    attributes.aid = '-';
    attributes.sak = '-';
    attributes.sst = '-';
    attributes.customerSentiment = payload.attributes.customerSentiment;
    attributes.customerSentimentScore = payload.attributes.customerSentimentScore;
    var contactId = payload.contactId;
    
    var params = {
        Attributes: attributes,
        InitialContactId: contactId,
        InstanceId: instanceId
    };

    connect.updateContactAttributes(params, function (err, res) {
        console.log("we are about to update the record");

        if (err) {
             console.log("Error response: ", err);
        } else {
            console.log("Response JSON: ", JSON.stringify(res));
            uploadFileOnS3(contactId, payload.attributes.customerTranscript, callback);
        }
    });
};


function uploadFileOnS3(contactId, transcript, cb){
    var bucketName = process.env.bucketname;
    contactId += ".txt";
    var S3=  new AWS.S3({params: {Bucket: bucketName + "/transcripts"}});
    var params = {
      Key: contactId,
      ContentType:'text/plain',
      Body: transcript,
    };
    S3.upload(params, function (err, res) {               
        if(err)
            console.log("Error in uploading file on s3 due to "+ err);
        else{    
            console.log("File successfully uploaded.--> ", contactId );
			res.statusCode=200;
			cb(null, 
			{
				statusCode: 200,
				body: JSON.stringify(res),
				headers: {
    						"Access-Control-Allow-Origin" : "*",
    						"Access-Control-Allow-Credentials" : true
   					}
			});
        }
    });
}
