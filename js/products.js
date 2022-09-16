
// Defino las constantes

const GET_PRODUCTOS = PRODUCTS_URL;  // Arreglado en init 
const listaProductos = document.getElementById("verProductos");
const ORDER_ASC_BY_COST = "costoAscendente";
const ORDER_DESC_BY_COST = "costoDescendente";
const ORDER_BY_PROD_REL = "Relevancia";
const ORDER_BY_SEARCH = "Según Busqueda"; // Estoy probando si funciona
// const PRODUCTOS = `PRODUCTS_URL + localStorage.getItem("catID") + ".json"`; 
let currentProductsArray =[];
let currentSortCriteria = undefined;
let minCost = undefined;
let maxCost = undefined;


// Funcion para guardar el ID del producto en el localstorage
function saveProdID(id) {
    localStorage.setItem("ID", id);
    window.location = "product-info.html"       
    }


// Criterios de orden de productos

function sortProducts(criteria, array){
  let result = [];
  if (criteria === ORDER_ASC_BY_COST)
  {
      result = array.sort(function(a, b) {
          if ( a.cost < b.cost ){ return -1; }
          if ( a.cost > b.cost ){ return 1; }
          return 0;
      });
  }else if (criteria === ORDER_DESC_BY_COST){
      result = array.sort(function(a, b) {
          if ( a.cost > b.cost ){ return -1; }
          if ( a.cost < b.cost ){ return 1; }
          return 0;
      });
  }else if (criteria === ORDER_BY_PROD_REL){
      result = array.sort(function(a, b) {
          let aCount = parseInt(a.soldCount);
          let bCount = parseInt(b.soldCount);

          if ( aCount > bCount ){ return -1; }
          if ( aCount < bCount ){ return 1; }
          return 0;
      });
  }

  return result;
}




function verListado() {
  let htmlContentToAppend = "";
  for (let i = 0; i < product.products.length; i++) {
    let productos = product.products[i]; // products: Propiedad de la resp json 
    let searchProduct = document.getElementById("searchItem").value.toLowerCase(); 

    // En el caso de que mo se selecione un MAX O MIN se deberian ver todos los productos
    if ((minCost == undefined || (minCost != undefined && parseInt(productos.cost) >= minCost)) &&
      (maxCost == undefined || (maxCost != undefined && parseInt(productos.cost) <= maxCost)&& productos.name.toLowerCase().includes(searchProduct)) 
      
    )
    //  
    {
      htmlContentToAppend += `<div class="list-group" id="cat-list-container">   
                <div class="bg-dark text-white shadow-none p-3 mb-5 bg-light rounded list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src= "${productos.image}" alt="product image" class="img-fluid rounded"">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">
                            <h4>${productos.name} - ${productos.currency} : ${productos.cost}</h4> 
                            <p> ${productos.description}</p> 
                            </div>
                            <small class="text-muted">${productos.soldCount} Vendidos </small> 
                        </div>
                    </div>
                    </div>    
                    </div>  
                   `;
    }
  }
  listaProductos.innerHTML = htmlContentToAppend;
}

function sortAndShowProducts(sortCriteria, productsArray) {
  currentSortCriteria = sortCriteria;

  if (productsArray != undefined) {
    products = productsArray;
  }

  sortProducts(currentSortCriteria, product.products);

  verListado();
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", async function() { // Trae la resp de la URL de CATID y se convierte en una variable PRODUCTS
    getJSONData(GET_PRODUCTOS).then(function (response) {
        if (response.status === "ok") {
            product = response.data; 
            console.log(product)
            verListado();
        }
        console.log(CATID)  
        
       
    }
    )
});



// INICIO DE FUNCIONES DE ORDEN, FILTRADO 


  // Al dar click deberia ordenar de forma ascendente segun precio/costo 
  document.getElementById("sortAsc").addEventListener("click", function(){
    sortAndShowProducts(ORDER_ASC_BY_COST);
});

// Al dar click deberia ordenar de forma descendente segun precio/costo 
document.getElementById("sortDesc").addEventListener("click", function(){
    sortAndShowProducts(ORDER_DESC_BY_COST);
});

//Al dar click deberia ordenar por relevancia 

document.getElementById("sortByCount").addEventListener("click", function(){
    sortAndShowProducts(ORDER_BY_PROD_REL);
});

// Al dar click "Resetea" el filtro de cost 
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
    document.getElementById("rangeFilterCostMin").value = "";
    document.getElementById("rangeFilterCostMax").value = "";

    minCost = undefined;
    maxCost = undefined;

    verListado();
});

//Obtengo el mínimo y máximo de los intervalos para filtrarlos x precio
document.getElementById("rangeFilterCost").addEventListener("click", function(){
    minCost = document.getElementById("rangeFilterCostMin").value;
    maxCost = document.getElementById("rangeFilterCostMax").value;

    // Aca se verifica si minCost y maxCost son undefined / VACIOS para filtrarlos por su costo/precio
    if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
      minCost = parseInt(minCost);
  }

  else{
      minCost = undefined;
  }

  if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
      maxCost = parseInt(maxCost);
  }

  else{
      maxCost = undefined;
  }
console.log(maxCost)
    verListado();
});





