const form = document.getElementById("form-anadir-peliculas"); //Declaramos el formulario de HTML
const tablaPeliculas = document.getElementById("tabla-peliculas"); //Declaramos la tabla de HTML
let peliculas = []; //Declaramos el array donde se almacenan las peliculas

peliculas = JSON.parse(localStorage.getItem("peliculas")) || []; //Si hay peliculas el localStorage, convierte peliculas de nuevo a un array, ya que fue almacenado en localStorage como String, debido a que este solo soporta almacenamiento de Strings. Si no hay peliculas el localStorage, crea un array vacío.

//Recupera las peliculas ya almacenadas en el array y las reflejamos en la tabla
for (let pelicula of peliculas) {
  tablaPeliculas.innerHTML += `<tr>
    <td>${pelicula.titulo}</td>
    <td>${pelicula.anio}</td>
    <td>${pelicula.descripcion}</td>
    <td><img src="${pelicula.foto}"></td>
    <td>${pelicula.genero}</td>
    <td>
      <button type="button">Editar película</button>
      <button type="button">Borrar película</button>
    </td>
  </tr>`;
}

//VALIDACION FORMULARIO, AÑADIR PELICULAS ARRAY Y TABLA
form.addEventListener("submit", (event) => {
  event.preventDefault(); //Paramos envío del formulario

  // Obtenemos los valores del formulario
  const titulo = event.target.titulo.value.trim();
  const anio = event.target.anio.value.trim();
  const descripcion = event.target.descripcion.value.trim();
  const foto = event.target.foto.value.trim();
  const genero = event.target.genero.value;

  //Validamos que el campo titulo tenga al menos un caracter (Antes con el .trim quitamos los espacios)
  if (titulo === "") {
    alert("Por favor, introduce un titulo válido");
    return;
  }

  //Validamos que el campo año tenga 4 cifras
  const anioRegex = /^\d{4}$/;
  if (!anioRegex.test(anio)) {
    alert("Debe ser un año compuesto por 4 dígitos");
    return;
  }

  //Validamos que el campo año sea un número entre 1800 y el año actual
  const anioActual = new Date().getFullYear(); //Obtenemos año actual
  const anioNumero = parseInt(anio); //Convertimos a numero el año introducido
  if (anioNumero < 1800 || anioNumero > anioActual) {
    alert(`El año debe estar entre 1800 y ${anioActual}`);
    return;
  }

  //Validamos que el campo descripción tenga al menos 20 caracteres
  if (descripcion.length < 20) {
    alert("La descripción debe tener al menos 20 caracteres.");
    return;
  }

  //Validamos que el campo foto sea una URL válida
  const fotoRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i;
  if (!fotoRegex.test(foto)) {
    alert("Por favor, introduce una foto con una URL válida");
    return;
  }

  //Validamos que se haya seleccionado un género
  if (!genero) {
    alert("Por favor, selecciona un género");
    return;
  }

  //Una vez pasan todas las validaciones, limpiamos los campos del formulario
  form.reset();

  //AÑADIMOS PELICULA AL ARRAY
  const nuevaPelicula = {
    titulo: titulo,
    descripcion: descripcion,
    foto: foto,
    anio: anioNumero,
    genero: genero,
  };
  peliculas.push(nuevaPelicula);

  //Añade el array peliculas al localStorage como String, ya que localStorage solo almacena Strings
  localStorage.setItem("peliculas", JSON.stringify(peliculas));

  //AÑADIR PELICULAS DEL ARRAY A LA TABLA
  tablaPeliculas.innerHTML += `<tr>
    <td>${nuevaPelicula.titulo}</td>
    <td>${nuevaPelicula.anio}</td>
    <td>${nuevaPelicula.descripcion}</td>
    <td><img src="${nuevaPelicula.foto}"></td>
    <td>${nuevaPelicula.genero}</td>
    <td>
      <button type="button">Editar película</button>
      <button type="button">Borrar película</button>
    </td>
  </tr>`;
});

//FILTRADO POR GÉNERO
const filtroGenero = document.getElementById("filtro-genero");

filtroGenero.addEventListener("change", (event) => {
  const generoSeleccionado = event.target.value;
  tablaPeliculas.innerHTML = "";

  for (pelicula of peliculas) {
    if (
      generoSeleccionado === "Todos" ||
      generoSeleccionado === pelicula.genero
    ) {
      tablaPeliculas.innerHTML += `<tr>
        <td>${pelicula.titulo}</td>
        <td>${pelicula.anio}</td>
        <td>${pelicula.descripcion}</td>
        <td><img src="${pelicula.foto}"></td>
        <td>${pelicula.genero}</td>
        <td>
          <button type="button">Editar película</button>
          <button type="button">Borrar película</button>
        </td>
      </tr>`;
    }
  }
});

//FILTRADO POR NOMBRE DE PELICULA
const inputBusqueda = document.getElementById("busqueda-nombre");

inputBusqueda.addEventListener("input", () => {
  const inputBusquedaMinuscula = inputBusqueda.value.toLowerCase();
  tablaPeliculas.innerHTML = "";

  for (pelicula of peliculas) {
    let tituloPeliculaMinuscula = pelicula.titulo.toLowerCase();
    if (tituloPeliculaMinuscula.includes(inputBusquedaMinuscula)) {
      tablaPeliculas.innerHTML += `<tr>
        <td>${pelicula.titulo}</td>
        <td>${pelicula.anio}</td>
        <td>${pelicula.descripcion}</td>
        <td><img src="${pelicula.foto}"></td>
        <td>${pelicula.genero}</td>
        <td>
          <button type="button">Editar película</button>
          <button type="button">Borrar película</button>
        </td>
      </tr>`;
    }
  }
});

//BORRAR PELICULA
tablaPeliculas.addEventListener("click", (elemento) => {
  //Captura cuando se hace click en cualquier parte de la tabla
  if (elemento.target.textContent === "Borrar película") {
    //Si el texto del elemento sobre el que se ha hecho click es igual a "Borrar película":
    const fila = elemento.target.closest("tr"); //Con Closest seleccionamos el siguiente elemento padre que sea <tr> (fila)
    const titulo = fila.children[0].textContent; //Toma el texto de la primera celda <td> de la fila (index 0), que es el título de la película
    peliculas = peliculas.filter((pelicula) => pelicula.titulo !== titulo); //Nos quedamos en la variable peliculas (array), con los titulos que no sean igual altitulo a borrar
    localStorage.setItem("peliculas", JSON.stringify(peliculas)); //Actualizamos el array de peliculas en localStorage
    fila.remove(); //Eliminamos la fila del HTML (<tr> completo)
  }
});