'use strictt'

const express = require("express");
const transaksiController = require("../controllers/transaksi.controller");
const router = new express.Router()

router.post("/", transaksiController.add)
router.post("/addDetail", transaksiController.addDetail)
router.get("/:id_transaksi", transaksiController.get)
router.get("/sum/:id_transaksi", transaksiController.total)
router.put("/bayar/:id_transaksi", transaksiController.bayar)

module.exports = router;