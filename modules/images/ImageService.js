
const sharp =require('sharp')
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const { resolve } = require('path');

module.exports = class User {
  constructor({ postgresDBConnection, awsS3Service }) {
    this.db = postgresDBConnection;
    this.perPage = 2;
    this.aws_s3 = awsS3Service;
  }

  async create(req) {
    // console.log("the new array to handle:", req.newFiles);
    // const folder = '/home/aymarngams/Documents/'
    // const f = fs.readdirSync(folder)[1];
    // const pathFile = folder + f
    const filesToSaves = []
    if(Array.isArray(req.newFiles) && req.newFiles.length > 0){
      for (const file of req.newFiles) {
        filesToSaves,push(new Promise((resolve, reject) =>{
          const uploadedFile = this.aws_s3.uploadImage(file, path.resolve(file))
          resolve(uploadedFile)
        }))
      }

      Promise.all(filesToSaves).then(data=>{
        console.log('file to store in the db : ', data);
      })
    }else{
      console.log('not an array ', req.newFiles);
    }
    return [];
  }
};
