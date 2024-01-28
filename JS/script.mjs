const buscador = document.getElementById("contenedorSeleccion");
const contenedorInformacion = document.getElementById("contenedorInfo");
const btnDame10 = document.getElementById("btnDame10");

// Función para generar un número entero aleatorio entre dos valores elegidos
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//Evento del botón para generar 10 nuevos pokemons aleatorios, que simplemente recarga la página
btnDame10.addEventListener("click", () => {
  location.reload();
});

// Al cargarse la página, se cargan estos elementos en el DOM
document.addEventListener("DOMContentLoaded", async (event) => {
  try {
    //cargamos los datos de 10 pokemons aleatorios traídos de la API generando ids aleatorios con la función creada anteriormente
    for (let i = 0; i <= 9; i++) {
      let index = getRandomIntInclusive(0, 1000);
      const resultado = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${index}/`
      );
      const datos = {
        id: resultado.data.id,
        nombre: resultado.data.name,
        foto: resultado.data.sprites.other["official-artwork"].front_default,
      };

      // Crear un elemento de lista con los datos obtenidos
      const atributos = document.createElement("li");
      atributos.innerHTML = `<ul id="nombreTarjeta"> ${datos.nombre} </ul>
                             <ul id="imagenTarjeta"> <img src="${datos.foto}" </img> </ul>
                             <button class="btnBuscar" data-id="${datos.id}"> Mostrar info </button>`;

      // Agregar la lista al contenedor de información
      buscador.appendChild(atributos);
    }
  } catch (error) {
    console.log(error);
  }

  //Seleccionamos todos los elementos de clase "btnBuscar" del documento
  const botones = document.querySelectorAll(".btnBuscar");

  //Le damos su función a cada uno de los botones
  botones.forEach((boton) => {
    boton.addEventListener("click", async (event) => {
      event.preventDefault();
      try {
        const id = event.target.getAttribute("data-id");
        const resultado = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}/`
        );
        const datos = {
          nombre: resultado.data.name,
          foto: resultado.data.sprites.other["official-artwork"].front_default,
          experiencia: resultado.data.base_experience,
          altura: resultado.data.height,
          peso: resultado.data.weight,
          indices: resultado.data.game_indices["0"].game_index,
        };

        // Verificamos si ya había un elemento anterior en el contenedor y eliminarlo
        while (contenedorInformacion.firstChild) {
          contenedorInformacion.removeChild(contenedorInformacion.firstChild);
        }

        // Creamos un elemento de lista con los datos
        const atributos = document.createElement("li");
        atributos.innerHTML = `<ul id="nombrePoke"> ${datos.nombre} </ul>
                           <ul> <img src="${datos.foto}" </img> </ul>
                           <ul>Experiencia: ${datos.experiencia}</ul>
                           <ul>Altura: ${datos.altura}</ul>
                           <ul>Peso: ${datos.peso}</ul>
                           <ul>Índice de juego: ${datos.indices}</ul>`;

        // Agregamos la lista al contenedor de información
        contenedorInformacion.appendChild(atributos);
      } catch (error) {
        // Verificamos si ya había un elemento anterior en el contenedor y eliminarlo
        while (contenedorInformacion.firstChild) {
          contenedorInformacion.removeChild(contenedorInformacion.firstChild);
        }

        // Mostramos en el contenedor de información un mensaje de error con un gif
        const gifError = document.createElement("img");
        gifError.src = "./estilos/img/giphy-unscreen.gif";
        contenedorInformacion.appendChild(gifError);
      }
    });
  });
});
