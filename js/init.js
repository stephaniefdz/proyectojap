const CATID = localStorage.getItem("catID"); //
const prodID = localStorage.getItem("ID"); 
const EXT_TYPE = ".json";
const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = `https://japceibal.github.io/emercado-api/cats_products/${CATID}${EXT_TYPE}`;
const PRODUCT_INFO_URL = `https://japceibal.github.io/emercado-api/products/${prodID}${EXT_TYPE}`;
const PRODUCT_INFO_COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/${prodID}${EXT_TYPE}`;
const CART_INFO_URL =`https://japceibal.github.io/emercado-api/user_cart/${EXT_TYPE}`;
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";


let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
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
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

// Usuario en nav bar 

document.addEventListener('DOMContentLoaded', ()=> {
  let UserId = localStorage.getItem('mail');
  let AddLi = document.getElementsByTagName('li');
  let li = AddLi[3]; // Accedo a la posición  3 de la barra de navegacion (tambien se podria haber utilizado last-child
  li.innerHTML = `<a class=text-light nav-link"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-check-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
  <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
</svg> ${UserId}</a>`;
  });
