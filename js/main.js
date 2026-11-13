//VARIABLES
const url_key = 'S0SPXGCuvujnz1b_8l2o4UmZKLDVQOBIzzHw201v2Vc'; //variable para llamar a la API
const url_base = 'https://api.unsplash.com'


//capturar elementos
const favoritos = document.querySelector("#favoritos");
const filtroCategorias = document.querySelector("#filtroCategorias");
const inputCategoria = document.querySelector("#inputCategorias");
const listaCategorias = document.querySelectorAll("#listaCategorias li"); //almacenamos TODOS los elementos li de #listaCategorias.
const containerGaleria = document.querySelector("#containerGaleria");


//EVENTOS



//FUNCIONES

/*1- Llamar a la API.*/

/* Así es como lo teniamos antes: const response = await fetch(url_base, {
Tambien nos faltaba return de const data.*/
const llamarApi = async (busqueda) => {
    try {
        const response = await fetch(`${url_base}/search/photos?query=${busqueda}`,
            {
                headers: {
                    Authorization: `Client-ID ${url_key}` //Aquí sobraban espacios en Client - ID
                }
            })
        if (!response.ok) {
            throw new Error(response.status)
        }
        const data = await response.json();
        //console.log(data)
        return data

    } catch (error) {
        return
    }
}
// llamarApi()
// console.log(llamarApi('naturaleza'));





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

const pintarCategorias = () => {
    listaCategorias.forEach((categoria) => {
        // console.log(categoria.textContent)
        llamarApi(categoria.textContent) //recorremos listaCategorias y le pasamos el contenido de texto a la funcion llamarApi
    });
        /* SIGUIENTE PASO:
         Recoger la respuesta que devuelve llamarApi para cada categoría.
         Después, guardar esas fotos y pintarlas en el HTML. */
}
pintarCategorias()




/* 5- Buscador.
-Obtener texto del buscador(categoria).
-Realizar la busqueda en API por categorias. */




/* 6- Filtrar Fotos.
-Filtrar por orientación: Imagenes horizontales, verticales y todas. */




