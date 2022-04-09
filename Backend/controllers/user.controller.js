"use strict";

// import
const db = require("../database");
const md5 = require("md5");
const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "COURSEWEBNODE"

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
      const user = results[0]
      if (err) throw err;
      res.json({
        message: "Berhasil Menampilkan Data",
        data: user,
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

  deleteProfile: (req, res) => {
    const id = req.params.id;
    let photo = ""
    db.query(`update user set image = '${photo}' where id_user = '${id}'`, (err, results) => {
      if ((null, err)) throw err;
      res.json({
        message: "Berhasil Hapus Profile",
        data: results,
      });
    });
  },

  updatePw: (req, res) => {
    let email =  req.body.email
    let password = ""
    if(req.body.password){
      password =  md5(req.body.password)
    }
    db.query(`update user set password = '${password}' where email = '${email}'`, (err, results) => {
      if ((null, err)) throw err;
      res.json({
        message: "Berhasil Ubah Password",
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
  },

  login: (req, res) => {
    let email =  req.body.email
    let password = req.body.password

    if( !email || !password) res.status(402).json({message: "email dan password harus diisi."})

       db.query(`select * from user where email = '${email}'`, (err, result)=>{
        const user = result[0]
          if (typeof user === 'undefined'){
            res.status(401).json({message: "User not fond"})
          }else{
            if(user.password === md5(password)){
              const token = jwt.sign({data: user}, SECRET_KEY)
              res.json({
                logged: true,
                data: user,
                token: token
              })
            }else{
              res.json({
                message: "Invalid password"
              })
            }
            
          }
        })
  },
};
