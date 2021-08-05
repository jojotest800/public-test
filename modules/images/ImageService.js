
const sharp =require('sharp')
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

module.exports = class User {
  constructor({ postgresDBConnection, awsS3Service }) {
    this.db = postgresDBConnection;
    this.perPage = 2;
    this.aws_s3 = awsS3Service;
  }

  async create(req) {
    console.log("the new array to handle:", req.newFiles);
    // const folder = '/home/aymarngams/Documents/'
    // const f = fs.readdirSync(folder)[1];
    // const pathFile = folder + f
    // const fileUri = await this.aws_s3.uploadImage(pathFile, f)
    return [];
  }
};
