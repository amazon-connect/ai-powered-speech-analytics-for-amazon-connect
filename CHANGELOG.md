# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
## [1.1.1] - 2021-05-05
### Added
- The version of the docker build image for building the java binary used for the fargate option is changed from gradle:jdk11 to gradle:6.8.3-jdk11 in the Dockerfile so that Grade 7 is not used which was recently released (Apr 9, 2021) and has incompatibility issue.

## [1.1.0] - 2021-03-31
### Added
- added AWS Fargate to the solution so that the transcription will occur throughout the call, but not only the first 15 minutes of the call which is a limitation if AWS Lambda function is used for processing the call audio for real-time transcribing because the Lambda has a 15 minute limitation and will stop transcribing if a call is longer than 15 minutes.
- added a new parameter called CreateFargateResources to the AWS CloudFormation template to conditionally launch AWS resources based on user input to create real-time transcripts of a contact. If the provided value is set to true, Fargate resources will be deployed or else if the value is false Lambda resources will be deployed 
- added a new environment variable 'START_SELECTOR_TYPE' with default value of 'NOW' to kvs_transcribe_streaming_lambda 
- added DeletionPolicy attribute and UpdateReplacePolicy attribute to createS3Bucket resource in CloudFormation template 
- upgraded AWS services to a newer version 

## [1.0.2] - 2020-03-16
### Changed
- Introduce a Connect specific tag processor that will halt reading from stream if contact id changes OR end of stream tag encountered
- Upgrade the chat related dependencies in the agent portal

## [1.0.1] - 2019-11-26
### Added
- Ability to stream audio that the customer hears
- Ability to chat with an agent

### Changed
- Upgraded to NodeJS 10.x
- Upgraded the build system

## [1.0.0] - 2019-07-27
### Added
- example-function-js sample microservice
- added unit tests for example-function-js

### Changed
- example.template to yaml file example with JS.
- updated build-s3-dist.sh script to include soltion-name parameter
- updated build-open-source.sh script to include soltion-name parameter
- updated run-unit-tests.sh script to execute example-function-js unit tests

### Removed
- deployment/buildspec files.
- helper function

## [0.0.1] - 2019-04-15
### Added
- CHANGELOG templated file
- README templated file
- NOTICE file
- LICENSE file
