/*********************************************************************************************************************
 *  Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.                                           *
 *                                                                                                                    *
 *  Licensed under the Amazon Software License (the "License"). You may not use this file except in compliance        *
 *  with the License. A copy of the License is located at                                                             *
 *                                                                                                                    *
 *      http://aws.amazon.com/asl/                                                                                    *
 *                                                                                                                    *
 *  or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES *
 *  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions    *
 *  and limitations under the License.                                                                                *
 *********************************************************************************************************************/

/**
 * @author Solution Builders
 */

'use strict';

let AWS = require('aws-sdk');
let s3 = new AWS.S3();
const fs = require('fs');
var _downloadKey = 'AI-powered-speech-analytics-for-amazon-connect/${version}/web-site-manifest.json';
const _downloadLocation = '/tmp/web-site-manifest.json';

/**
 * Helper function to interact with s3 hosted website for cfn custom resource.
 *
 * @class websiteHelper
 */
let websiteHelper = (function() {

    /**
     * @class websiteHelper
     * @constructor
     */
    let websiteHelper = function() {};

    /**
     * Provisions the web site UI at deployment.
     * @param {string} sourceS3Bucket - Bucket containing the web site files to be copied.
     * @param {string} sourceS3prefix - S3 prefix to prepend to the web site manifest file names to be copied.
     * @param {string} destS3Bucket - S3 destination bucket to copy website content into
     * @param {string} destS3KeyPrefix - S3 file prefix (website folder) for the website content
     * @param {string} userPoolId - Cognito User Pool Id for web site configuration
     * @param {string} userPoolClientId - Cognito User Pool Client Id for web site configuration
     * @param {string} identityPoolId - Cognito Identity Pool ID
     * @param {string} region - Region of destination S3 bucket
     * @param {string} uuid - UUID for this instance of the solution
     * @param {string} dashboard_usage - Enable or disable dashaboard use tracking
     * @param {copyWebSiteAssets~requestCallback} cb - The callback that handles the response.
     */
    websiteHelper.prototype.copyWebSiteAssets = function(resourceProperties, cb) {
		var sourceS3Bucket = resourceProperties.sourceS3Bucket;
		var sourceS3prefix = resourceProperties.sourceS3key ;
		var destS3Bucket = resourceProperties.destS3Bucket;
		var destS3KeyPrefix = resourceProperties.destS3KeyPrefix;
		var webSocketHost = resourceProperties.webSocketHost;
		var region = resourceProperties.Region;
        var instanceId = resourceProperties.instanceId;
		var instanceName = resourceProperties.instanceName;
        var solutionId = resourceProperties.solutionId;
        var uuid = resourceProperties.UUID;
		var transcriptS3KeyBucket = resourceProperties.transcriptS3KeyBucket;
		var dashboardUsage = resourceProperties.data;
		var version = resourceProperties.version;
        console.log("Copying UI web site");
        console.log(['source bucket:', sourceS3Bucket].join(' '));
        console.log(['source prefix:', sourceS3prefix].join(' '));
        console.log(['destination bucket:', destS3Bucket].join(' '));
        console.log(['destination s3 key prefix:', destS3KeyPrefix].join(' '));
        console.log(['web socket host:', webSocketHost].join(' '));
        console.log(['region:', region].join(' '));
        console.log(['instanceId :', instanceId ].join(' '));        
        console.log(['solutionId:', solutionId].join(' '));
        console.log(['version:', version].join(' '));
        console.log(['UUID :', uuid ].join(' '));
		console.log(['transcriptS3KeyBucket :', transcriptS3KeyBucket ].join(' '));        
		console.log(['dashboardUsage :', dashboardUsage ].join(' '));

        _downloadKey = _downloadKey.replace("${version}", version);
        downloadWebisteManifest(sourceS3Bucket, _downloadKey, _downloadLocation, function(err, data) {
            if (err) {
                console.log(err);
                return cb(err, null);
            }

            fs.readFile(_downloadLocation, 'utf8', function(err, data) {
                if (err) {
                    console.log(err);
                    return cb(err, null);
                }

                console.log(data);
                let _manifest = validateJSON(data);

                if (!_manifest) {
                    return cb('Unable to validate downloaded manifest file JSON', null);
                } else {
                    uploadFile(_manifest.files, 0, destS3Bucket, destS3KeyPrefix, [sourceS3Bucket, sourceS3prefix]
                        .join('/'),
                        function(err, result) {
                            if (err) {
                                return cb(err, null);
                            }

                            console.log(result);

                            createAWSCredentials(destS3Bucket, destS3KeyPrefix, webSocketHost, region,  instanceId, instanceName, transcriptS3KeyBucket, solutionId, uuid, dashboardUsage,
                                function(err, createResult) {
                                    if (err) {
                                        return cb(err, null);
                                    }

                                    return cb(null, result);
                                });
                        });
                }

            });

        });

    };

    /**
     * Helper function to validate the JSON structure of contents of an import manifest file.
     * @param {string} body -  JSON object stringify-ed.
     * @returns {JSON} - The JSON parsed string or null if string parsing failed
     */
    let validateJSON = function(body) {
        try {
            let data = JSON.parse(body);
            console.log(data);
            return data;
        } catch (e) {
            // failed to parse
            console.log('Manifest file contains invalid JSON.');
            return null;
        }
    };

    let createAWSCredentials = function(destS3Bucket, destS3KeyPrefix, webSocketHost, region, instanceId, instanceName, transcriptS3KeyBucket, solutionId, uuid, dashboardUsage, cb) {
        let str = "function initAWS(){ \n";
        str+= " 	AWS.config.region = '" + region  +"'; \n";
        str+= "   } \n\n";
        str+= "   \n $(document).ready(initAWS); \n ";
        str+= "   \n\n";
        str+= "   function getRegion(){ \n";
        str+= "      return '" + region + "';\n";
        str+= "   } \n\n";
        str+= "   function getWebSocket(){ \n";
        str+= "      return '" + webSocketHost + "';\n";
        str+= "   } \n\n";
        str+= "   function getInstanceId(){ \n";
        str+= "      return '" + instanceId + "';\n";
        str+= "   } \n\n";
        str+= "   function getInstanceName(){ \n";
        str+= "      return '" + instanceName + "';\n";
        str+= "   } \n\n";		
        str+= "   function getBucketName(){ \n";
        str+= "      return '" + transcriptS3KeyBucket + "';\n";
        str+= "   } \n\n"
        str+= "   function getSolutionId(){ \n";
        str+= "      return '" + solutionId + "';\n";
        str+= "   } \n\n"
        str+= "   function getUUID(){ \n";
        str+= "      return '" + uuid + "';\n";
        str+= "   } \n\n"
        str+= "   function  getDashboardUsage(){ \n";
        str+= "      return '" + dashboardUsage  + "';\n";
        str+= "   } \n\n"
		

        
        console.log(str);
        let params = {
            Bucket: destS3Bucket,
            Key: destS3KeyPrefix + '/js/aws-credentials.js',
            Body: str
        };

        s3.putObject(params, function(err, data) {
            if (err) {
                console.log(err);
                return cb('error creating js/aws-credentials.js file for website UI', null);
            }

            console.log(data);
            return cb(null, data);
        });
    };

    let uploadFile = function(filelist, index, destS3Bucket, destS3KeyPrefix, sourceS3prefix, cb) {
        if (filelist.length > index) {
            let params = {
                Bucket: destS3Bucket,
                Key: destS3KeyPrefix + '/' + filelist[index],
                CopySource: [sourceS3prefix, filelist[index]].join('/')
            };
            if (filelist[index].endsWith('.htm') || filelist[index].endsWith('.html')) {
                params.ContentType = "text/html";
                params.MetadataDirective = "REPLACE";
            } else if (filelist[index].endsWith('.css')) {
                params.ContentType = "text/css";
                params.MetadataDirective = "REPLACE";
            } else if (filelist[index].endsWith('.js')) {
                params.ContentType = "application/javascript";
                params.MetadataDirective = "REPLACE";
            } else if (filelist[index].endsWith('.png')) {
                params.ContentType = "image/png";
                params.MetadataDirective = "REPLACE";
            } else if (filelist[index].endsWith('.jpg') || filelist[index].endsWith('.jpeg')) {
                params.ContentType = "image/jpeg";
                params.MetadataDirective = "REPLACE";
            } else if (filelist[index].endsWith('.pdf')) {
                params.ContentType = "application/pdf";
                params.MetadataDirective = "REPLACE";
            } else if (filelist[index].endsWith('.gif')) {
                params.ContentType = "image/gif";
                params.MetadataDirective = "REPLACE";
            };

            s3.copyObject(params, function(err, data) {
                if (err) {
                    console.log(['error copying ', [sourceS3prefix, filelist[index]].join('/'), '\n', err]
                        .join(''));
                } else {
                    console.log([
                        [sourceS3prefix, filelist[index]].join('/'), 'uploaded successfully'
                    ].join(' '));

                    let _next = index + 1;
                    uploadFile(filelist, _next, destS3Bucket, destS3KeyPrefix, sourceS3prefix, function (err, resp) {
                        if (err) {
                            return cb(err, null);
                        }

                        cb(null, resp);
                    });
                }
            });
        } else {
            cb(null, [index, 'files copied'].join(' '));
        }

    };

    /**
     * Helper function to download the website manifest to local storage for processing.
     * @param {string} s3_bucket -  Amazon S3 bucket of the website manifest to download.
     * @param {string} s3_key - Amazon S3 key of the website manifest to download.
     * @param {string} downloadLocation - Local storage location to download the Amazon S3 object.
     * @param {downloadManifest~requestCallback} cb - The callback that handles the response.
     */
    let downloadWebisteManifest = function(s3Bucket, s3Key, downloadLocation, cb) {
        let params = {
            Bucket: s3Bucket,
            Key: s3Key
        };

        console.log(params);

        // check to see if the manifest file exists
        s3.headObject(params, function(err, metadata) {
            if (err) {
                console.log(err);
            }

            if (err && err.code === 'NotFound') {
                // Handle no object on cloud here
                console.log('file doesnt exist');
                return cb('Manifest file was not found.', null);
            } else {
                console.log('file exists');
                console.log(metadata);
                let file = require('fs').createWriteStream(downloadLocation);

                s3.getObject(params).
                on('httpData', function(chunk) {
                    file.write(chunk);
                }).
                on('httpDone', function() {
                    file.end();
                    console.log('website manifest downloaded for processing...');
                    return cb(null, 'success');
                }).
                send();
            }
        });
    };

    return websiteHelper;

})();

module.exports = websiteHelper;
