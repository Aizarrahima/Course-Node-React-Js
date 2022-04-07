"use strict";

// import
const db = require("../database");
const md5 = require("md5");



// endpoint
module.exports = {
  getAll: (req, res) => {
    db.query(`select * from mentor`, (err, results) => {
      if (err) throw err;
      res.json({
        message: "Berhasil Menampilkan Semua Data",
        data: results,
      });
    });
  },

  getId: (req, res) => {
    const id = req.params.id;
    db.query(`select * from mentor where id_mentor = '${id}'`, (err, results) => {
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
      level: "Mentor",
      gender: req.body.gender,
      age: req.body.age,
      phone: req.body.phone,
      email: req.body.email,
      password: md5(req.body.password)
    }
    if ((!data.name, !data.email || !data.password)) {
      res.status(402).json({
        message: "Nama Petugas, Username, dan Password Harus Diisi!",
      });
    }
    if(req.file){
      data.image = req.file.filename
      db.query(`insert into mentor set ?`, data, (err, result) => {
        if(err) throw err;
        res.json({
          data: data
        })
      })
    }else{
      db.query(`insert into mentor set ?`, data, (err, result) => {
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
      level: "Mentor",
      gender: req.body.gender,
      age: req.body.age,
      phone: req.body.phone,
      email: req.body.email,
      password: md5(req.body.password)
    }
    if(req.file){
      data.image = req.file.filename
      db.query(`update mentor set ? where id_mentor = ${id}`, data, (err, result) =>{
        if(err) throw err
        res.json({
          message: "Success update data",
          data
        })
      })
    }else{
      db.query(`update mentor set ? where id_mentor = ${id}`, data, (err, result) =>{
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
    db.query(`delete from mentor where id_mentor = '${id}'`, (err, results) => {
      if ((null, err)) throw err;
      res.json({
        message: "Berhasil Hapus Data",
        data: results,
      });
    });
  },
  
  find: (req, res) => {
    let find = req.body.find
    let sql = "select * from mentor where name like '%" + find + "%' or id_mentor like '%" + find + "%' or address like '%" + find + "%' or gender like '%" + find + "%' or age like '%" + find + "%' or email like '%" + find + "%' or phone like '%" + find + "%' "
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
