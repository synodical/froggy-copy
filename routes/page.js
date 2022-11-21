const express = require("express");
const { request } = require("http");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const User = require("../models").User;
const router = express.Router();
const axios = require("axios");

router.get("/join", isNotLoggedIn, (req, res) => {
  res.render("join", {
    title: "회원가입",
    joinError: req.flash("joinError"),
  });
});

router.get("/login", isNotLoggedIn, (req, res) => {
  res.render("login", {
    title: "로그인",
    joinError: req.flash("joinError"),
  });
});

router.get("/", async (req, res, next) => {
  if (req.user) {
    console.log(req.user);
  }
  res.render("main.html", {
    title: "froggy",
    user: req.user,
    loginError: req.flash("loginError"),
  });
});

module.exports = router;
