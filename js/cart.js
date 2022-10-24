

// Defino las constantes necesarias 

const GET_CART = CART_INFO_URL; // URL QUE CONTIENE LOS DATOS QUE QUIERO MOSTRAR 
const productsinCartHTML = document.getElementById("cart"); 
//USD = 41;

let TIPO_ENVIO = { standard: 5, express: 7, premium: 15 };

// Funcion que trae al articulo del usuario en el carrito con un for y lo insertamos en el html cart que es un tbody

function showCart(cart) {
    htmlContentToAppend = '';
    for (let i = 0; i < cart.length; i++) { //recorre todos los productos del carrito
        htmlContentToAppend += ` 
        <tr onchange="modify(event)"> 
            <th scope="col" class="${'article'+i}"><img src="${cart[i].image}" width="150px"></th>
            <th scope="col" class="${'article'+i}">${cart[i].name}</th>
            <th scope="col" class="${'article'+i}">${cart[i].currency} <span class="cost">${cart[i].unitCost}</span></th>
            <th scope="col" class="${'article'+i}"><input type="number" min="1" value="${cart[i].count}" data-class="${'article'+i}"></th>
            <th scope="col" class="${'article'+i}">${cart[i].currency} <span class="subTotal" data-currency="${cart[i].currency}" data-subtotal="${cart[i].unitCost * cart[i].count}">${cart[i].unitCost * cart[i].count}</span></th>
            <td> <button class="btn btn-outline-danger p-1" onclick="removeArticle(0);"><i class="fa-solid fa-trash"></i></button>
            </tr>
        `
    }
    productsinCartHTML.innerHTML = htmlContentToAppend;
//llamamos y ejecutamos a la función resumenCompra()
    resumenCompra();
}


//Funcion para eliminar un articulo del carrito que recible como parametro id 

// Defino la variable article

let article = [];

function removeArticle(id) { 
    
    let article = document.getElementsByClassName('article'+id);
    article[0].parentElement.remove();
    window.setTimeout('location.reload()', 300);  //Solo para mostrar que funciona el boton de eliminar - se eliminara en proximas entregas 
   //llamamos y ejecutamos a la función resumenCompra()
    resumenCompra();
}

//Funcion que suma el precio de los productos en el subtotal
//dataset: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset

function modify(event) {
    dataArti = document.getElementsByClassName(event.target.dataset.class);

    // Actualiza subtotal
    if (parseInt(dataArti[3].getElementsByTagName('input')[0].value) <= 0) {
        dataArti[3].getElementsByTagName('input')[0].value = 1;
    }
    let subtotal = parseFloat(dataArti[2].getElementsByClassName('cost')[0].innerHTML) * parseInt(dataArti[3].getElementsByTagName('input')[0].value);
    let elem = dataArti[4].getElementsByClassName('subTotal')[0];
    elem.innerHTML = subtotal;
    elem.dataset.subtotal = subtotal;
    //llamamos y ejecutamos a la función resumenCompra()
    resumenCompra();
}


// Funcion para mostrar y actualizar el monto del subtotal, gastos de envio y gestion, total dinamicamente

function resumenCompra() {
    let envio = document.querySelector('input[type=radio]:checked'); //se ontiene el valor del boton tipo radio

    //se define el contador subtotal, gastosEnvio y total inicializado en 0.
    let subtotal = 0; 
    let gastosEnvio = 0;
    let total = 0;

    let subTotalArticles = document.getElementsByClassName('subTotal');
    for (elem of subTotalArticles) {
        if (elem.dataset.currency === 'USD') {
            // console.log(elem.dataset.subtotal);
            subtotal += parseFloat(elem.dataset.subtotal);
        } else {
            subtotal += parseFloat(elem.dataset.subtotal);
        }
    }

// RESUMEN DE COMPRAS

    // Muestro el monto en el subtotal del resumen de compra 
    document.getElementById('subtotal').innerHTML = subtotal;
    
        // Muestro el monto del subtotal multiplicado por los costes de envio segun elección en el resumen 
    gastosEnvio = subtotal * TIPO_ENVIO[envio.id] / 100;
    document.getElementById('envio').innerHTML = gastosEnvio;

    //Muestro el monto total en el resumen de compras sumando subTotal y envio 
    document.getElementById('total').innerHTML = subtotal + gastosEnvio;
}


// Petición web a URL del carrito de compras con el usuario 25801

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", async function() { 
    
    getJSONData(GET_CART).then(function (cart) {
        if (cart.status === "ok") {
            articles = cart.data.articles;
            console.log(articles);
            showCart(articles); 
        }
        
       
    }
    )
});



    //  Desactivación de los campos de la opción no seleccionada 

    document.getElementById("payTrans").addEventListener("click", function () {
        document.getElementById("transNum").removeAttribute("disabled");
        document.getElementById("exp").setAttribute("disabled", "");
        document.getElementById("cvv").setAttribute("disabled", "");
        document.getElementById("cardNum").setAttribute("disabled", "");
       
        
    });
    
    document.getElementById("payCard").addEventListener("click", function () {
        document.getElementById("exp").removeAttribute("disabled");
        document.getElementById("cvv").removeAttribute("disabled");
        document.getElementById("cardNum").removeAttribute("disabled");
        document.getElementById("transNum").setAttribute("disabled", "");
        
    });


