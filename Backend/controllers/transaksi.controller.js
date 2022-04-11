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
        throw err
      } else {
        let id_transaksi = result.insertId
        res.json({
          message: "Success insert data",
          data,
        })
        let detail = {
          id_transaksi: id_transaksi,
          id_class: req.body.id_class,
        }
        db.query(`insert into detail_transaksi set ?`, detail, (error, results) => {
          if(error){
            throw error
          }else{
            res.json({
              message: "Success insert data",
              data
            })
          }

        })


      }
    })
  },
};