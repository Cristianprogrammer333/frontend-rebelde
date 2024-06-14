"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validarToken = exports.salirUsuario = exports.registrarUsuario = exports.ListarUsuario = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _dotenv = require("dotenv");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
(0, _dotenv.config)();
var ListarUsuario = exports.ListarUsuario = function ListarUsuario(req, res) {
  var url = process.env.URL_BACK + "/usuario";
  fetch(url).then(function (respuesta) {
    return respuesta.json();
  }).then(function (data) {
    res.render("views.usuario.ejs", {
      "titulo": "Travels Wings",
      "datos": data
    });
  })["catch"](function (error) {
    return console.error(error);
  });
};
// export const registrarUsuario = (req, res)=>{

// }

var registrarUsuario = exports.registrarUsuario = function registrarUsuario(req, res) {
  res.render("views.usuario.registro.ejs", {
    "datos": "madrid"
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
var salirUsuario = exports.salirUsuario = function salirUsuario(req, res) {
  res.redirect("/login.html");
};