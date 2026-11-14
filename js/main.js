//VARIABLES
const url_key = 'S0SPXGCuvujnz1b_8l2o4UmZKLDVQOBIzzHw201v2Vc'; //variable para llamar a la API
const url_base = 'https://api.unsplash.com/search/photos'
const imagenesPorCategoria = {}; //objeto que almacena todas las imagenes de cada categoria.


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
const llamarApi = async (categoria) => {
    try {
        const response = await fetch(`${url_base}?query=${categoria}`,
            {
                headers: {
                    Authorization: `Client-ID ${url_key}` //Aquí sobraban espacios en Client - ID
                }
            })
        if (!response.ok) {
            throw new Error(response.status)
        }
        const data = await response.json();
        // console.log(data)
        return data.results

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
    //recorremos listaCategorias(elementos <li>)  en cada vuelta trabaja con un <li> distinto
    listaCategorias.forEach(async (categoria) => {
        //almacenamos el nombre de la categoria ej.'naturaleza'
        const nombreCategoria = categoria.textContent;
        // console.log(categoria.textContent)

        //pedimos a la api las fotos relacionadas con esa categoria
        const imagenes = await llamarApi(nombreCategoria);
        // console.log(imagenes)
        //imagenes es un array de objetos, cada objeto es una imagen de la categoria.

        //almacenamos en imagenesPorCategoria(objeto) todas las imagenes de cada categoria.(el array completo)
        imagenesPorCategoria[nombreCategoria] = imagenes;

        // Elegimos una foto al azar para mostrarla como imagen principal.
        const indiceDeArrayImagenesAleatorio = Math.floor(Math.random() * imagenes.length);
        const objetoImagenAleatoria = imagenes[indiceDeArrayImagenesAleatorio];
        // console.log(objetoImagenAleatoria)
        // console.log(objetoImagenAleatoria.links.html)
        // console.log(objetoImagenAleatoria.urls.raw)


        // Creamos una etiqueta <img> y la añade a los <li>.
        const imagenHTML = document.createElement("IMG");
        //usamos url de tamaño pequeño y alt(lo he encontrado en el objetoImagenAleatoria en consola)
        imagenHTML.src = objetoImagenAleatoria.urls.small;
        imagenHTML.alt = objetoImagenAleatoria.alt_description;

        //metemos la etiqueta IMG dentro de <li> (cada categoria)
        categoria.appendChild(imagenHTML);
    });
}
pintarCategorias()


/* 5- Buscador.
-Obtener texto del buscador(categoria).
-Realizar la busqueda en API por categorias. */




/* 6- Filtrar Fotos.
-Filtrar por orientación: Imagenes horizontales, verticales y todas. */
























































































































//SELECTOR
//queryALL porque gecoge todos los elementoS de lista para asignarles el evento de presionar boton
//al crear el card de la foto sumar este ID al boton FAVORITO
const btnFavoritos = document.querySelectorAll("#btnFavoritos")
const classCard = document.querySelectorAll(".classCard")

//EVENTO FAVORITO 
//se realiza un bucle para que se pinte a toda la coleccion
btnFavoritos.forEach(button => {
    button.addEventListener("click", (ev) => {
    // console.log(1); chequer en consola presionando boton 
        //const cardFoto = ev.target.closest ...
            //("NOMBRE DE LA CLASE CARD")//obtener elemento especifico HTML
        
        //DIVIDIR ESTA FUNCION EN PINTAR CARD MEJOR
        const cardFotoInformacion = {
            //dataset para el atributo personalizado?? 
        //CHEQUEAR ESTO = id: cardFoto.datset.fotoId; 
            title: cardFoto.querySelector("h3").textContent,
            //añadir resto de caracteristicas
        };
        alternarBtnFavorito(foto);
    });
});

//FUNCIONES FAVORITOS 
- añadirFavorito()
//CARGAR LOS DATOS EN EL LOCALSTORAGE DEL ARRAY DE FAVORITOS 
let favoritos =[]; //array definido 
//funcion para almacenarlo
const actualizarFavoritosLocalStorage = () => { //declarar funcion 
    //(abajo) guargar en el local con su nombre"" y valor (transformar a string)
    localStorage.setItem("favoritos", JSON.stringify("favoritos"), JSON.stringify(favoritos));
};
//funcion para cargarlo 
const subirFavoritosLocalStorage = () => {
    const almacenarFavoritos = localStorage.getItem("favoritos"); 
    //getitem es para obtener, pasar key o nombre 
    if(almacenarFavoritos){
        favorites =>JASON.parse(almacenarFavoritos)
    }
};
 const alternarBtnFavorito = (alternarBtnFavorito) => {
    //buscar el indice de los favoritos 
    const index = favoritos.findIndex(element => element.id === alternarBtnFavorito.id) //se conecta con el evento

    if (index < -1){ //si se encontro en el array...
        favoritos.sprice(index, 1);
        actualizarFavoritosLocalStorage(); //llamar a la funcion para actualizar local 
    }else{
        favoritos.push(alternarBtnFavorito);
        actualizarFavoritosLocalStorage(); //lo mismo que en el if 
    }
 };
 
 const colorCorazon = () => {
    favoritos 
 }




