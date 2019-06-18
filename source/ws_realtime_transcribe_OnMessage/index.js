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

var AWS = require('aws-sdk');
var validator = require('validator');
AWS.config.update({ region: process.env.AWS_REGION });
var DDB = new AWS.DynamoDB({ apiVersion: "2012-10-08" });

exports.handler = function (event, context, callback) {
	var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
	var message = JSON.parse(event.body).data;
	console.log(message);
	var a = message.split("|");
	console.log(a[0]);
	var connId = a[0].split("@")[1];
	var contactID = a[1].split("@")[1];
  if(connId.length !== 16 || !validator.isUUID(contactID)) {
    console.log("Input validation error on connId ("+connId+") or contactID ("+contactID+")");
    const response = {
        statusCode: 502,
        body: 'Input validation error for Connection ID or Contact ID '
    };
    callback(null, response);
  }
  console.log(connId + " : " + contactID);
	var params = {
	    TableName: process.env.TABLE_NAME,
	    Item: {
	        'connectionId' : {S: connId},
	        'contactID' : {S: contactID}
        }
    };
	console.log(params);
	ddb.putItem(params, function(err, data) {
	if (err) {
	        console.log("Error", err);
            const response = {
                statusCode: 502,
                body: JSON.stringify('failed to insert ' + JSON.stringify(err))
            };
            callback(null, response);
        } else {
            console.log("Success", data);
            const response = {
                statusCode: 200,
                body: JSON.stringify('Updated connectionId successfully')
            };
            callback(null, response);
        }
	});
};
