//VARIABLES
const url_key = 'S0SPXGCuvujnz1b_8l2o4UmZKLDVQOBIzzHw201v2Vc'; //variable para llamar a la API
const url_base = 'https://api.unsplash.com'


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
        const urlPeticion = `${url_base}/search/photos?query=${encodeURIComponent(busqueda)}&page=${pagina}&per_page=12`; //query palabra a buscar page la página y per_page fotos por página, que hemos elegido 12

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




/* 4- Pintar Categorías.
-Conectar con la API.
-Recibir y almacenar las fotografías.
-Mostrar las tres categorías de imagenes. */




/* 5- Buscador.
-Obtener texto del buscador(categoria).
-Realizar la busqueda en API por categorias. */

 


/* 6- Filtrar Fotos
-Filtrar por orientación: Imagenes horizontales, verticales y todas. */




