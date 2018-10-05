const AWS = require('aws-sdk');
const glob = require("glob");
const fs = require('fs-extra');
const path = require('path');

AWS.config.update({
  region: 'us-west-2'
});
var credentials = new AWS.SharedIniFileCredentials({
  profile: 'ndt'
});
AWS.config.credentials = credentials;
const s3 = new AWS.S3({
  apiVersion: '2006-03-01'
});

glob("dist/**/*.*", null, function (er, files) {
  files.forEach(function (file) {
    const fileStream = fs.createReadStream(file);
    fileStream.on('error', function (err) {
      console.log('File Error', err);
    });
    const uploadParams = {
      Bucket: 'nielsen-developer-tools.com',
      Key: path.basename(file),
      ContentType: 'text/html',
      Body: fileStream
    };

    s3.upload(uploadParams, function (err, data) {
      if (err) {
        console.log("Error", err);
      }
      if (data) {
        console.log("Upload Success", data.Location);
      }
    });
  });
});

