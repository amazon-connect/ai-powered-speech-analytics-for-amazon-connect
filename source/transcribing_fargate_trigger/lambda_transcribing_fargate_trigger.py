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
import os
import boto3

QUEUE_URL = os.getenv("QUEUE_URL")

def lambda_handler(event, context):
    # Log the received event
    print("Received event: " + json.dumps(event, indent=2))   
    sqs = boto3.resource('sqs').Queue(QUEUE_URL)
    transcriptionEnabled = True if event['Details']['ContactData']['Attributes']['transcribeCall'] == "true" else False
    saveCallRecording = False if event['Details']['ContactData']['Attributes']['saveCallRecording'] == "false" else True
    languageCode = "es-US" if event['Details']['ContactData']['Attributes']['languageCode'] == "es-US" else "en-US"
    streamAudioFromCustomer = True
    streamAudioToCustomer = True
    for dest in event['Details']['ContactData']['Attributes']:
        if 'streamAudioFromCustomer' in dest:
            streamAudioFromCustomer = False if event['Details']['ContactData']['Attributes']['streamAudioFromCustomer'] == "false" else True
        if 'streamAudioToCustomer' in dest:
            streamAudioToCustomer = False if event['Details']['ContactData']['Attributes']['streamAudioToCustomer'] == "false" else True

    payload = {
        'streamARN': event['Details']['ContactData']['MediaStreams']['Customer']['Audio']['StreamARN'],
        'startFragmentNum': event['Details']['ContactData']['MediaStreams']['Customer']['Audio']['StartFragmentNumber'],
        'connectContactId': event['Details']['ContactData']['ContactId'],
        'transcriptionEnabled': transcriptionEnabled,
        'saveCallRecording': saveCallRecording,
        'languageCode': languageCode,
        'streamAudioFromCustomer': streamAudioFromCustomer,
        'streamAudioToCustomer': streamAudioToCustomer
    }
    sqs.send_message(MessageBody=json.dumps(payload))
    return {
        'lambdaSuccess': 'Success'
    }
