# AI Powered Speech Analytics for Amazon Connect
The AI Powered Speech Analytics for Amazon Connect solution provides the combination of speech to text transcription, translation into preferred languages, and insights for agents and supervisors all in real-time. This enables agents to better understand customer needs and drive resolution using the insights the solution provides while they are still interacting with their customer.

## OS/Python Environment Setup
```bash
sudo apt-get update
sudo apt-get install zip wget sed -y
sudo wget -qO- https://deb.nodesource.com/setup_8.x | bash
sudo apt-get -y install nodejs
```

## Building Lambda Package
```bash
cd deployment
./build-s3-dist.sh source-bucket-base-name version
```
source-bucket-base-name should be the base name for the S3 bucket location where the template will source the Lambda code from.
The template will append '-[region_name]' to this value.
version should be a version prefix for the S3 bucket to indicate different build versions.
For example: ./build-s3-dist.sh solutions v1.0.0
The template will then expect the source code to be located in the solutions-[region_name]/ai-powered-speech-analytics-for-amazon-connect/v1.0.0/ bucket

## CF template and Lambda function
Located in deployment/dist

***


Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0

Licensed under the the MIT-0 License. See the LICENSE file.
This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions and limitations under the License.