//VARIABLES
const url_key = 'S0SPXGCuvujnz1b_8l2o4UmZKLDVQOBIzzHw201v2Vc'; //variable para llamar a la API
const url_base = 'https://api.unsplash.com'


//capturar elementos
const favoritos = document.querySelector("#favoritos");
const filtroCategorias = document.querySelector("#filtroCategorias");
const inputCategoria = document.querySelector("#inputCategorias");
const listaCategorias = document.querySelector("#listaCategorias");
const containerGaleria = document.querySelector("#containerGaleria");


//EVENTOS



//FUNCIONES

/*1- Llamar a la API.*/

const llamarApi = async (/*busqueda*/) => {
    try {
        /*const response = await fetch(`${url_base}/search/photos?query=busqueda, {*/
        const response = await fetch(url_base, {
            headers: {
                Authorization: `Client-ID ${url_key}`
            }
        })
        if (!response.ok) {
            throw new Error(response.status)
        }
        const data = await response.json();

    } catch (error) {
        return
    }
}
llamarApi()
console.log(llamarApi());





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




