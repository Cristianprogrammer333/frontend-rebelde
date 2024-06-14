"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReservarVuelo = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _dotenv = require("dotenv");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
(0, _dotenv.config)();

//Esta constante sirve para mostrarme la pagina de los vuelos
var ReservarVuelo = exports.ReservarVuelo = function ReservarVuelo(req, res) {
  res.render("views.usuario.vuelo.ejs");
};