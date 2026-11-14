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
    try {
        //hize un pequeño cambio para que funcione mi parte. Nota*: por favor actualizar esta parte, en este caso Oliver
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

llamarApi("nature").then(fotos => console.log(fotos)); //aquí vamos poniendo pruebas para ver que funciona
llamarApi("agua").then(fotos => console.log(fotos));
llamarApi("music").then(fotos => console.log(fotos));


/* 2- Pintar Galeria.
-Función general para mostrar imagenes en cualquier espacio de la web.
-Se reutilizará para galería principal, cateorias y favoritos. */


/* 3- Crear Tarjeta.
-Generar la estructura de cada fotografia.
-Incluir imagen, informaciónn y botón para agregar//eliminar de favoritos. */


//inicio sección Categorías (rama: jamile) (●'◡'●). Parte visual y dinámico de la página principal de la aplicación.
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
                <button class="btn-favorito" data-id="${foto.id}" aria-label="Añadir a favoritos">🤍</button>
            </div>
        `;

        galeriaResultados.append(tarjeta);
    });
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


// Carga inicial al entrar en la app (primera categoría por defecto: "nature")
if (botonesCategoria.length > 0) {
    botonesCategoria[0].classList.add("activa");
    cargarCategoria(botonesCategoria[0].dataset.categoria);
}

//fin sección Categorías (rama: jamile)


/* 5- Buscador.
-Obtener texto del buscador(categoria).
-Realizar la busqueda en API por categorias. */

 
/* 6- Filtrar Fotos
-Filtrar por orientación: Imagenes horizontales, verticales y todas. */

//FAVORITOS
//local storage
let favorito = JSON.parse(localStorage.getItem("favoritos")) || [];
//activar botón
//pintar favoritos
/*const pintarFavoritos = (){
}*/







