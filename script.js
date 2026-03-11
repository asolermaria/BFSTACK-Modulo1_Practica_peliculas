const form = document.getElementById("anadir-peliculas");
let peliculas = [];
if (localStorage.getItem("peliculas")) { //Recupera los datos del localStorage de la variable peliculas
  peliculas = JSON.parse(localStorage.getItem("peliculas")); //Convierte peliculas de nuevo a un array, ya que fue almacenado en localStorage como String, debido a que este solo soporta almacenamiento de Strings
}
console.log(peliculas);

//VALIDACION FORMULARIO, AÑADIR PELICULAS ARRAY
form.addEventListener("submit", (event) => {
  event.preventDefault(); //Paramos envío del formulario

  // Obtenemos los valores del formulario
  const titulo = event.target.titulo.value.trim();
  const anio = event.target.anio.value.trim();
  const descripcion = event.target.descripcion.value.trim();
  const foto = event.target.foto.value.trim();
  const genero = event.target.genero.value

  //Validamos que el campo titulo tenga al menos un caracter (Antes con el .trim quitamos los espacios)
  if (titulo === "") {
    alert("Por favor, introduce un titulo válido");
    return;
  }

  //Validamos que el campo año tenga 4 cifras y sea un número entre 1800 y el año actual
  const anioRegex = /^\d{4}$/;

  if (!anioRegex.test(anio)) {
    alert("Debe ser un año compuesto por 4 dígitos");
    return;
  }

  const anioActual = new Date().getFullYear();
  const anioNumero = parseInt(anio);
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

  alert("Pelicula añadida");
  form.reset();

  //VALIDADO EL FORMULARIO, AÑADIMOS PELICULA A ARRAY

  const nuevaPelicula = {
    titulo: titulo,
    descripcion: descripcion,
    foto: foto,
    anio: anioNumero,
    genero: genero
  };

  peliculas.push(nuevaPelicula);
  localStorage.setItem("peliculas", JSON.stringify(peliculas)); //Añade el array peliculas al localStorage como String, ya que localStorage solo almacena Strings
});
