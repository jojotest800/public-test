const multer = require("multer");
const { makeInvoker } = require("awilix-express");
const express = require("express");
const { productsAPIS } = require("./productController");

const api = makeInvoker(productsAPIS);
const upload = multer({ dest: "uploads" });

const router = express.Router();

router.post("/:userId", upload.any(), api("create"));
router.put("/:id", api("update"));
router.delete("/:id", api("delete"));

router.get("/", api("getAll"));
router.get("/test", api("processSeparate"));
router.get("/:id", api("getProduct"));

module.exports = router;
