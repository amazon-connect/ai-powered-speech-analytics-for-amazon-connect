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

let moment = require('moment');
let https = require('https');

/**
 * Helper function to send anonymous data from cfn custom resource.
 *
 * @class metricsHelper
 */
let metricsHelper = (function() {

    /**
     * @class metricsHelper
     * @constructor
     */
    let metricsHelper = function() {};

    /**
     * Sends opt-in, anonymous metric.
     * @param {json} metric - metric to send to opt-in, anonymous collection.
     * @param {sendAnonymousMetric~requestCallback} cb - The callback that handles the response.
     */
    metricsHelper.prototype.sendAnonymousMetric = function(metric, cb) {

        let _options = {
            hostname: 'metrics.awssolutionsbuilder.com',
            port: 443,
            path: '/generic',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        let request = https.request(_options, function(response) {
            // data is streamed in chunks from the server
            // so we have to handle the "data" event
            let buffer;
            let data;
            let route;

            response.on('data', function(chunk) {
                buffer += chunk;
            });

            response.on('end', function(err) {
                data = buffer;
                cb(null, data);
            });
        });

        if (metric) {
            request.write(JSON.stringify(metric));
        }

        request.end();

        request.on('error', (e) => {
            console.error(e);
            cb(['Error occurred when sending metric request.', JSON.stringify(_payload)].join(' '), null);
        });
    };

    return metricsHelper;

})();

module.exports = metricsHelper;
