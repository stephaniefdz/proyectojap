
const getURLInfo = PRODUCT_INFO_URL; 
const getURLComments = PRODUCT_INFO_COMMENTS_URL;  
const getURLProducts = PRODUCTS_URL; 
const productNameHTML = document.getElementById('productName');
const productDescriptionHTML = document.getElementById('productDescription');
const productCostHTML = document.getElementById('productCost');
const productSoldCountHTML = document.getElementById('productSoldCount');
let productCategoryHTML = document.getElementById('productCategory');
const showStarReviews = document.getElementById("reviewContainer");
const starUserRating = document.getElementsByClassName("starRating");

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
function paintStars(star, nro) {
  for (let i = 1; i <= 5; i++) {
    let star = document.getElementById('star' + i)
    star.className = "fa fa-star"  // className devuelve el valor del atributo de contenido de la clase del elemento
  }

  for (let i = 1; i <= nro; i++) {
    let star = document.getElementById('star' + i)
    if (star.className == "fa fa-star") {
      star.className = "fa fa-star checked"
    }
  }

  rating = nro;
  return rating;
}

//Se muestra la calificacion del usuario con estrellas cuando agrega un comentario 

const showRating = (rating) => {
  let scoreUser = '';
  let stars = '';

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += `<i class="fa fa-star checked"></i>`;
    } else {
      stars += `<i class="fa fa-star"></i>`;
    }
  }
  scoreUser = `<span> ${stars} </span>`
  return scoreUser
}

// Se muestra la calificación/rate de estrellas precargadas del  json de JAP 
const showStarsRat = (productInfo) => {
  for (let i = 0; i < productInfo.length; i++) {
    const product = productInfo[i];
    starUserRating[i].innerHTML += `<span class="fa fa-star checked"></span>`.repeat(product.score);
    starUserRating[i].innerHTML += `<span class="fa fa-star"></span>`.repeat(5 - product.score);
  }
}

// Se muestran los comentarios precargados del json de JAP 
const showUsersComments = (productInfo) => {
  let htmlContentToAppend = [];
  for (let i = 0; i < productInfo.length; i++) {
    let product = productInfo[i];
    htmlContentToAppend += `
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
  containerReviews.innerHTML = htmlContentToAppend;
  showStarsRat(productInfo);
}


// Vuelvo a escribir aca la funcion para guardar el ID del producto en el localstorage y redirigir a product-info.html
function saveProdID(id) {
  localStorage.setItem("ID", id);
  window.location = "product-info.html"       
  }

  // Con esta funcion se puede ver la imagen principal y nombre de producto relacionado 

const showRelatedProducts = (rArray) => {
  let htmlContentToAppend = '';
  for (let i = 0; i < rArray.length; i++) {
    let related = rArray[i];

    htmlContentToAppend +=  
    `<div class="card" style="width: 18rem;">
  <img class="card-img-top" src="${related.image}">
  <div class="card-body">
    <h5 class="card-title"> <b>${related.name} </b>  </h5>
    <button type="button" class="btn btn-outline-dark" onclick="saveProdID(${related.id})" style="border-radius: 40px;"> Ver producto</button> 
  </div>
</div>

`
  }
  document.getElementById("relatedProduct").innerHTML = htmlContentToAppend;
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

    containerReviews.innerHTML += htmlCommentToAppend;

    
  }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
// Llama, ejecuta y muestra la información del producto en getURLInfo ya esta colocado el ID de producto (ver init.js)
document.addEventListener("DOMContentLoaded", async function() { 
  
    getJSONData(getURLInfo).then(function (response) {
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
  getJSONData(getURLComments).then(function (response) {
    let productComments = response.data;
    showUsersComments(productComments);
  });

  submitComment.addEventListener("click", postComments);
 
});

