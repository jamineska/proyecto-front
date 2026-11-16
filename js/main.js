//VARIABLES
const url_key = 'S0SPXGCuvujnz1b_8l2o4UmZKLDVQOBIzzHw201v2Vc'; //variable para llamar a la API
const url_base = 'https://api.unsplash.com/search/photos'
const imagenesPorCategoria = {}; //objeto que almacena todas las imagenes de cada categoria.


//capturar elementos
const botonInicio = document.querySelector("#boton-inicio");
const botonFavoritos = document.querySelector("#boton-favoritos");
const contadorFavoritos = document.querySelector("#contador-favoritos");
const botonesCategoria = document.querySelectorAll(".boton-categoria");
const formularioBusqueda = document.querySelector("#formulario-busqueda");
const campoBusqueda = document.querySelector("#campo-busqueda");
const mensajeErrorBusqueda = document.querySelector("#mensaje-error-busqueda");
const selectorOrientacion = document.querySelector("#selector-orientacion");
const seccionInicio = document.querySelector("#seccion-inicio");
const mensajeResultados = document.querySelector("#mensaje-resultados");
const galeriaResultados = document.querySelector("#galeria-resultados");
const botonPaginaAnterior = document.querySelector("#boton-pagina-anterior");
const textoNumeroPagina = document.querySelector("#texto-numero-pagina");
const botonPaginaSiguiente = document.querySelector("#boton-pagina-siguiente");
const seccionFavoritos = document.querySelector("#seccion-favoritos");
const mensajeFavoritos = document.querySelector("#mensaje-favoritos");
const galeriaFavoritos = document.querySelector("#galeria-favoritos");






//EVENTOS

//FUNCIONES

/*1- Llamar a la API.*/

const llamarApi = async (busqueda, pagina = 1) => {
    try { //voy a comentar esta linea para que funcione la parte de categorias. (jamile)
        //const urlPeticion = `${url_base}/search/photos?query=${encodeURIComponent(busqueda)}&page=${pagina}&per_page=12`; //query palabra a buscar page la página y per_page fotos por página, que hemos elegido 12
        const urlPeticion = `${url_base}?query=${encodeURIComponent(busqueda)}&page=${pagina}&per_page=12`;
        const response = await fetch(urlPeticion, {
            headers: {
                Authorization: `Client-ID ${url_key}`
            }
        });

        if (!response.ok) {
            throw new Error(response.status);
        }

        const data = await response.json();
        return data.results; // devuelve solo la lista de fotos
    } catch (error) {
        console.error("Hay un error que estamos solucionando", error);
        return [];
    }
};

//llamarApi("nature").then(fotos => console.log(fotos)); //aquí vamos poniendo pruebas para ver que funciona
//llamarApi("agua").then(fotos => console.log(fotos));
//llamarApi("music").then(fotos => console.log(fotos));


//Parte visual y dinámico de la página principal de la aplicación.
/* 4- Pintar Categorías, conectar con la API, recibir y almacenar las fotografías, Mostrar las tres categorías de imagenes. */
// Función para pintar las fotos en #galeria-resultados
const pintarGaleria = (fotos) => {
    galeriaResultados.innerHTML = "";

    if (!fotos || fotos.length === 0) {
        mensajeResultados.textContent = "No se encontraron imágenes para esta categoría.";
        return;
    }

    mensajeResultados.textContent = `Mostrando ${fotos.length} imágenes`;

    fotos.forEach((foto) => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("tarjeta-foto");

        tarjeta.innerHTML = `
            <img src="${foto.urls.small}" alt="${foto.alt_description || 'Fotografía de Unsplash'}" loading="lazy">
            <div class="info-foto">
                <span>${foto.user.name}</span>
                <button class="btnFavorito" data-id="${foto.id}" aria-label="Añadir a favoritos">🤍</button>
            </div>
        `;

        galeriaResultados.append(tarjeta);
        //console.log(tarjeta)
    });
    capturarBotonesFavoritos();
};

// Función para cargar las fotos de una categoría
const cargarCategoria = async (categoria) => {
    mensajeResultados.textContent = "Cargando imágenes...";

    // Si ya pedimos esta categoría antes, la usamos desde imagenesPorCategoria sin volver a gastar API
    if (imagenesPorCategoria[categoria]) {
        pintarGaleria(imagenesPorCategoria[categoria]);
        return;
    }

    // Si es la primera vez, llamamos a la función llamarApi 
    const fotos = await llamarApi(categoria, 1);

    if (fotos && fotos.length > 0) {
        imagenesPorCategoria[categoria] = fotos; // Guardamos en caché
        pintarGaleria(fotos);
    } else {
        mensajeResultados.textContent = "No se pudieron cargar las imágenes.";
    }
};

// Eventos click para los 3 botones de categoría (.boton-categoria)
botonesCategoria.forEach((boton) => {
    boton.addEventListener("click", () => {
        const categoriaSeleccionada = boton.dataset.categoria; // 'nature', 'technology' o 'people'

        // Marcamos visualmente el botón activo
        botonesCategoria.forEach((btn) => btn.classList.remove("activa"));
        boton.classList.add("activa");

        // Cargamos y pintamos sus fotos
        cargarCategoria(categoriaSeleccionada);
    });
});


// // Carga inicial al entrar en la app (primera categoría por defecto: "nature")
// if (botonesCategoria.length > 0) {
//     botonesCategoria[0].classList.add("activa");
//     cargarCategoria(botonesCategoria[0].dataset.categoria);
// };


// FAVORITO 
//se realiza un bucle para que se pinte a toda la coleccion
//lo meto dentro de una funcion para poder ejecutar el query dentro 
function capturarBotonesFavoritos() {
    const btnFavorito = document.querySelectorAll(".btnFavorito");
    btnFavorito.forEach(button => {
        button.addEventListener("click", (ev) => {
            //console.log(1);
            const cardFoto = ev.target.closest(".tarjeta-foto");
            const fav = {
                id: button.dataset.id,
                name: cardFoto.querySelector("span").textContent,
                src:  cardFoto.querySelector("img").src,
                alt:  cardFoto.querySelector("img").alt,
            };
            alternarBtnFavorito(fav);
            console.log(fav);
            colorCorazonFavorito();
        });
    });
};

//FUNCIONES FAVORITOS 
//CARGAR LOS DATOS EN EL LOCALSTORAGE DEL ARRAY DE FAVORITOS 
let favoritos = [];
//funcion para almacenarlo
const actualizarFavoritosLocalStorage = () => { //declarar funcion 
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
};

//funcion para cargarlo 
const subirFavoritosLocalStorage = () => {
    const almacenarFavoritos = localStorage.getItem("favoritos");
    if (almacenarFavoritos) {     //si existen dalos...
        favoritos = JSON.parse(almacenarFavoritos); //... almacenar en el local 
        colorCorazonFavorito();
    }
};
function alternarBtnFavorito(fav) {
    //buscar el indice de los favoritos 
    const index = favoritos.findIndex(element => element.id === fav.id) //se conecta con el evento

    //si no se encontro se pone y si se encuentra se quita 
    if (index !== -1) {
        favoritos.splice(index, 1);
        actualizarFavoritosLocalStorage();
    } else {
        favoritos.push(fav);
        actualizarFavoritosLocalStorage();
    }
contadorFavoritos.textContent = favoritos.length;
contadorFavoritos.textContent = favoritos.length;
};
const colorCorazonFavorito = () => {
    const btnFavorito = document.querySelectorAll(".btnFavorito");
    btnFavorito.forEach(boton => {
        const idFoto = boton.dataset.id;
        const esFavorito = favoritos.some ( //some es metodo de array 
            fav => fav.id === idFoto
        );
        boton.classList.toggle("favActive", esFavorito)
        
        console.log(esFavorito)
    })
}
//capturar elementos de la seccion favoritos 
//ej.: .cointeinerListaFavoritos / .listFavoritos 
/*const carpertaFavoritos = () => { 
    listaFavoritos.innetHTML = "";
    favoritos.forEach(fav => {
        const favoriteCard = document.createElement("DIV");
        favoriteCard = classList.add("cardFavoritos")

//         const titleFavoritos = document.createElement("P");
//         titleFavoritos.classList.add("tituloFavoritos");//se le da una clase a ese parrafo
//         titleFavoritos.textContent = fav.title; //se le da un contenido
//         favoriteCard.append(titleFavoritos)

//     })

};
*/

//(rama: jamile) (●'◡'●).

let busquedaActual = "nature";
let paginaActual = 1;
let totalPaginas = 10; // Iniciamos mayor que 1 para permitir avanzar desde la primera carga

/* Función segura para leer la búsqueda o categoría activa sin devolver 'undefined' */
const obtenerTerminoActual = () => {
    const botonActivo = document.querySelector(".boton-categoria.activa, .boton-categoria.active");
    if (botonActivo) {
        return botonActivo.dataset.categoria || botonActivo.dataset.category || botonActivo.textContent.trim();
    }
    if (campoBusqueda && campoBusqueda.value.trim() !== "") {
        return campoBusqueda.value.trim();
    }
    return busquedaActual || "nature";
};

/* Función auxiliar para buscar con orientación (sin modificar llamarApi) */
const llamarApiConOrientacion = async (busqueda, pagina = 1, orientacion = "") => {
    try {
        const terminoSeguro = busqueda && busqueda.trim() !== "" ? busqueda.trim() : "nature";
        let urlPeticion = `${url_base}?query=${encodeURIComponent(busqueda)}&page=${pagina}&per_page=12`;
        
        const valorLimpio = orientacion.toLowerCase().trim();
        let orientacionApi = "";

        if (valorLimpio === "vertical" || valorLimpio === "portrait") {
            orientacionApi = "portrait";
        } else if (valorLimpio === "horizontal" || valorLimpio === "landscape") {
            orientacionApi = "landscape";
        }

        if (orientacion !== "") {
            urlPeticion += `&orientation=${orientacion}`;
        }

        const response = await fetch(urlPeticion, {
            headers: {
                Authorization: `Client-ID ${url_key}`
            }
        });

        if (!response.ok) {
            throw new Error(response.status);
        }

        const data = await response.json();
        return {
            fotos: data.results || [],
            total: data.total_pages || 1
        };

    } catch (error) {
        console.error("Error al buscar con orientación:", error);
        return { fotos: [], total: 1 };
    }
};

/*Actualizar el texto de página y bloquea /desbloquea los botones */
const actualizarInterfazPaginacion = () => {
    textoNumeroPagina.textContent = `Página ${paginaActual} de ${totalPaginas}`;
    botonPaginaAnterior.disabled = paginaActual <= 1;
    botonPaginaSiguiente.disabled = paginaActual >= totalPaginas || totalPaginas === 0;
};


/* 5- Buscador. 
-Obtener texto del buscador(categoria). 
-Realizar la busqueda en API reiniciando a la página 1. */

const buscarPorPalabra = async (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página

    const textoBusqueda = campoBusqueda.value.trim();

    // Validamos que el input no esté vacío
    if (textoBusqueda === "") {
        mensajeErrorBusqueda.textContent = "Por favor, escribe una palabra clave para buscar.";
        return;
    }

    mensajeErrorBusqueda.textContent = "";
    mensajeResultados.textContent = "Cargando imágenes...";

    // Quitamos la marca activa de las categorías al hacer una búsqueda manual
    botonesCategoria.forEach((btn) => btn.classList.remove("activa"));

    busquedaActual = textoBusqueda;
    paginaActual = 1;
    const orientacion = selectorOrientacion.value;

    //invocamos la función
    const resultados = await llamarApiConOrientacion(busquedaActual, 1, orientacion);
    totalPaginas = resultados.total;

    pintarGaleria(resultados.fotos);
    actualizarInterfazPaginacion();
};

formularioBusqueda.addEventListener("submit", buscarPorPalabra);

/* 6- Filtrar Fotos. -Filtrar por orientación: Imagenes horizontales, verticales y todas. */
// Guardamos el término actual para que el filtro de orientación sepa qué palabra está buscando
const filtrarPorOrientacion = async () => {
    mensajeErrorBusqueda.textContent = "";

    // Si hay un botón de categoría activo, usamos su texto o dataset
    const botonActivo = document.querySelector(".boton-categoria.activa, .boton-categoria.active");
    if (botonActivo) {
        busquedaActual = botonActivo.dataset.categoria || botonActivo.textContent.trim();
    }else if (campoBusqueda.value.trim() !== "") {
        busquedaActual = campoBusqueda.value.trim();
    }

    const orientacionSeleccionada = selectorOrientacion.value; // "", "portrait" o "landscape"
    paginaActual = 1;
    mensajeResultados.textContent = "Filtrando imágenes...";

    //invocando la función 
    const resultado = await llamarApiConOrientacion(busquedaActual, 1, orientacionSeleccionada);
    totalPaginas = resultado.total;

    pintarGaleria(resultado.fotos);
    actualizarInterfazPaginacion();
};

selectorOrientacion.addEventListener("change", filtrarPorOrientacion);

//7. Paginación: implementar paginación para poder navegar entre los resultados cuando haya muchas imágenes.
const cambiarPagina = async (nuevaPagina) => {
    busquedaActual = obtenerTerminoActual();
    paginaActual = nuevaPagina;

    const orientacion = selectorOrientacion? selectorOrientacion.value: "";
    mensajeResultados.textContent = "Cargando página...";

    const resultado = await llamarApiConOrientacion(busquedaActual, paginaActual, orientacion);
    totalPaginas = Number (resultado.total) || 1; /* el number es para convertir el texto en numero. y el || 1 es para proteger contra errores. En caso de un error, no devolva un NaN*/

    pintarGaleria(resultado.fotos);
    actualizarInterfazPaginacion();

    window.scrollTo({ top: 0, behavior: "smooth" });
};

botonPaginaAnterior.addEventListener("click", () => {
    if (paginaActual > 1) {
        cambiarPagina(paginaActual - 1);
    }
});

botonPaginaSiguiente.addEventListener("click", () => {
    if (paginaActual < totalPaginas) {
        cambiarPagina(paginaActual + 1);
    }
});
/* sincronización de botones */
botonesCategoria.forEach((boton) => {
    boton.addEventListener("click", async () => {
        paginaActual = 1;
        busquedaActual = boton.dataset.categoria || boton.dataset.category || boton.textContent.trim();
        const orientacion = selectorOrientacion ? selectorOrientacion.value : "";

        const resultado = await llamarApiConOrientacion(busquedaActual, 1, orientacion);
        totalPaginas = Number(resultado.total) || 1;
        actualizarInterfazPaginacion();
    });
});


/* 6-. Funcion que va a recorrer los botones de categorías y va mostrar 1 imagen de cada nicho en la carga inicial de la pagina. */

const pintarImagenesPortada = () => {
    // Quitamos las imagenes anteriores si la funcion se vuelve a ejecutar.
    // contenedorPortadas.innerHTML = "";

    // Recorremos los botones. Cada vuelta corresponde a una categoría.
    botonesCategoria.forEach(async (button) => {
        // Leemos el valor de data-categoria, por ejemplo: "nature". 
        // dataset lo que permite es leer atributos que empiezan por 'data-'
        const nombreCategoria = button.dataset.categoria;

        // Pedimos a la api las imagenes relacionadas con esa categoria
        const imagenes = await llamarApi(nombreCategoria);
        // console.log(imagenes)
        // imagenes es un array de objetos, cada objeto es una imagen de la categoria.

        // Almacenamos en imagenesPorCategoria (objeto) todas las imagenes de cada categoria. (El array completo)
        imagenesPorCategoria[nombreCategoria] = imagenes;

        // Si la categoria no tiene imagenes o la peticion a la API falla, el forEach tiene que seguir trabajando con la siguiente.
        if (!imagenes || imagenes.length === 0) return;

        // Elegimos una foto al azar para mostrarla como imagen principal.
        const indiceDeArrayImagenesAleatorio = Math.floor(Math.random() * imagenes.length);
        const objetoImagenAleatoria = imagenes[indiceDeArrayImagenesAleatorio];
        // console.log(objetoImagenAleatoria)
        // console.log(objetoImagenAleatoria.links.html)
        // console.log(objetoImagenAleatoria.urls.raw)


        // Creamos la etiqueta <img> y le damos sus atributos.
        const imagenHTML = document.createElement("IMG");
        // imagenHTML.classList.add("imagenPortada"); Confirmar con CSS si la imagen necesita clase.

        // Damos atributos src y alt por las propiedades de el objetoImagenAleatoria (visto en consola)
        imagenHTML.src = objetoImagenAleatoria.urls.small;
        // Si el objetoImagenAleatoria no tiene alt ----- `Portada de ${nombreCategoria}`
        imagenHTML.alt = objetoImagenAleatoria.alt_description || `Portada de ${nombreCategoria}`;

        // Metemos la imagen dentro de cada button.
        button.append(imagenHTML);
    });
};

// Ejecutamos la función para mostrar las portadas.
pintarImagenesPortada();
 