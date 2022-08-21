let DATA_AUTOS = "https://japceibal.github.io/emercado-api/cats_products/101.json"; 

const listadoAutos = document.getElementById("listadoAutos"); //Aca es donde coloco la info que necesito 

function verListado(dataArray) {
    for(const autos of dataArray) {
        listadoAutos.innerHTML += `
        <div class="list-group" id="cat-list-container">   
        <div class="bg-dark text-white shadow-none p-3 mb-5 bg-light rounded list-group-item list-group-item-action">
        <div class="row">
            <div class="col-3">
                <img src= "${autos.image}" alt="product image" class="img-fluid rounded"">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1">
                    <h4>${autos.name} - ${autos.currency} : ${autos.cost}</h4> 
                    <p> ${autos.description}</p> 
                    </div>
                    <small class="text-muted">${autos.soldCount} Vendidos </small> 
                </div>
            </div>
            </div>    
            </div>  
           `; 
    }
}

let getJSONData = function(url) {
    let result = {};
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        return result;
    });
}; 

document.addEventListener("DOMContentLoaded", function(e) {
    let resultArray = [];
    getJSONData(DATA_AUTOS).then(function (resultObj) {
        if (resultObj.status === "ok") {
            resultArray = resultObj.data.products;
        }
        console.log(resultArray);
        verListado(resultArray);
    }
    )
});
