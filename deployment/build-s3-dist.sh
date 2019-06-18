#!/bin/bash

# This assumes all of the OS-level configuration has been completed and git repo has already been cloned
#sudo yum-config-manager --enable epel
#sudo yum update -y
#sudo pip install --upgrade pip
#alias sudo='sudo env PATH=$PATH'
#sudo  pip install --upgrade setuptools
#sudo pip install --upgrade virtualenv

# This script should be run from the repo's deployment directory
# cd deployment
# ./build-s3-dist.sh source-bucket-base-name
# source-bucket-base-name should be the base name for the S3 bucket location where the template will source the Lambda code from.
# The template will append '-[region_name]' to this bucket name.
# For example: ./build-s3-dist.sh solutions
# The template will then expect the source code to be located in the solutions-[region_name] bucket

# Check to see if input has been provided:
if [ -z "$2" ]; then
    echo "Please provide the base source bucket name and version where the lambda code will eventually reside."
    echo "For example: ./build-s3-dist.sh solutions version"
    exit 1
fi

# Build source
echo "Staring to build distribution"
# Create variable for deployment directory to use as a reference for builds
echo "export deployment_dir=`pwd`"
export deployment_dir=`pwd`

# Make deployment/dist folder for containing the built solution
echo "mkdir -p $deployment_dir/dist"
mkdir -p $deployment_dir/dist

# Copy project CFN template(s) to "dist" folder and replace bucket name with arg $1
echo "cp -f AI-powered-speech-analytics-for-amazon-connect.template $deployment_dir/dist"
cp -f AI-powered-speech-analytics-for-amazon-connect.template $deployment_dir/dist
echo "Updating code source bucket in template with $1"
replace="s/%%BUCKET_NAME%%/$1/g"
echo "sed -i '' -e $replace $deployment_dir/dist/AI-powered-speech-analytics-for-amazon-connect.template"
sed -i '' -e $replace $deployment_dir/dist/AI-powered-speech-analytics-for-amazon-connect.template
echo "Updating version in template with $2"
replace="s/%%VERSION%%/$2/g"
echo "sed -i '' -e $replace $deployment_dir/dist/AI-powered-speech-analytics-for-amazon-connect.template"
sed -i '' -e $replace $deployment_dir/dist/AI-powered-speech-analytics-for-amazon-connect.template

# Build node.js CFN Lambda custom resource helper function
echo "Building CFN custom resource helper Lambda function"
cd $deployment_dir/../source/helper
npm install
npm run build
npm run zip
# Copy packaged Lambda function to $deployment_dir/dist
cp ./dist/custom-resource-helper.zip $deployment_dir/dist/custom-resource-helper.zip
# Remove temporary build files
rm -rf dist
rm -rf node_modules
# Done, so go back to deployment_dir
cd $deployment_dir

# Build node.js contact_init function
echo "Building contact_init function"
cd $deployment_dir/../source/contact_init
npm install
npm run build
npm run zip
# Copy packaged Lambda function to $deployment_dir/dist
cp ./dist/contact_init.zip $deployment_dir/dist/contact_init.zip
# Remove temporary build files
rm -rf dist
rm -rf node_modules
# Done, so go back to deployment_dir
cd $deployment_dir

# Build node.js create_contact_flow function
echo "Building create_contact_flow function"
cd $deployment_dir/../source/create_contact_flow
npm install
npm run build
npm run zip
# Copy packaged Lambda function to $deployment_dir/dist
cp ./dist/create_contact_flow.zip $deployment_dir/dist/create_contact_flow.zip
# Remove temporary build files
rm -rf dist
rm -rf node_modules
# Done, so go back to deployment_dir
cd $deployment_dir

# Build node.js kvs_trigger function
echo "Building kvs_trigger function"
cd $deployment_dir/../source/kvs_trigger
npm install
npm run build
npm run zip
# Copy packaged Lambda function to $deployment_dir/dist
cp ./dist/kvs_trigger.zip $deployment_dir/dist/kvs_trigger.zip
# Remove temporary build files
rm -rf dist
rm -rf node_modules
# Done, so go back to deployment_dir
cd $deployment_dir

# Build node.js process_contact function
echo "Building process_contact function"
cd $deployment_dir/../source/process_contact
npm install
npm run build
npm run zip
# Copy packaged Lambda function to $deployment_dir/dist
cp ./dist/process_contact.zip $deployment_dir/dist/process_contact.zip
# Remove temporary build files
rm -rf dist
rm -rf node_modules
# Done, so go back to deployment_dir
cd $deployment_dir

# Build node.js ws_realtime_transcribe_Default function
echo "Building ws_realtime_transcribe_Default function"
cd $deployment_dir/../source/ws_realtime_transcribe_Default
npm install
npm run build
npm run zip
# Copy packaged Lambda function to $deployment_dir/dist
cp ./dist/ws_realtime_transcribe_Default.zip $deployment_dir/dist/ws_realtime_transcribe_Default.zip
# Remove temporary build files
rm -rf dist
rm -rf node_modules
# Done, so go back to deployment_dir
cd $deployment_dir

# Build node.js ws_realtime_transcribe_OnConnect function
echo "Building ws_realtime_transcribe_OnConnect function"
cd $deployment_dir/../source/ws_realtime_transcribe_OnConnect
npm install
npm run build
npm run zip
# Copy packaged Lambda function to $deployment_dir/dist
cp ./dist/ws_realtime_transcribe_OnConnect.zip $deployment_dir/dist/ws_realtime_transcribe_OnConnect.zip
# Remove temporary build files
rm -rf dist
rm -rf node_modules
# Done, so go back to deployment_dir
cd $deployment_dir

# Build node.js ws_realtime_transcribe_OnDDBInsert function
echo "Building ws_realtime_transcribe_OnDDBInsert function"
cd $deployment_dir/../source/ws_realtime_transcribe_OnDDBInsert
npm install
npm run build
npm run zip
# Copy packaged Lambda function to $deployment_dir/dist
cp ./dist/ws_realtime_transcribe_OnDDBInsert.zip $deployment_dir/dist/ws_realtime_transcribe_OnDDBInsert.zip
# Remove temporary build files
rm -rf dist
rm -rf node_modules
# Done, so go back to deployment_dir
cd $deployment_dir

# Build node.js ws_realtime_transcribe_OnDisconnect function
echo "Building ws_realtime_transcribe_OnDisconnect function"
cd $deployment_dir/../source/ws_realtime_transcribe_OnDisconnect
npm install
npm run build
npm run zip
# Copy packaged Lambda function to $deployment_dir/dist
cp ./dist/ws_realtime_transcribe_OnDisconnect.zip $deployment_dir/dist/ws_realtime_transcribe_OnDisconnect.zip
# Remove temporary build files
rm -rf dist
rm -rf node_modules
# Done, so go back to deployment_dir
cd $deployment_dir

# Build node.js ws_realtime_transcribe_OnMessage function
echo "Building ws_realtime_transcribe_OnMessage function"
cd $deployment_dir/../source/ws_realtime_transcribe_OnMessage
npm install
npm run build
npm run zip
# Copy packaged Lambda function to $deployment_dir/dist
cp ./dist/ws_realtime_transcribe_OnMessage.zip $deployment_dir/dist/ws_realtime_transcribe_OnMessage.zip
# Remove temporary build files
rm -rf dist
rm -rf node_modules
# Done, so go back to deployment_dir
cd $deployment_dir

# Build kvs_transcribe_streaming_lambda function to $deployment_dir/dist
cd $deployment_dir/../source/kvs_transcribe_streaming_lambda
gradle build
cp ./build/distributions/kvs_transcribe_streaming_lambda.zip $deployment_dir/dist/

# Build node.js updateContactAttributes function
echo "Building updateContactAttribes function"
cd $deployment_dir/../source/update_contact_attributes
npm install
npm run build
npm run zip
# Copy packaged Lambda function to $deployment_dir/dist
cp ./dist/update_contact_attributes.zip $deployment_dir/dist/update_contact_attributes.zip
# Remove temporary build files
rm -rf dist
rm -rf node_modules
# Done, so go back to deployment_dir
cd $deployment_dir

# Build kvs_transcribe_streaming_lambda function to $deployment_dir/dist
cd $deployment_dir/../source/kvs_transcribe_streaming_lambda
gradle build
cp ./build/distributions/kvs_transcribe_streaming_lambda.zip $deployment_dir/dist/

# Copy website files to $deployment_dir/dist
echo "Copying web site content to $deployment_dir/dist"
cp -r $deployment_dir/../source/web_site $deployment_dir/dist/

# Generate a manifest for web site files
echo "Generating web site manifest"
cd $deployment_dir/manifest-generator
npm install
node app.js
# Done, so go back to deployment_dir
cd $deployment_dir
