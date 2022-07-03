let precio_total = 0;
let nroCupon;
let validarCupon;
let seleccionar;
let direccion;
let apellido;
let nombre;
let nombreUsuario;
let usuarioNuevo;
let registro;
let solicitud;



function saludo() {
  alert(
    "Bienvenido a la Tienda de Peliculas!"
  );
  nombre = campoVacio(
    nombre, "Ingresa tu Nombre"
  );
}

//Restringe si los valores son distintos de "si" o "no"
const datoInvalido = (comparado, text) => {
  while (comparado != "si" && comparado != "no") {
    alert(
      "Ingresaste un dato incorrecto"
    );
    comparado = prompt(text).toLowerCase();
  }
  return comparado
}

// Restringe cuando el valor =="" 
const campoVacio = (comparado, text) => {
  comparado = prompt(text).toLowerCase();
  while (comparado === "") {
    alert(
      "Ingresaste un campo vacio"
    );
    comparado = prompt(text).toLowerCase();
  }
  return comparado
}

const solicitudRegistro = () => {
  registro = prompt("Hola " +
    nombre +
    " !" +
    " Ya estas registrado?\nSi\nNo");
  registro = datoInvalido(
    registro, "Hola " +
    nombre +
    " !" + " Ya estas registrado?\nSi\nNo"
  )
  switch (registro) {
    case "si":
      nombreUsuario = campoVacio(
        nombreUsuario, "Ingresa tu Nombre de Usuario"
      );
      break;
    case "no":
      alert(
        "Puedes continuar sin registrate pero si no lo haces no podras acceder a descuentos y promociones ni realizar compras"
      );
      solicitud = prompt(
        "Deseas registrarte?\nSi\nNo").toLowerCase();
      solicitud = datoInvalido(
        solicitud, "Deseas registrarte?\nSi\nNo"
      )
      if (solicitud === "no") {
        break;
      } else if (solicitud === "si") {
        SolicitarDatos();
      }
  }
}

const SolicitarDatos = () => {
  usuarioNuevo = campoVacio(
    usuarioNuevo, "Ingresa tu Nombre"
  );
  apellido = campoVacio(
    apellido, "Ingresa tu Apellido"
  );
  direccion = campoVacio(
    direccion, "Ingresa tu Direccion"
  );
  alert("Registrado correctamente");
}


const mostrarProductos = () => {
  seleccionar = prompt(
    "Elegi un genero: \nTerror\nSuspenso\nAccion"
  ).toLowerCase();
  while (seleccionar != "terror" &&
    seleccionar != "suspenso" &&
    seleccionar != "accion") {
    alert(
      "No se encontro el genero Ingresado"
    )
    seleccionar = prompt(
      "Ingresa un grenero: \nTerror\nSuspenso\nAccion"
    ).toLowerCase();
  }
  return seleccionar
}


const filtrar = (arr, parametro) => {
  return arr.filter(
    (pelicula) => pelicula.genero === parametro
  )
}

const recorrer = (genero) => {
  genero.forEach(element => {
    let comprar = prompt(
      "Deseas comprar " +
      element.nombre.toUpperCase() + " ?" +
      "\nGenero: " +
      element.genero.toUpperCase() +
      "\nPrecio $ " +
      element.precio +
      "\n\nSi | No"
    ).toLowerCase();
    comprar = datoInvalido(
      comprar, "Deseas comprar " +
      element.nombre.toUpperCase() + " ?" +
      "\nGenero: " +
      element.genero.toUpperCase() +
      "\nPrecio $ " +
      element.precio +
      "\n\nSi | No")
    if (comprar === "si") {
      PeliculasSeleccionadas.push(element);
    }
  });
}

const cupon = () => {
  validarCupon = prompt("Tenes un Cupón de Descuento?\nSi\nNo")
  validarCupon = datoInvalido(
    validarCupon, "Tenes un Cupón de Descuento?\nSi\nNo"
  );
  if (validarCupon === "si") {
    nroCupon = prompt(
      "Ingresa tu Número de Cupón"
    );
    if ((registro === "si") || (solicitud === "si")) {
      alert(
        "Tu Cupón " +
        "-" +
        nroCupon +
        "-" +
        " del 10 % de Descuento!!!"
      );
    }
  }

}



saludo();
solicitudRegistro();
mostrarProductos();
const generoSeleccionado = filtrar(peliculas, seleccionar);
recorrer(generoSeleccionado);

PeliculasSeleccionadas.forEach((producto) => {
  const producto1 = new Producto(producto)
  alert(
    "Elegiste " +
    producto.nombre.toUpperCase() +
    "\nGenero: " +
    producto.genero.toUpperCase() +
    "\nPrecio: $ " +
    producto.precio +
    "\n"
  );
});

cupon();

for (let vendido of PeliculasSeleccionadas) {
  let producto = new Producto(vendido);
  producto.aplicarIva();
  if (((registro === "si") || (solicitud === "no")) && (validarCupon === "si")) {
    producto.aplicarDescuento();
  }
  precio_total += producto.precio;
}


if ((registro === "si") || (solicitud === "si")) {
  alert(
    "El Precio total de tu Compra es de: $ " +
    precio_total.toFixed(2) +
    "\nMuchas Gracias por tu compra!"
  );
} else {
  alert(
    "No podes finalizar tu compra si no estas Logueado o Registrado"
  );
  solicitud = prompt(
    "Deseas Ingresar tus datos para finalizar la compra?\nSi\nNo"
  ).toLowerCase();
  solicitud = datoInvalido(
    solicitud, "Deseas Ingresar tus datos para finalizar la compra?\nSi\nNo"
  );
  switch (solicitud) {
    case "si":
      SolicitarDatos();
      alert(
        "El Precio total de tu Compra es de: $ " +
        precio_total.toFixed(2) +
        "\nMuchas Gracias por tu compra!"
      );
      break;
    case "no":
      alert("Muchas Gracias por tu Visita");
      break;
  }
}
