"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validarToken = exports.MostrarReserva = exports.CrearReserva = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _dotenv = require("dotenv");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
(0, _dotenv.config)();
var CrearReserva = exports.CrearReserva = function CrearReserva(req, res) {
  var url = "http://localhost:9999/api/reserva";
  fetch(url).then(function (respuesta) {
    return respuesta.json();
  }).then(function (data) {
    res.render("views.usuario.reserva.ejs", {
      "titulo": "Travels Wings",
      "datos": data
    });
  })["catch"](function (error) {
    return console.error(error);
  });
};

//validando
var validarToken = exports.validarToken = function validarToken(token) {
  var respuesta = "";
  var secret = process.env.JWT_SECRET;
  if (!token) {
    return "";
  }
  _jsonwebtoken["default"].verify(token, secret, function (error, decodedToken) {
    if (error) {
      //Error al verificar el token
      console.log('Error al verificar el token: ', error);
      return "";
    } else {
      //token verificado correctamente, puedes acceder
      //console.log('Token decodificado:', decodedToken)
      respuesta = decodedToken;
    }
  });
  return respuesta;
};
var MostrarReserva = exports.MostrarReserva = function MostrarReserva(req, res) {
  res.render("views.usuario.reserva.ejs");
};