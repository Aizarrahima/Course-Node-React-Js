"use strict";

// import express
const express = require("express");
const app = express();
app.use(express.json());
const moment = require('moment');

// database
const db = require("../database");

// endpoint
module.exports = {
  add: (req, res) => {
    var now = new Date();
    var date = moment(now).format('YYYY-MM-DD');
    let data = {
      id_user: req.body.id_user,
      tanggal_transaksi: date
    }
    db.query(`insert into transaksi set ?`, data, (err, result) => {
      if (err) {
        // throw err
      } else {

        let id_transaksi = result.insertId
        res.json({
          message: "Success insert data",
          id_transaksi
        })
      }
    })
  },

  addDetail: (req, res) => {

    let detail = {
      id_transaksi: req.body.id_transaksi,
      id_class: req.body.id_class,
    }
    db.query(`insert into detail_transaksi set ?`, detail, (error, results) => {
      if (error) {
        return error
      } else {
        return res.json({
          message: "Success insert data",
          detail
        })
      }

    })
  },

  //get transaksi berdasarkan id_transaksi
  get: (req, res) => {
    const id = req.params.id_transaksi;
    db.query(`select * from transaksi join detail_transaksi on transaksi.id_transaksi = detail_transaksi.id_transaksi join class on detail_transaksi.id_class = class.id_class join category on class.id_category = category.id_category where detail_transaksi.id_transaksi = ${id}`, (err, results) => {
      if (err) throw err;
      var transaksi = results[0].tanggal_transaksi
      var dateformat = moment(transaksi).format('YYYY-MM-DD');
      res.json({
        message: "Data Kategori",
        data: results,
        date: dateformat
        
      })
    })
  },

  total: (req, res) => {
    const id = req.params.id_transaksi;
    db.query(`select SUM(price) as total from detail_transaksi join class on detail_transaksi.id_class = class.id_class where detail_transaksi.id_transaksi = ${id}`, (err, results) => {
        if (err) throw err;
        const sum = results[0]
        res.json({
            sum
        })
    })
},

bayar: (req, res) => {
  const id = req.params.id_transaksi;
  let data = {
    nomor_transaksi : req.body.nomor_transaksi,
    status_transaksi : "LUNAS"
  }
  db.query(`update transaksi set ? where id_transaksi = ${id}`, data, (err, results) => {
      if (err) throw err;
      res.json({
          message: "Success transaction"
      })
  })
},



};