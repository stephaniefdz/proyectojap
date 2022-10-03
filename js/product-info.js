
// defino las constantes necesarias 
const GET_INFO = PRODUCT_INFO_URL; 
const GET_COMENTARIOS = PRODUCT_INFO_COMMENTS_URL;  
const GET_PRODUCTO = PRODUCTS_URL; 
const productNameHTML = document.getElementById('productName');
const productDescriptionHTML = document.getElementById('productDescription');
const productCostHTML = document.getElementById('productCost');
const productSoldCountHTML = document.getElementById('productSoldCount');
let productCategoryHTML = document.getElementById('productCategory');
const SHOW_REVIEWS = document.getElementById("reviewContainer");
const STAR_RATING = document.getElementsByClassName("starRating");

// Muestra las imagenes ilustrativas del producto a traves de un array 

const showIllustrativeImg = (array) => {
  let htmlContentToAppend = '';
  for (let i = 0; i < array.length; i++) {
    let image = array[i];

    htmlContentToAppend += `
    <div class="col-lg-3 col-md-3 col-6 ">
      <div class="d-block mb-6 h-160">
      <img src= "${image}" alt="product image" class="img-fluid rounded"">
      </div>
    </div>
    `
  }
  document.getElementById('productImages').innerHTML = htmlContentToAppend;
}

// Funcion para marcar estrellas y enviarlas en el comentario 
function addStars(str, nro) {
  for (var i = 1; i <= 5; i++) {
    var s = document.getElementById('star' + i)
    s.className = "fa fa-star"  // className devuelve el valor del atributo de contenido de la clase del elemento
  }

  for (var i = 1; i <= nro; i++) {
    var s = document.getElementById('star' + i)
    if (s.className == "fa fa-star") {
      s.className = "fa fa-star checked"
    }
  }

  rating = nro;
  return rating;
}

//Se muestra la calificacion del usuario con estrellas cuando agrega un comentario 

const showRating = (rating) => {
  let htmlScore = '';
  let stars = '';

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += `<i class="fa fa-star checked"></i>`;
    } else {
      stars += `<i class="fa fa-star"></i>`;
    }
  }
  htmlScore = `<span> ${stars} </span>`
  return htmlScore
}

// Se muestra la calificación/rate de estrellas precargadas del  json de JAP 
const showStars = (productInfo) => {
  for (let i = 0; i < productInfo.length; i++) {
    const product = productInfo[i];
    STAR_RATING[i].innerHTML += `<span class="fa fa-star checked"></span>`.repeat(product.score);
    STAR_RATING[i].innerHTML += `<span class="fa fa-star"></span>`.repeat(5 - product.score);
  }
}

// Se muestran los comentarios precargados del json de JAP 
const showUsersComments = (productInfo) => {
  let showUsersCommentsHtmlContentToAppend = [];
  for (let i = 0; i < productInfo.length; i++) {
    let product = productInfo[i];
    showUsersCommentsHtmlContentToAppend += `
    <div class="p-auto my-auto">
      <div class="d-flex justify-content-between">
        <h5 class="font-weight-bold"><i class="fas fa-user mr-1"></i> ${product.user}</h5>
        <div class="starRating">
        </div>
      </div>
            <p class="pt-2 text-justify">${product.description}</p>
            <p class="text-right">${product.dateTime}</p>
            <hr>
    </div>
    `
  }
  SHOW_REVIEWS.innerHTML = showUsersCommentsHtmlContentToAppend;
  showStars(productInfo);
}


// Vuelvo a escribir aca la funcion para guardar el ID del producto en el localstorage y redirigir a product-info.html
function saveProdID(id) {
  localStorage.setItem("ID", id);
  window.location = "product-info.html"       
  }

  // Con esta funcion se puede ver la imagen principal y nombre de producto relacionado 

const showRelatedProducts = (rArray) => {
  let showRelatedProductsHtmlToAppend = '';
  for (let i = 0; i < rArray.length; i++) {
    let related = rArray[i];

    showRelatedProductsHtmlToAppend +=  
    `<div class="card" style="width: 18rem;">
  <img class="card-img-top" src="${related.image}">
  <div class="card-body">
    <h5 class="card-title"> <b>${related.name} </b>  </h5>
    <button type="button" class="btn btn-outline-dark" onclick="saveProdID(${related.id})"> Ver producto</button> 
  </div>
</div>

`
  }
  document.getElementById("relatedProduct").innerHTML = showRelatedProductsHtmlToAppend;
}


// Comentar 
const submitComment = document.getElementById('submitComment');
const postComments = () => {
  let textAreaComments = document.getElementById('textAreaComments').value;
  document.getElementById("textAreaComments").value = " ";

  // Data constructor basado en https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
  let todayDate = new Date(); 
  let month = parseInt(todayDate.getMonth());
  month < 10 ? month = "0" + month : '';
  todayDate = todayDate.getFullYear() + '-' + month + '-' + todayDate.getDate() + '  ' + todayDate.getHours() + ":" + todayDate.getMinutes() + ":" + todayDate.getSeconds();
//   console.log(todayDate);
  if (textAreaComments) {
    let htmlCommentToAppend = `
    <div class="p-2 my-6">
      <div class="d-flex justify-content-between">
        <h5 class="font-weight-bold"><i class="fas fa-user mr-1"></i> ${localStorage.getItem('mail')}</h5>
        <div class="starRating">
            ${showRating(rating)}
        </div>
        </div>
        <p class="pt-2">${textAreaComments}</p>
        <p class="text-right">${todayDate}</p>
        <hr>
      </div>
    </div>
    `

    SHOW_REVIEWS.innerHTML += htmlCommentToAppend;

    
  }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
// Llama, ejecuta y muestra la información del producto en GET_INFO ya esta colocado el ID de producto (ver init.js)
document.addEventListener("DOMContentLoaded", async function() { 
    getJSONData(GET_INFO).then(function (response) {
    if (response.status === 'ok') {
      product = response.data;
      console.log(product);

      
      productNameHTML.innerHTML = product.name;
      productDescriptionHTML.innerHTML = product.description;
      productCostHTML.innerHTML = product.cost;
      productSoldCountHTML.innerHTML = product.soldCount;
      productCategoryHTML.innerHTML = product.category;

      showIllustrativeImg(product.images);
      showRelatedProducts(product.relatedProducts);

    }
  });

  // llamo al json de comentarios y aplico la funcion showUserComments(productComments) 
  getJSONData(GET_COMENTARIOS).then(function (response) {
    let productComments = response.data;
    showUsersComments(productComments);
  });

  submitComment.addEventListener("click", postComments);
 
});

