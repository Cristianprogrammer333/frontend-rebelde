"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MostrarPaypal = void 0;
var _dotenv = require("dotenv");
(0, _dotenv.config)();
var MostrarPaypal = exports.MostrarPaypal = function MostrarPaypal(req, res) {
  res.render("views.usuario.paypal.ejs");
};