const { makeInvoker } = require("awilix-express");
const express = require("express");
const { addressAPIS } = require("./addressController");

const api = makeInvoker(addressAPIS);

const router = express.Router();


router.get("/count", api("countAllAddresses"));
router.get("/:user", api("getAll"));


router.post("/:id", api("create"));
module.exports = router;
