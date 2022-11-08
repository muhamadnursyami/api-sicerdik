const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Register } = require("../models/register");
const { Token } = require("../models/token");

router.post("/register", (req, res) => {
  Register.find({ email: req.body.email })
    .exec()
    .then((register) => {
      if (register.length >= 1) {
        return res.status(401).json({
          status: false,
          message: "Email exists",
          data: undefined,
        });
      } else {
        bcrypt.hash(req.body.password, 2, (err, hash) => {
          if (err) {
            return res.status(5000).json({
              status: false,
              message: "Error, cannot encrypt password",
              data: undefined,
            });
          } else {
            const register = new Register({ ...req.body, password: hash });
            register.save((err, doc) => {
              if (err)
                return res.json({
                  status: false,
                  message: err,
                  data: undefined,
                });
              return res.status(200).json({
                status: true,
                message: "Register successfully!",
                data: doc,
              });
            });
          }
        });
      }
    });
});

router.post("/login", (req, res) => {
  Register.findOne({ email: req.body.email })
    .exec()
    .then((register) => {
      if (!register) {
        return res.status(401).json({
          message: "User not found",
          status: false,
          data: undefined,
        });
      }
      bcrypt.compare(
        req.body.password,
        register.password,
        async (err, result) => {
          if (err) {
            return res.status(401).json({
              status: false,
              message: "Server error, aunthentication failed",
              data: undefined,
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: register.email,
                registerId: register._id,
              },
              process.env.JWT_KEY,
              {
                expiresIn: "2h",
              }
            );

            await Token.findOneAndUpdate(
              { _registerId: register._id, tokenType: "login" },
              { token: token },
              { new: true, upsert: true }
            );
            return res.status(200).json({
              status: true,
              message: "Login successfully",
              data: {
                token,
                register,
                jabatan: register.jabatan,
              },
            });
          }
          return res.status(401).json({
            status: false,
            message: "Wrong password, login failed",
          });
        }
      );
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        message: "Server error, aunthentication failed",
        data: undefined,
      });
    });
});

module.exports = router;
