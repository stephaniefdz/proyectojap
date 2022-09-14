const CATID = localStorage.getItem("catID"); //
const PRODID = localStorage.getItem("prodID"); 
const EXT_TYPE = ".json";
const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = `https://japceibal.github.io/emercado-api/cats_products/${CATID}${EXT_TYPE}`;
const PRODUCT_INFO_URL = `https://japceibal.github.io/emercado-api/products/${PRODID}${EXT_TYPE}`;
const PRODUCT_INFO_COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/${PRODID}${EXT_TYPE}`;
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
  let li = AddLi[3];
  li.innerHTML = `<a class=text-primary nav-link">${UserId}</a>`;
  });