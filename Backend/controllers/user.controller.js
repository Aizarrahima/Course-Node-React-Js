"use strict";

// import
const db = require("../database");
const md5 = require("md5");



// endpoint
module.exports = {
  getAll: (req, res) => {
    db.query(`select * from user`, (err, results) => {
      if (err) throw err;
      res.json({
        message: "Berhasil Menampilkan Semua Data",
        data: results,
      });
    });
  },

  getId: (req, res) => {
    const id = req.params.id;
    db.query(`select * from user where id_user = '${id}'`, (err, results) => {
      if (err) throw err;
      res.json({
        message: "Berhasil Menampilkan Data",
        data: results,
      });
    });
  },

  add: (req, res) => {
    let data = {
      name: req.body.name,
      address: req.body.address,
      level: "User",
      gender: req.body.gender,
      age: req.body.age,
      phone: req.body.phone,
      email: req.body.email,
      password: md5(req.body.password)
    }
    if ((!data.name, !data.email || !data.password)) {
      res.status(402).json({
        message: "Nama User, Username, dan Password Harus Diisi!",
      });
    }
    if(req.file){
      data.image = req.file.filename
      db.query(`insert into user set ?`, data, (err, result) => {
        if(err) throw err;
        res.json({
          data: data
        })
      })
    }else{
      db.query(`insert into user set ?`, data, (err, result) => {
        if(err) throw err;
        res.json({
          data: data
        })
      })
    }
  },

  update: (req, res) => {
    const id = req.params.id;
    let data = {
      name: req.body.name,
      address: req.body.address,
      level: "User",
      gender: req.body.gender,
      age: req.body.age,
      phone: req.body.phone,
      email: req.body.email,
    }
    if(req.file){
      data.image = req.file.filename
      db.query(`update user set ? where id_user = ${id}`, data, (err, result) =>{
        if(err) throw err
        res.json({
          message: "Success update data",
          data
        })
      })
    }else{
      db.query(`update user set ? where id_user = ${id}`, data, (err, result) =>{
        if(err) throw err
        res.json({
          message: "Success update data",
          data
        })
      })
    }
  },

  delete: (req, res) => {
    const id = req.params.id;
    db.query(`delete from user where id_user = '${id}'`, (err, results) => {
      if ((null, err)) throw err;
      res.json({
        message: "Berhasil Hapus Data",
        data: results,
      });
    });
  },

  find: (req, res) => {
    let find = req.body.find
    let sql = "select * from user where name like '%" + find + "%' or id_user like '%" + find + "%' or address like '%" + find + "%' or gender like '%" + find + "%' or age like '%" + find + "%' or email like '%" + find + "%' or phone like '%" + find + "%' "
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        } else {
            
            res.json({
              result
            })
        }
    })
  }
};
