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

/**
 * @author Solution Builders
 */

'use strict';

let AWS = require('aws-sdk');
let s3 = new AWS.S3();

/**
 * Helper function to turn on S3 default bucket encryption for cfn custom resource.
 *
 * @class bucketEncryptionHelper
 */
let bucketEncryptionHelper = (function() {

    /**
     * @class bucketEncryptionHelper
     * @constructor
     */
    let bucketEncryptionHelper = function() {};

    /**
     * Enables default encryption for a given bucket.
     * @param {string} S3Bucket - S3 Bucket to enable default encryption.
     * @param {copyWebSiteAssets~requestCallback} cb - The callback that handles the response.
     */
    bucketEncryptionHelper.prototype.enableDefaultBucketEncryption = function(S3Bucket, SSEAlgorithm, KMSMasterKeyID, cb) {
        console.log(['Enabling default encryption on bucket:', S3Bucket].join(' '));
        var params = {
          Bucket: S3Bucket,
          ServerSideEncryptionConfiguration: {
            Rules: [
              {
                ApplyServerSideEncryptionByDefault: {
                  SSEAlgorithm: SSEAlgorithm
                }
              }
            ]
          }
        };
        if (SSEAlgorithm === 'aws:kms') {
          params.ServerSideEncryptionConfiguration.Rules[0].ApplyServerSideEncryptionByDefault.KMSMasterKeyID = KMSMasterKeyID;
        }

        s3.putBucketEncryption(params, (err, result) => {
            if (err) {
              console.log(['Failed to enable default bucket encryption:', err].join(' '));
              return cb(err, null);
            } else {
              console.log("Successfully enabled default bucket encryption.");
              return cb(null, "SUCCESS");
            }
        });
    };

    return bucketEncryptionHelper;

})();

module.exports = bucketEncryptionHelper;
