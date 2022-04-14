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
    db.query(`select * from admin`, (err, results) => {
      if (err) throw err;
      res.json({
        message: "Berhasil Menampilkan Semua Data",
        data: results,
      });
    });
  },

  getId: (req, res) => {
    const id = req.params.id;
    db.query(`select * from admin where id_admin = '${id}'`, (err, results) => {
      const admin = results[0]
      if (err) throw err;
      res.json({
        message: "Berhasil Menampilkan Data",
        data: admin,
      });
    });
  },

  add: (req, res) => {
    let data = {
      name_admin: req.body.name_admin,
      address_admin: req.body.address_admin,
      level_admin: "Admin",
      gender_admin: req.body.gender_admin,
      age_admin: req.body.age_admin,
      phone_admin: req.body.phone_admin,
      email_admin: req.body.email_admin,
      password_admin: md5(req.body.password_admin)
    }
    if ((!data.name_admin, !data.email_admin || !data.password_admin)) {
      res.status(402).json({
        message: "Nama Petugas, Username, dan Password Harus Diisi!",
      });
    }
    if(req.file){
      data.img_admin = req.file.filename
      db.query(`insert into admin set ?`, data, (err, result) => {
        if(err) throw err;
        res.json({
          data: data
        })
      })
    }else{
      db.query(`insert into admin set ?`, data, (err, result) => {
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
      name_admin: req.body.name_admin,
      address_admin: req.body.address_admin,
      level_admin: "Admin",
      gender_admin: req.body.gender_admin,
      age_admin: req.body.age_admin,
      phone_admin: req.body.phone_admin,
      email_admin: req.body.email_admin,
    }
    if(req.file){
      data.img_admin = req.file.filename
    }

    // if(req.body.password){
    //   data.password = md5(req.body.password)
    // }
    db.query(`update admin set ? where id_admin = ${id}`, data, (err, result) =>{
      if(err) throw err
      res.json({
        message: "Success update data",
        data
      })
    })
  },

  delete: (req, res) => {
    const id = req.params.id;
    db.query(`delete from admin where id_admin = '${id}'`, (err, results) => {
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
    db.query(`update admin set img_admin = '${photo}' where id_admin = '${id}'`, (err, results) => {
      if ((null, err)) throw err;
      res.json({
        message: "Berhasil Hapus Profile",
        data: results,
      });
    });
  },

  updatePw: (req, res) => {
    let email_admin =  req.body.email_admin
    let password_admin = ""
    if(req.body.password_admin){
      password_admin =  md5(req.body.password_admin)
    }
    db.query(`update admin set password_admin = '${password_admin}' where email_admin = '${email_admin}'`, (err, results) => {
      if ((null, err)) throw err;
      res.json({
        message: "Berhasil Ubah Password",
        data: results,
      });
    });
  },

  login: (req, res) => {
    let email_admin =  req.body.email_admin
    let password_admin = req.body.password_admin

    if( !email_admin || !password_admin) res.status(402).json({message: "email dan password harus diisi."})

       db.query(`select * from admin where email_admin = '${email_admin}'`, (err, result)=>{
        const admin = result[0]
          if (typeof admin === 'undefined'){
            res.status(401).json({message: "User not fond"})
          }else{
            if(admin.password_admin === md5(password_admin)){
              const token = jwt.sign({data: admin}, SECRET_KEY)
              res.json({
                logged: true,
                data: admin,
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

  find: (req, res) => {
    let find = req.body.find
    let sql = "select * from admin where name_admin like '%" + find + "%' or id_admin like '%" + find + "%' or address_admin like '%" + find + "%' or gender_admin like '%" + find + "%' or age_admin like '%" + find + "%' or email_admin like '%" + find + "%' or phone_admin like '%" + find + "%' "
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

  pwAdmin: (req, res) => {
    let id_admin = req.params.id_admin;
    let password_admin = "";
    if(req.body.password_admin){
      password_admin =  md5(req.body.password_admin)
    }
    let query = `update admin set password_admin = '${password_admin}' where id_admin = '${id_admin}'`
    db.query(
      query,
      (err, results) => {
        if ((null, err)) throw err;
        res.json({
          message: "Berhasil Ubah Password",
          data: results,
        });
      }
    );
  },

  
};
