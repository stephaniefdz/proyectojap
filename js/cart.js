
const GET_CART = CART_INFO_URL; 
const productsinCartHTML = document.getElementById("cart"); 

// Funcion que trae al articulo del usuario en el carrito 

  function showCart(cart) {
    showCartHtmlToAppend = '';
    for (let i = 0; i < cart.length; i++) {
        showCartHtmlToAppend += ` 
        <tr> 
        <tr onchange="modify(subto)">
            <th scope="col" class="${"art"+i} "><img src="${cart[i].image}" width="150px"></th>
            <th scope="col" class="${"art"+i}">${cart[i].name}</th>
            <th scope="col" class="${"art"+i}">${cart[i].currency} <span class="cost">${cart[i].unitCost}</span></th>
            <th scope="col" class="${"art"+i}"><input type="number" min="1" max="5" value="${cart[i].count}" style="width: 70px;"></th>
            <th scope="col" class="${"art"+i}">${cart[i].currency} <span class="subTotal" data-currency="${cart[i].currency}">${cart[i].unitCost * cart[i].count}</span></th>
            <td> <button type="button" class="btn btn-link" onclick="removeArticle(0);"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#750000" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg> </button></td>
            </tr>
        `
    }


    productsinCartHTML.innerHTML = showCartHtmlToAppend;
}




// Funcion para eliminar articulo del carrito FUNCIONAL 

let article = [];
function removeArticle (id) {

    let article = document.getElementsByClassName("art" +id);
    article[0].parentElement.remove(); 
    window.setTimeout(function(){location.reload()},200);  // Despues de presionar el boton de la papelera (icono en rojo), se elimina y se reinicia el articulo en pantalla (SOLO PARA ESTA ENTREGA) 
}

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



