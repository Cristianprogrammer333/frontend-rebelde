"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServiciosEspeciales = void 0;
var _dotenv = require("dotenv");
(0, _dotenv.config)();

//Esta constante nos sirve para mostrarnos la pagina donde ek usuario podra solicitar su servicio
var ServiciosEspeciales = exports.ServiciosEspeciales = function ServiciosEspeciales(req, res) {
  res.render("views.usuario.Sespecial.ejs");
};