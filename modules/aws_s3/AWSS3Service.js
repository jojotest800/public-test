const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const AWS = require("aws-sdk");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require("dotenv").config();

const aws_s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  apiVersion: "2006-03-01",
  // signatureVersion: "v4",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

module.exports = class AWSS3Service {
  constructor({ postgresDBConnection }) {
    this.db = postgresDBConnection;
    this.s3client = aws_s3;
    this.getSignedUrl = getSignedUrl;
  }

  async uploadImage(filePath, fileName) {
    const fileContent = fs.readFileSync(filePath);
    const params = {
      filePath,
      s3: {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: fileName,
        ACL: process.env.AWS_S3_ALC,
        Body: fileContent,
      },
    };
    const image = await this.upload(params, filePath);
    return image;
  }

  async upload(params) {
    return new Promise((resolve, reject) => {
      this.s3client.upload(params?.s3, (err, data) => {
        if (err) reject(err);
        resolve(this.getLink(params?.s3?.Key));
      });
    });
  }

  getLink(key) {
    return `https://${this.s3client.endpoint.hostname}/${process.env.AWS_S3_BUCKET_NAME}/${key}`;
  }
};
