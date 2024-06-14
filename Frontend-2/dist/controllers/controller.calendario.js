"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MostrarCalendario = void 0;
var _dotenv = require("dotenv");
(0, _dotenv.config)();
var MostrarCalendario = exports.MostrarCalendario = function MostrarCalendario(req, res) {
  res.render("views.usuario.calendario.ejs");
};