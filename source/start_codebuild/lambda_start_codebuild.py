'''*
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
 *'''

import json
import boto3
from package import cfnresponse
from botocore.exceptions import ClientError
import logging

def lambda_handler(event, context):
    logging.basicConfig(level = logging.INFO)
    logger = logging.getLogger()
    logger.info(json.dumps(event, default=str))
    account_id = context.invoked_function_arn.split(":")[4]
    if event['RequestType'] in ['Create', 'Update']:
        try:
            codebuild = boto3.client('codebuild')
            response = codebuild.start_build(projectName = event['ResourceProperties']['BuildProjectName'])
            cfnresponse.send(event, context, cfnresponse.SUCCESS, {"BuildStatus": response['build']['buildStatus']})
        except ClientError as codebuild_error:
            cfnresponse.send(event, context, cfnresponse.FAILED, {"Reason": str(codebuild_error)})
            raise
    elif event['RequestType'] in ['Delete']:
        try:
            ecr = boto3.client('ecr')
            resources = event['ResourceProperties']
            repository = resources['ECRRepository']
            response = ecr.list_images(repositoryName=repository)
            latestImageList = [image for image in response['imageIds'] if image['imageTag'] == 'latest']
            ecr.batch_delete_image(repositoryName=repository, imageIds=latestImageList)
            cfnresponse.send(event, context, cfnresponse.SUCCESS, {})
        except ClientError as ecr_error:
            cfnresponse.send(event, context, cfnresponse.FAILED, {"Reason": str(ecr_error)})
            raise
    else:
        cfnresponse.send(event, context, cfnresponse.FAILED, {"Reason": "Unknown RequestType %s" % event['RequestType']})