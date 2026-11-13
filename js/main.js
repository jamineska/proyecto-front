//VARIABLES
const url_key = 'S0SPXGCuvujnz1b_8l2o4UmZKLDVQOBIzzHw201v2Vc'; //variable para llamar a la API
const url_base = 'https://api.unsplash.com/'


//capturar elementos
const favoritos = document.querySelector("#favoritos");
const filtroCategorias = document.querySelector("#filtroCategorias");
const inputCategoria = document.querySelector("#inputCategorias");
const listaCategorias = document.querySelector("#listaCategorias");
const containerGaleria = document.querySelector("#containerGaleria");


//EVENTOS



//FUNCIONES
//llamar a la API
const llamarApi = async () => {
    try {
        const response = await fetch(`${url_base}` {
            headers: {
                Authorization: `Client-ID ${url_key}`
            }
        })
        if (!response.ok) {
            throw new Error(response.status)
        }

        const data = await response.json();

    } catch (error) {
        return ;
    }
}
llamarApi()
console.log(llamarApi());

//pintar galería
const pintarGaleria = () => {

}

//FAVORITOS
//local storage
let galerias = JSON.parse(localStorage.getItem("galeria")) || [];
//activar botón
//pintar favoritos
const pintarFavoritos = (){
}


//Pintar Main





