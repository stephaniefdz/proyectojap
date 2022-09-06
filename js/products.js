
// Defino las constantes
const listaProductos = document.getElementById("verProductos");
const ORDER_ASC_BY_COST = "costoAscendente";
const ORDER_DESC_BY_COST = "costoDescendente";
const ORDER_BY_PROD_REL = "Relevancia";
const ORDER_BY_SEARCH = "Según Busqueda"; // Estoy probando si funciona
const PRODUCTOS = PRODUCTS_URL + localStorage.catID + ".json";
let productsArray =  [];
let currentProductsArray = productsArray.product;
let currentSortCriterio = undefined;
let minCost = undefined;
let maxCost = undefined;

// Criterios de orden de productos

function sortProducts(criterio, array) {
    let result = [];
    if (criterio === ORDER_ASC_BY_COST) {
      result = array.sort(function (a, b) {
        if (a.cost < b.cost) {
          return -1;
        }
        if (a.cost > b.cost) {
          return 1;
        }
        return 0;
      });
    } else if (criterio === ORDER_DESC_BY_COST) {
      result = array.sort(function (a, b) {
        if (a.cost > b.cost) {
          return -1;
        }
        if (a.cost < b.cost) {
          return 1;
        }
        return 0;
      });
    } else if (criterio === ORDER_BY_PROD_REL) {
      result = array.sort(function (a, b) {
        let aSold = parseInt(a.soldCount);
        let bSold = parseInt(b.soldCount);
  
        if (aSold > bSold) {
          return -1;
        }
        if (aSold < bSold) {
          return 1;
        }
        return 0;
      });
    }
  
    return result;
  }
function verListado() {
  let htmlContentToAppend = "";
  for (let i = 0; i < currentProductsArray.length; i++) {
    let product = currentProductsArray[i];
    let searchProduct = document.getElementById("searchItem").value.toLowerCase();

    // En el caso de que mo se selecione un MAX O MIN se deberian ver todos los productos
    if ((minCost == undefined || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
      (maxCost == undefined || (maxCost != undefined && parseInt(product.cost) <= maxCost)) 
      && product.name.toLowerCase().includes(searchProduct)
    ) {
      htmlContentToAppend += `<div class="list-group" id="cat-list-container">   
                <div class="bg-dark text-white shadow-none p-3 mb-5 bg-light rounded list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src= "${product.image}" alt="product image" class="img-fluid rounded"">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">
                            <h4>${product.name} - ${product.currency} : ${product.cost}</h4> 
                            <p> ${product.description}</p> 
                            </div>
                            <small class="text-muted">${product.soldCount} Vendidos </small> 
                        </div>
                    </div>
                    </div>    
                    </div>  
                   `;
    }
  }
  listaProductos.innerHTML = htmlContentToAppend;
}

// document.addEventListener("DOMContentLoaded", function(e) {
//     let resultArray = [];
//     getJSONData(PRODUCTOS).then(function (resultObj) {
//         if (resultObj.status === "ok") {
//             resultArray = resultObj.data.products;
//         }
//         console.log(resultArray);
//         verListado(resultArray);
//     }
//     )
// });



// Con esto se ordena y se muestran los productos ordenados según el criterio seleccionado

function sortAndShowProducts(sortCriterio, productsArray) {
  currentSortCriterio = sortCriterio;

  if (productsArray != undefined) {
    currentProductsArray = productsArray;
  }

  currentProductsArray = sortProducts(currentSortCriterio,currentProductsArray);

  verListado();
}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCTOS).then(function (resultObj) {
    if (resultObj.status === "ok") {
        currentProductsArray = resultObj.data.product
        verListado();  
    //   let objeto = resultObj.data;
    //   return objeto;
    }
  });

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

    verListado();
});

});

