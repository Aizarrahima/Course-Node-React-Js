'use strictt'

const express = require("express");
const transaksiController = require("../controllers/transaksi.controller");
const router = new express.Router()




router.post("/", transaksiController.add)



module.exports = router;