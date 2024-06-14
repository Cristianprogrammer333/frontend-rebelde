//Esta funcion sirve para eliminar los registros de la aplicacion a la base de datos
const EliminaRegistro = async (event) => {
  try {
    // Mostrar un cuadro de diálogo de confirmación
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Esto no se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, bórralo!",
    });

    // Si el usuario confirma la eliminación
    if (result.isConfirmed) {
      // Suponiendo que borrar es una función asíncrona
      const deleteSuccess = await borrar(event);
      
      // Si la eliminación fue exitosa, mostrar mensaje de éxito
      if (deleteSuccess) {
        await Swal.fire({
          title: "¡Eliminado!",
          text: "El registro ha sido borrado",
          icon: "success",
        });

        // Redirigir a la página de usuario
        window.location.href = "/usuario";
      } else {
        console.log("La eliminación no fue exitosa.");
      }
    }
  } catch (error) {
    console.error("Error al eliminar el registro", error);
  }
};

// Para salir de la aplicacion

const salirUsuario = () => {
  document.cookie = "token=";
  window.location.href = "/salir";
};

// esta contante sirve para guardar los usuarios que se han ingresado
const GuardarUsuario = () => {
  const identificacion = document.getElementById("identificacion").value;
  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const contrasena = document.getElementById("contrasena").value;
  const telefono = document.getElementById("telefono").value;

  const url = "https://backend-completo-4.onrender.com/api/usuario";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      idusuario: null,
      identificacion,
      nombre,
      correo,
      contrasena,
      telefono
    })
  };

  fetch(url, options)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      alertify.success(data.respuesta);
    })
    .catch((error) => {
      console.error('Error:', error);
      alertify.error('Error al guardar el usuario: ' + error.message);
    });
};

// esta funcion sirve para guardar las reservas de los usuarios
const GuardarReserva = () => {
  // Obtener los valores seleccionados de los menús desplegables
  const clase = document.getElementById("clase").value;
  const pais = document.getElementById("pais").value;
  const aerolinea = document.getElementById("aerolinea").value;
  const comidafavorita = document.getElementById("comidafavorita").value;

  // Obtener los servicios seleccionados por el usuario
  const serviciosSeleccionados = Array.from(document.querySelectorAll(".servicio:checked")).map(input => input.value);

  const url = "https://backend-completo-5.onrender.com/api/vuelo";
  let token = "";
  const cookieToken = document.cookie;

  if (cookieToken) {
    const cookies = cookieToken.split(";");
    cookies.forEach((cookie) => {
      const [nombre, valor] = cookie.split("=");
      if (nombre.trim() === "token") {
        token = valor;
      }
    });
  } else {
    alert("Debe loguearse nuevamente");
    return;
  }
  if (token == "") {
    alert("Debe loguearse nuevamente");
    return;
  }

  const headers = {
    "x-access-token": token,
    "Content-type": "application/json",
  };

  const options = {
    method: "POST",
    body: JSON.stringify({
      clase,
      pais,
      aerolinea,
      comidafavorita,
      servicios: serviciosSeleccionados
    }),
    headers,
  };
  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Reserva solicitada con éxito",
      });
    })
    .catch((error) => {
      const Toast = Swal.mixin({
        toast: false,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "warning",
        title: "Error al solicitar la reserva",
      });
    });
};


const RegistrarReservacion = () => {
  // Obtener los valores seleccionados de los menús desplegables y campos de texto
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const fecha_nacimiento = document.getElementById("fecha_nacimiento").value;
  const numero_telefono = document.getElementById("numero_telefono").value;
  const nacionalidad = document.getElementById("nacionalidad").value;
  const pasaporte = document.getElementById("pasaporte").value;
  const correo_electronico = document.getElementById("correo_electronico").value;
  const fecha_reserva = document.getElementById("fecha_reserva").value;
  const origen = document.getElementById("origen").value;
  const destino = document.getElementById("destino").value;
  const estado = document.getElementById("estado").value;

  const url = "https://backend-completo-1.onrender.com/api/aerolinea";
  let token = "";
  const cookieToken = document.cookie;

  if (cookieToken) {
    const cookies = cookieToken.split(";");
    cookies.forEach((cookie) => {
      const [nombre, valor] = cookie.split("=");
      if (nombre.trim() === "token") {
        token = valor;
      }
    });
  } else {
    alert("Debe loguearse nuevamente");
    return;
  }
  if (token == "") {
    alert("Debe loguearse nuevamente");
    return;
  }

  const headers = {
    "x-access-token": token,
    "Content-type": "application/json",
  };

  const options = {
    method: "POST",
    body: JSON.stringify({
      id: null,
      nombre,
      apellido,
      fecha_nacimiento,
      numero_telefono,
      nacionalidad,
      pasaporte,
      correo_electronico,
      fecha_reserva,
      origen,
      destino,
      estado,
    }),
    headers,
  };
  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Reserva solicitada con éxito",
      });
    })
    .catch((error) => {
      const Toast = Swal.mixin({
        toast: false,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "warning",
        title: "Error al solicitar la reserva",
      });
    });
};



const GuardarPeticion = () => {
  // Obtener los valores de los campos del formulario
  const Nombre = document.getElementById("Nombre").value;
  const Correo = document.getElementById("Correo").value;
  const Mensaje = document.getElementById("Mensaje").value;

  const url = "https://backend-completo.onrender.com/api/usuario";
  let token = "";
  const cookieToken = document.cookie;

  if (cookieToken) {
    const cookies = cookieToken.split(";");
    cookies.forEach((cookie) => {
      const [nombre, valor] = cookie.split("=");
      if (nombre.trim() === "token") {
        token = valor;
      }
    });
  } else {
    alert("Debe loguearse nuevamente");
    return;
  }
  if (token == "") {
    alert("Debe loguearse nuevamente");
    return;
  }

  const headers = {
    "x-access-token": token,
    "Content-type": "application/json",
  };

  const options = {
    method: "POST",
    body: JSON.stringify({
      id: null,
      Nombre,
      Correo,
      Mensaje
    }),
    headers,
  };
  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Petición enviada con éxito",
      });
    })
    .catch((error) => {
      const Toast = Swal.mixin({
        toast: false,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "warning",
        title: "Error al enviar la petición",
      });
    });
};



const CargarUsuario = (event) => {
  // console.log(event.target.parentElement.parentElement.children[1].innerHTML);
  // document.getElementById('idusuario').value = event.target.parentElement
  // .parentElement.children[1].innerHTML;
  document.getElementById("idusuario").value =
    event.target.parentElement.parentElement.children[0].innerHTML;
  document.getElementById("identificacion").value =
    event.target.parentElement.parentElement.children[1].innerHTML;
  document.getElementById("nombres").value =
    event.target.parentElement.parentElement.children[2].innerHTML;
  document.getElementById("correo").value =
    event.target.parentElement.parentElement.children[3].innerHTML;
  document.getElementById("contrasena").value =
    event.target.parentElement.parentElement.children[4].innerHTML;
  document.getElementById("telefono").value =
    event.target.parentElement.parentElement.children[5].innerHTML;
};

const ModificarUsuario = () => {
  const idusuario = document.getElementById("idusuario").value;
  const identificacion = document.getElementById("identificacion").value;
  const nombre = document.getElementById("nombres").value;
  const correo = document.getElementById("correo").value;
  const contrasena = document.getElementById("contrasena").value;
  const telefono = document.getElementById("telefono").value;

  const url = "https://backend-completo-4.onrender.com/api/usuario";
  let token = "";
  const cookieToken = document.cookie;

  if (cookieToken) {
    const cookies = cookieToken.split(";");
    cookies.forEach((cookie) => {
      const [nombre, valor] = cookie.split("=");
      if (nombre.trim() === "token") {
        token = valor;
      }
    });
  } else {
    alert("Debe loguearse nuevamente");
    return;
  }
  if (token == "") {
    alert("Debe loguearse nuevamente");
    return;
  }

  const headers = {
    "x-access-token": token,
    "Content-type": "application/json",
  };

  const options = {
    method: "PUT",
    body: JSON.stringify({
      idusuario: idusuario,
      identificacion,
      nombre,
      correo,
      contrasena,
      telefono,
    }),
    headers,
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      alert("Registro modificado" + data);
    })
    .catch((error) => {
      alert("Error al modificar el registro", error);
    });
};

// esta contante nos ayuda a eliminar los usuarios si el token sigue activo
const borrar = async (event) => {
  let codigo = event.target.parentElement.parentElement.children[0].innerHTML;
  //
  let token = "";
  const cookieToken = document.cookie;

  if (cookieToken) {
    const cookies = cookieToken.split(";");
    cookies.forEach((cookie) => {
      const [nombre, valor] = cookie.split("=");
      if (nombre.trim() === "token") {
        token = valor;
      }
    });
  } else {
    alert("Debe loguearse nuevamente");
    return;
  }
  if (token == "") {
    alert("Debe loguearse nuevamente");
    return;
  }

  const headers = {
    "x-access-token": token,
    "Content-type": "application/json",
  };

  //
  let retorno = false;
  const url = "https://backend-completo-4.onrender.com/api/usuario";
  const option = {
    method: "DELETE",
    body: JSON.stringify({
      idusuario: codigo,
    }),
    headers,
  };
  await fetch(url, option)
    .then((res) => res.json())
    .then((data) => {
      if (data.respuesta) {
        retorno = true;
      }
    })
    .catch((error) => alert(error));

  console.log(retorno);
  return retorno;
};

//Esta constante nos sirve para crear los vuelos con las reservas de los usuarios

const RegistrarPagos = () => {
  const transporte = document.getElementById("transporte")?.value;
  const servicios = document.getElementById("servicios")?.value;
  const contacto = document.getElementById("contacto")?.value;
  const identificacion = document.getElementById("identificacion")?.value;
  const fecha_de_reserva = document.getElementById("fecha_de_reserva")?.value;
  const descripcion = document.getElementById("descripcion")?.value;
  const metodo_de_pago = document.getElementById("metodo_de_pago")?.value;
  const pagar = document.getElementById("pagar")?.value;

  // // if (!transporte || !servicios || !contacto || !identificacion || !fecha_de_reserva || !descripcion || !metodo_de_pago  || !pagar) {
  // //     console.error('One or more required fields are missing');
  // //     return;
  // }

  const url = "https://backend-completo-2.onrender.com/api/reserva";

  let token = "";
  const cookieToken = document.cookie;

  if (cookieToken) {
      const cookies = cookieToken.split(";");
      cookies.forEach((cookie) => {
          const [nombre, valor] = cookie.split("=");
          if (nombre.trim() === "token") {
              token = valor;
          }
      });
  } else {
      alert("Debe loguearse nuevamente");
      return;
  }
  if (token == "") {
      alert("Debe loguearse nuevamente");
      return;
  }

  const headers = {
      "x-access-token": token,
      "Content-type": "application/json",
  };

  const options = {
      method: "POST",
      body: JSON.stringify({
          id: null,
          transporte,
          servicios,
          contacto,
          identificacion,
          fecha_de_reserva,
          descripcion,
          metodo_de_pago,
          pagar,
      }),
      headers,
  };

  fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
          console.log(data);
          const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
              },
          });
          Toast.fire({
              icon: "success",
              title: "Reserva realizada con éxito",
          });
      })
      .catch((error) => {
          console.error('Error:', error);
          const Toast = Swal.mixin({
              toast: false,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
              },
          });
          Toast.fire({
              icon: "warning",
              title: "Error al solicitar la reserva",
          });
      });
};



const RegistrarServiciosEspeciales = () => {
  const user_id = document.getElementById("user_id").value;
  const description = document.getElementById("description").value;
  const request_date = document.getElementById("request_date").value;

  const url = "https://backend-completo-3.onrender.com/api/servicio";

  let token = "";
  const cookieToken = document.cookie;

  if (cookieToken) {
    const cookies = cookieToken.split(";");
    cookies.forEach((cookie) => {
      const [nombre, valor] = cookie.split("=");
      if (nombre.trim() === "token") {
        token = valor;
      }
    });
  } else {
    alert("Debe loguearse nuevamente");
    return;
  }
  if (token == "") {
    alert("Debe loguearse nuevamente");
    return;
  }

  const headers = {
    "x-access-token": token,
    "Content-type": "application/json",
  };

  const options = {
    method: "POST",
    body: JSON.stringify({
      service_id: null,
      user_id,
      description,
      request_date,
    }),
    headers,
  };
  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Servicio solicitado con exito ",
      });
    })
    .catch((error) => {
      const Toast = Swal.mixin({
        toast: false,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "warning",
        title: "Error al solicitar el servicio",
      });
  });
};

//Funcion para crear un reporte
const Reporte = (event) => {
  const idusuario = event.target.parentElement.parentElement.children[0].innerHTML;
  const identificacion = event.target.parentElement.parentElement.children[1].innerHTML;
  const nombre = event.target.parentElement.parentElement.children[2].innerHTML;
  const correo = event.target.parentElement.parentElement.children[3].innerHTML;
  const contrasena = event.target.parentElement.parentElement.children[4].innerHTML;
  const telefono = event.target.parentElement.parentElement.children[5].innerHTML;

  const reporteHTML = `
    <html>
      <head>
        <title>Reporte de Usuario - Travels Wings</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f0f8ff;
            color: #333;
            margin: 0;
            padding: 20px;
          }
          h1 {
            color: #ff4500;
            text-align: center;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
          }
          th {
            background-color: #ff4500;
            color: #fff;
          }
          .benefits {
            margin-top: 30px;
          }
          .benefit-item {
            margin-bottom: 15px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Reporte de Usuario</h1>
          <table>
            <tr>
              <th>ID Usuario</th>
              <td>${idusuario}</td>
            </tr>
            <tr>
              <th>Identificación</th>
              <td>${identificacion}</td>
            </tr>
            <tr>
              <th>Nombre</th>
              <td>${nombre}</td>
            </tr>
            <tr>
              <th>Correo</th>
              <td>${correo}</td>
            </tr>
            <tr>
              <th>Teléfono</th>
              <td>${telefono}</td>
              <tr>
                <th>Contraseña</th>
                <td>${contrasena}</td>
              </tr>
            </tr>
          </table>
          <div class="benefits">
            <h2>¿Por qué Travels Wings es la mejor opción para volar?</h2>
            <div class="benefit-item">
              <h3>Precios Competitivos</h3>
              <p>Ofrecemos las mejores tarifas en el mercado, asegurando que obtengas el mayor valor por tu dinero.</p>
            </div>
            <div class="benefit-item">
              <h3>Excelente Servicio al Cliente</h3>
              <p>Nuestro equipo está disponible 24/7 para asistirte con cualquier consulta o necesidad.</p>
            </div>
            <div class="benefit-item">
              <h3>Comodidad y Seguridad</h3>
              <p>Nuestras aeronaves están equipadas con la última tecnología para garantizar tu comodidad y seguridad durante el vuelo.</p>
            </div>
            <div class="benefit-item">
              <h3>Amplia Red de Destinos</h3>
              <p>Vuela a más de 100 destinos alrededor del mundo con conexiones convenientes y rápidas.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  const reporteWindow = window.open('', '_blank');
  reporteWindow.document.open();
  reporteWindow.document.write(reporteHTML);
  reporteWindow.document.close();
};

const destinos = [
  {
      aerolinea: "American Airlines",
      destino: "Nueva York, EE. UU.",
      precio: "$500",
      horaSalida: "09:00",
      horaLlegada: "14:00",
      vip: true,
      disponibilidad: true,
      imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg/800px-View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg"
  },
  {
      aerolinea: "Lufthansa",
      destino: "París, Francia",
      precio: "$600",
      horaSalida: "12:00",
      horaLlegada: "17:00",
      vip: false,
      disponibilidad: true,
      imgUrl: "https://humanidades.com/wp-content/uploads/2018/09/francia-3-800x414.jpg"
  },
  {
      aerolinea: "Emirates",
      destino: "Dubái, Emiratos Árabes Unidos",
      precio: "$800",
      horaSalida: "15:00",
      horaLlegada: "23:00",
      vip: true,
      disponibilidad: true,
      imgUrl: "https://cdn.getyourguide.com/img/tour/5bb551eebafcde0c6d3d354bf15aa98cc366f201368b2ce871bd39a34ecdec21.jpg/97.jpg"
  },
  {
      aerolinea: "Qantas",
      destino: "Sídney, Australia",
      precio: "$900",
      horaSalida: "18:00",
      horaLlegada: "07:00",
      vip: false,
      disponibilidad: true,
      imgUrl: "https://images.skypicker.com/?image=https%3A%2F%2Fimages.kiwi.com%2Fphotos%2Foriginals%2Fsydney_ns_au.jpg&width=992&height=600&quality=80&fit=crop&format=original"
  },
  {
      aerolinea: "British Airways",
      destino: "Londres, Reino Unido",
      precio: "$700",
      horaSalida: "10:00",
      horaLlegada: "15:00",
      vip: true,
      disponibilidad: false,
      imgUrl: "https://idiomas.camarabilbao.com/wp-content/uploads/sites/2/2017/05/London_from_a_hot_air_balloon-1.jpg"
  },
  {
      aerolinea: "Singapore Airlines",
      destino: "Singapur, Singapur",
      precio: "$1000",
      horaSalida: "08:00",
      horaLlegada: "16:00",
      vip: true,
      disponibilidad: true,
      imgUrl: "https://camaraenruta.com/wp-content/uploads/2016/09/que-ver-en-Singapur-guia-de-viajes.jpg"
  },
  {
      aerolinea: "Delta Air Lines",
      destino: "Tokio, Japón",
      precio: "$950",
      horaSalida: "14:00",
      horaLlegada: "22:00",
      vip: false,
      disponibilidad: true,
      imgUrl: "https://www.nippon.com/es/ncommon/contents/japan-glances/2148613/2148613.jpg"
  },
  {
      aerolinea: "Air France",
      destino: "Roma, Italia",
      precio: "$750",
      horaSalida: "11:00",
      horaLlegada: "16:00",
      vip: true,
      disponibilidad: true,
      imgUrl: "https://www.icarito.cl/wp-content/uploads/2012/05/antigua-Roma-1024x593.png"
  },
  {
      aerolinea: "Cathay Pacific",
      destino: "Hong Kong, China",
      precio: "$850",
      horaSalida: "16:00",
      horaLlegada: "00:00",
      vip: true,
      disponibilidad: false,
      imgUrl: "https://www.discoverhongkong.com/ca/explore/attractions/hong-kong-night-view.thumb.800.480.png?ck=1702972619"
  },
  {
      aerolinea: "KLM",
      destino: "Ámsterdam, Países Bajos",
      precio: "$700",
      horaSalida: "13:00",
      horaLlegada: "18:00",
      vip: false,
      disponibilidad: true,
      imgUrl: "https://img2.rtve.es/i/?w=1600&i=1698226240350.jpg"
  },
  {
      aerolinea: "Qatar Airways",
      destino: "Doha, Catar",
      precio: "$850",
      horaSalida: "20:00",
      horaLlegada: "02:00",
      vip: true,
      disponibilidad: true,
      imgUrl: "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/482000/482071-Doha-Corniche.jpg"
  },
  {
      aerolinea: "Turkish Airlines",
      destino: "Estambul, Turquía",
      precio: "$800",
      horaSalida: "14:00",
      horaLlegada: "20:00",
      vip: false,
      disponibilidad: true,
      imgUrl: "https://fotografias.larazon.es/clipping/cmsimages01/2019/08/14/783417B9-3675-419D-A760-CE67DD3F1FDA/98.jpg?crop=567,319,x0,y7&width=1900&height=1069&optimize=low&format=webply"
  },
  {
      aerolinea: "Air Canada",
      destino: "Toronto, Canadá",
      precio: "$550",
      horaSalida: "08:00",
      horaLlegada: "13:00",
      vip: false,
      disponibilidad: true,
      imgUrl: "https://media.cntraveler.com/photos/5b2be6938b842c3b35c5d30c/2:1/w_2560%2Cc_limit/Toronto_getty-Images_748610951.jpg"
  },
  {
      aerolinea: "Avianca",
      destino: "Bogotá, Colombia",
      precio: "$400",
      horaSalida: "10:00",
      horaLlegada: "14:00",
      vip: true,
      disponibilidad: true,
      imgUrl: "https://www.cepal.org/sites/default/files/styles/1920x1080/public/regionaloffice/images/bogota.jpg?itok=6GS_dObY"
  },
  {
      aerolinea: "Copa Airlines",
      destino: "Panamá, Ciudad de Panamá",
      precio: "$450",
      horaSalida: "09:00",
      horaLlegada: "12:00",
      vip: false,
      disponibilidad: true,
      imgUrl: "https://media.gq.com.mx/photos/635c136db430aa98c0db8aee/16:9/w_2560%2Cc_limit/ciudad%2520de%2520panama-1204869339.jpg"
  },
  {
      aerolinea: "LATAM Airlines",
      destino: "Santiago, Chile",
      precio: "$600",
      horaSalida: "11:00",
      horaLlegada: "17:00",
      vip: true,
      disponibilidad: true,
      imgUrl: "https://www.nextleveloftravel.com/data/blog/2254/santiago-de-chile-and-daytrips-9-places-to-visit-and-more.jpg"
  }
];

// Función para mostrar los destinos en el contenedor
function mostrarDestinos() {
  const container = document.getElementById('destinationsContainer');
  container.innerHTML = ''; // Limpiar contenido previo

  destinos.forEach((destino, index) => {
      const destinationDiv = document.createElement('div');
      destinationDiv.className = 'destination';
      destinationDiv.style.animationDelay = `${index * 0.1}s`; // Añadir retraso de animación

      destinationDiv.innerHTML = `
          <img src="${destino.imgUrl}" alt="Imagen del destino">
          <h3>${destino.destino}</h3>
          <p><strong>Aerolínea:</strong> ${destino.aerolinea}</p>
          <p><strong>Precio:</strong> ${destino.precio}</p>
          <p><strong>Hora de salida:</strong> ${destino.horaSalida}</p>
          <p><strong>Hora de llegada:</strong> ${destino.horaLlegada}</p>
          <p><strong>VIP:</strong> ${destino.vip ? 'Sí' : 'No'}</p>
          <p class="${destino.disponibilidad ? 'availability' : 'unavailability'}">${destino.disponibilidad ? 'Disponible' : 'No disponible'}</p>
          <button class="btn-reservar">Reservar</button>
      `;

      container.appendChild(destinationDiv);
  });

  // Obtener el modal y el botón para cerrarlo
  const modal = document.getElementById("myModal");
  const closeButton = document.querySelector(".close");

  // Mostrar el modal cuando se haga clic en el botón de reservar
  const botonesReservar = document.querySelectorAll('.btn-reservar');
  botonesReservar.forEach((boton) => {
      boton.addEventListener('click', () => {
          modal.style.display = "block";
      });
  });

  // Ocultar el modal cuando se haga clic en el botón de cerrar
  closeButton.addEventListener('click', () => {
      modal.style.display = "none";
  });

  // Ocultar el modal cuando se haga clic fuera de él
  window.addEventListener('click', (event) => {
      if (event.target === modal) {
          modal.style.display = "none";
      }
  });
}

// Mostrar los destinos cuando la página se cargue
document.addEventListener('DOMContentLoaded', mostrarDestinos);













