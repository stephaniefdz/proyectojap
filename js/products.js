
// Defino las constantes
const ORDER_ASC_BY_COST  = "De menor a mayorcosto";
const ORDER_DESC_BY_COST = "De mayor a menor costo";
const ORDER_BY_PROD_REL  = "Relevancia";
const ORDER_BY_SEARCH    = "Según búsqueda"; // Estoy probando si funciona 
let currentSortCriterio  = undefined;
let minCost = undefined;
let maxCost = undefined;

// Redefini la funcion para poder mostrar la lista de productos mixeando codigo de la entrtega  anterior con el de categories

function showProductsList(){
    
    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let product       = currentProductsArray[i];
        let searchProduct =document.getElementById("searchItem").value.toLowerCase(); 

        // En el caso de que mo se selecione un MAX O MIN se deberian ver todos los productos 
        if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost)) &&
            product.name.toLowerCase().includes(searchProduct)){
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
            document.getElementById("verProductos").innerHTML = htmlContentToAppend;
        }

        // Criterios de orden de productos

        function sortProducts(criterio, array){
            let result = [];
            if (criterio === ORDER_ASC_BY_COST)
            {
                result = array.sort(function(a, b) {
                    if ( a.cost < b.cost ){ return -1; }
                    if ( a.cost > b.cost ){ return 1; }
                    return 0;
                });
            }else if (criterio === ORDER_DESC_BY_COST){
                result = array.sort(function(a, b) {
                    if ( a.cost > b.cost ){ return -1; }
                    if ( a.cost < b.cost ){ return 1; }
                    return 0;
                });
            }else if (criterio === ORDER_BY_PROD_REL){
                result = array.sort(function(a, b) {
                    let aSold = parseInt(a.soldCount);
                    let bSold = parseInt(b.soldCount);
        
                    if ( aSold > bSold ){ return -1; }
                    if ( aSold < bSold ){ return 1; }
                    return 0;
                });
            }
        
            return result;
        }

        
// Con esto se ordena y se muestran los productos ordenados según el criterio seleccionado

function sortAndShowProducts(sortCriterio, productsArray){
    currentSortCriterio = sortCriterio;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriterio, currentProductsArray);

    showProductsList();
}


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data);
        } 
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_REL);
    });
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCost").addEventListener("click", function(){
        
        
        //Obtengo el mínimo y máximo de los intervalos para filtrarlos x precio
        
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

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

        showProductsList();
    });

    
    
});

const listaProductos = document.getElementById('verProductos');