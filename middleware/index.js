const sharp = require("sharp");
const fs = require("fs");
const uuid = require("uuid");

const fileUploader = (req, res, next) => {
  let resizedFiles = [];
  const files = req.files;
  const readyFiles = [];
  for (const file of req.files) {
    const fileId = uuid.v4() + Date.now();
    const output = "resized/" + fileId + ".png";
    resizedFiles.push(
      new Promise((resolve, reject) => {
        console.log(file.path);
        sharp(file.path)
          .resize(300)
          .blur()
          .toFile(output, (err, data) => {
            if (err) return console.log(err);
            resolve(output);
          });
      })
    );
  }

  Promise.all(resizedFiles)
    .then((data) => {
      console.log(data);
      req.newFiles = data;
    })
    .catch((err) =>
      console.log("Error occurs during file resize processing :", err)
    );

  next();
};

module.exports = {
  fileUploader,
};
