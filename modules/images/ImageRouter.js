const { makeInvoker } = require("awilix-express");
const express = require("express");
const { imagesAPIS } = require("./ImageController");
const multer = require("multer");
const { fileUploader } = require("../../middleware");

const uploader = multer({ dest: "uploads" });

const api = makeInvoker(imagesAPIS);

const router = express.Router();

router.post("/", uploader.any(), fileUploader, api("create"));

module.exports = router;
