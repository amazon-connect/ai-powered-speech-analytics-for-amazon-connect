#!/bin/bash
#
# This assumes all of the OS-level configuration has been completed and git repo has already been cloned
#
# This script should be run from the repo's deployment directory
# cd deployment
# ./build-s3-dist.sh source-bucket-base-name solution-name version-code
#
# Paramenters:
#  - source-bucket-base-name: Name for the S3 bucket location where the template will source the Lambda
#    code from. The template will append '-[region_name]' to this bucket name.
#    For example: ./build-s3-dist.sh solutions my-solution v1.0.0
#    The template will then expect the source code to be located in the solutions-[region_name] bucket
#
#  - solution-name: name of the solution for consistency
#
#  - version-code: version of the package


# Check to see if input has been provided:
if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ]; then
    echo "Please provide the base source bucket name, trademark approved solution name and version where the lambda code will eventually reside."
    echo "For example: ./build-s3-dist.sh solutions trademarked-solution-name v1.0.0"
    exit 1
fi

# Get reference for all important folders
template_dir="$PWD"
template_dist_dir="$template_dir/global-s3-assets"
build_dist_dir="$template_dir/regional-s3-assets"
source_dir="$template_dir/../source"

echo "------------------------------------------------------------------------------"
echo "[Init] Clean old dist, node_modules and bower_components folders"
echo "------------------------------------------------------------------------------"
echo "rm -rf $template_dist_dir"
rm -rf $template_dist_dir
echo "mkdir -p $template_dist_dir"
mkdir -p $template_dist_dir
echo "rm -rf $build_dist_dir"
rm -rf $build_dist_dir
echo "mkdir -p $build_dist_dir"
mkdir -p $build_dist_dir

echo "------------------------------------------------------------------------------"
echo "[Packing] Templates"
echo "------------------------------------------------------------------------------"
echo "cp $template_dir/*.template $template_dist_dir/"
cp $template_dir/*.template $template_dist_dir/
echo "copy yaml templates and rename"
cp $template_dir/*.yaml $template_dist_dir/
cd $template_dist_dir
# Rename all *.yaml to *.template
for f in *.yaml; do
    mv -- "$f" "${f%.yaml}.template"
done

cd ..
echo "Updating code source bucket in template with $1"
replace="s/%%BUCKET_NAME%%/$1/g"
echo "sed -i '' -e $replace $template_dist_dir/*.template"
sed -i '' -e $replace $template_dist_dir/*.template
replace="s/%%SOLUTION_NAME%%/$2/g"
echo "sed -i '' -e $replace $template_dist_dir/*.template"
sed -i '' -e $replace $template_dist_dir/*.template
replace="s/%%VERSION%%/$3/g"
echo "sed -i '' -e $replace $template_dist_dir/*.template"
sed -i '' -e $replace $template_dist_dir/*.template

## TODO:
# Build node.js CFN Lambda custom resource helper function
echo "Building CFN custom resource helper Lambda function"
cd $source_dir/../source/helper
npm install
npm run build
npm run zip
# Copy packaged Lambda function to $build_dist_dir
cp ./dist/custom-resource-helper.zip $build_dist_dir/custom-resource-helper.zip
# Remove temporary build files
rm -rf dist
rm -rf node_modules
# Done, so go back to deployment_dir
cd $source_dir

# Build node.js contact_init function
echo "Building contact_init function"
cd $source_dir/../source/contact_init
npm install
npm run build
npm run zip
# Copy packaged Lambda function to $build_dist_dir
cp ./dist/contact_init.zip $build_dist_dir/contact_init.zip
# Remove temporary build files
rm -rf dist
rm -rf node_modules
# Done, so go back to deployment_dir
cd $source_dir

# Build node.js create_contact_flow function
echo "Building create_contact_flow function"
cd $source_dir/../source/create_contact_flow
npm install
npm run build
npm run zip
# Copy packaged Lambda function to $build_dist_dir
cp ./dist/create_contact_flow.zip $build_dist_dir/create_contact_flow.zip
# Remove temporary build files
rm -rf dist
rm -rf node_modules
# Done, so go back to deployment_dir
cd $source_dir

# Build node.js kvs_trigger function
echo "Building kvs_trigger function"
cd $source_dir/../source/kvs_trigger
npm install
npm run build
npm run zip
# Copy packaged Lambda function to $build_dist_dir
cp ./dist/kvs_trigger.zip $build_dist_dir/kvs_trigger.zip
# Remove temporary build files
rm -rf dist
rm -rf node_modules
# Done, so go back to deployment_dir
cd $source_dir

# Build node.js process_contact function
echo "Building process_contact function"
cd $source_dir/../source/process_contact
npm install
npm run build
npm run zip
# Copy packaged Lambda function to $build_dist_dir
cp ./dist/process_contact.zip $build_dist_dir/process_contact.zip
# Remove temporary build files
rm -rf dist
rm -rf node_modules
# Done, so go back to deployment_dir
cd $source_dir

# Build node.js ws_realtime_transcribe_Default function
echo "Building ws_realtime_transcribe_Default function"
cd $source_dir/../source/ws_realtime_transcribe_Default
npm install
npm run build
npm run zip
# Copy packaged Lambda function to $build_dist_dir
cp ./dist/ws_realtime_transcribe_Default.zip $build_dist_dir/ws_realtime_transcribe_Default.zip
# Remove temporary build files
rm -rf dist
rm -rf node_modules
# Done, so go back to deployment_dir
cd $source_dir

# Build node.js ws_realtime_transcribe_OnConnect function
echo "Building ws_realtime_transcribe_OnConnect function"
cd $source_dir/../source/ws_realtime_transcribe_OnConnect
npm install
npm run build
npm run zip
# Copy packaged Lambda function to $build_dist_dir
cp ./dist/ws_realtime_transcribe_OnConnect.zip $build_dist_dir/ws_realtime_transcribe_OnConnect.zip
# Remove temporary build files
rm -rf dist
rm -rf node_modules
# Done, so go back to deployment_dir
cd $source_dir

# Build node.js ws_realtime_transcribe_OnDDBInsert function
echo "Building ws_realtime_transcribe_OnDDBInsert function"
cd $source_dir/../source/ws_realtime_transcribe_OnDDBInsert
npm install
npm run build
npm run zip
# Copy packaged Lambda function to $build_dist_dir
cp ./dist/ws_realtime_transcribe_OnDDBInsert.zip $build_dist_dir/ws_realtime_transcribe_OnDDBInsert.zip
# Remove temporary build files
rm -rf dist
rm -rf node_modules
# Done, so go back to deployment_dir
cd $source_dir

# Build node.js ws_realtime_transcribe_OnDisconnect function
echo "Building ws_realtime_transcribe_OnDisconnect function"
cd $source_dir/../source/ws_realtime_transcribe_OnDisconnect
npm install
npm run build
npm run zip
# Copy packaged Lambda function to $build_dist_dir
cp ./dist/ws_realtime_transcribe_OnDisconnect.zip $build_dist_dir/ws_realtime_transcribe_OnDisconnect.zip
# Remove temporary build files
rm -rf dist
rm -rf node_modules
# Done, so go back to deployment_dir
cd $source_dir

# Build node.js ws_realtime_transcribe_OnMessage function
echo "Building ws_realtime_transcribe_OnMessage function"
cd $source_dir/../source/ws_realtime_transcribe_OnMessage
npm install
npm run build
npm run zip
# Copy packaged Lambda function to $build_dist_dir
cp ./dist/ws_realtime_transcribe_OnMessage.zip $build_dist_dir/ws_realtime_transcribe_OnMessage.zip
# Remove temporary build files
rm -rf dist
rm -rf node_modules
# Done, so go back to deployment_dir
cd $source_dir

# Build kvs_transcribe_streaming_lambda function to $source_dir
cd $source_dir/../source/kvs_transcribe_streaming_lambda
gradle build
cp ./build/distributions/kvs_transcribe_streaming_lambda.zip $build_dist_dir/

# Build node.js updateContactAttributes function
echo "Building updateContactAttribes function"
cd $source_dir/../source/update_contact_attributes
npm install
npm run build
npm run zip
# Copy packaged Lambda function to $build_dist_dir
cp ./dist/update_contact_attributes.zip $build_dist_dir/update_contact_attributes.zip
# Remove temporary build files
rm -rf dist
rm -rf node_modules
# Done, so go back to deployment_dir
cd $source_dir

# Build kvs_transcribe_streaming_lambda function to $source_dir
cd $source_dir/../source/kvs_transcribe_streaming_lambda
gradle build
cp ./build/distributions/kvs_transcribe_streaming_lambda.zip $build_dist_dir/

# Copy website files to $build_dist_dir
echo "Copying web site content to $source_dir"
cp -r $source_dir/../source/web_site $build_dist_dir/

# Generate a manifest for web site files
echo "Generating web site manifest"
cd $source_dir/../deployment/manifest-generator
npm install
node app.js
# Done, so go back to deployment_dir
cd $source_dir
