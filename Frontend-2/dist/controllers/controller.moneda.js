"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MostrarMoneda = void 0;
var _dotenv = require("dotenv");
(0, _dotenv.config)();

//Esta constante sirve para mostrarnos la pagina donde el usuario escogera el cambio de moneda
var MostrarMoneda = exports.MostrarMoneda = function MostrarMoneda(req, res) {
  res.render("views.usuario.cambiomoneda.ejs");
};