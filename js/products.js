
// Defino las constantes

const getURLProducts = PRODUCTS_URL;  
const listaProductos = document.getElementById("productListContainer");
const ORDER_ASC_BY_COST = "costoAscendente";
const ORDER_DESC_BY_COST = "costoDescendente";
const ORDER_BY_PROD_REL = "Relevancia";
// const ORDER_BY_SEARCH = "Según Busqueda"; // Estoy probando si funciona
let currentProductsArray =[];
let currentSortCriteria = undefined;
let minCost = undefined;
let maxCost = undefined;



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

// Funcion para guardar el ID del producto en el localstorage
function saveProdID(id) {
    localStorage.setItem("ID", id);
    window.location = "product-info.html"       
    }




function showProductList() {
  let htmlContentToAppend = "";
  for (let i = 0; i < product.products.length; i++) {
    let theProducts = product.products[i]; // products: Propiedad de la resp json 
    let  inputSearchProduct  = document.getElementById("searchItem").value.toLowerCase();
  
    // En el caso de que mo se selecione un MAX O MIN se deberian ver todos los theProducts
    ((minCost == undefined || (minCost != undefined && parseInt(theProducts.cost) >= minCost)) &&
      (maxCost == undefined || (maxCost != undefined && parseInt(theProducts.cost) <= maxCost)&& theProducts.name.toLowerCase().includes(inputSearchProduct)) 
      
    )
    //  
    {
      htmlContentToAppend += `<div class="list-group" id="cat-list-container">   
                <div class="text-dark shadow-none p-3 mb-3 bg-light rounded list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src= "${theProducts.image}" alt="product image" class="img-fluid rounded"">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">
                            <h4>${theProducts.name} - ${theProducts.currency} : ${theProducts.cost}</h4> 
                            <p> ${theProducts.description}</p> 
                            </div>
                            <small class="text-muted">${theProducts.soldCount} Vendidos </small> 
                        </div>
                        <br>
                        <button class="btn btn-outline-dark btn-rounded me-md-2" type="button" style="border-radius: 40px;" onclick="saveProdID(${theProducts.id})">Ver producto</button>
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

  showProductList();
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", async function() { // Trae la resp de la URL de CATID y se convierte en una variable PRODUCTS
    getJSONData(getURLProducts).then(function (response) {
        if (response.status === "ok") {
            product = response.data; 
            console.log(product)
            showProductList();
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

    showProductList();
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
    showProductList();
});





