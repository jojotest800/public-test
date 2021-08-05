const sharp = require("sharp");
const uuid = require("uuid");

const fileUploader = (req, res, next) => {
    let resizedFiles = [];
    const files = req.files;
    for (const file of req.files) {
      const fileId = uuid.v4() + Date.now();
      resizedFiles.push(
        new Promise((resolve, reject) => {
            console.log(file.path);
          sharp(file.path)
            .resize(300)
            .blur()
            .toFile(`resized/${fileId}.png`, function (err, data) {
              if (err) return reject(err);
              resolve(data);
            });
        })
      );
    }

    Promise.all(resizedFiles)
      .then((data) => {
        console.log("File resizing process is complete ", data);
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
