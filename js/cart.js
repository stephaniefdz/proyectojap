
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

// Defino las constantes necesarias 
const GET_CART = CART_INFO_URL; // Accedo a los datos de la URL que quiero mostrar en la pagina web  
const productsinCartHTML = document.getElementById("cart"); // Container donde quiero que se "imprima" en el HTML esa información

let TIPO_ENVIO = { standard: 5, express: 7, premium: 15 }; // Defino nombre del objeto, y lo utilizo para almacenar las tres propiedades  de tipo de envio y su value (key-value)



// Funcion que trae al articulo del usuario en el carrito con un for y lo insertamos en el html cart que en un tbody

function showCart(cart) {
    htmlContentToAppend = '';
    for (let i = 0; i < cart.length; i++) { //Recorre todos los productos del carrito
        htmlContentToAppend += ` 
        <tr onchange="changeCosts(event)"> 
            <th scope="col" class="${'article'+i}"><img src="${cart[i].image}" width="150px"></th>
            <th scope="col" class="${'article'+i}">${cart[i].name}</th>
            <th scope="col" class="${'article'+i}">${cart[i].currency} <span class="cost">${cart[i].unitCost}</span></th>
            <th scope="col" class="${'article'+i}"><input type="number" min="1" value="${cart[i].count}" data-class="${'article'+i}"></th>
            <th scope="col" class="${'article'+i}">${cart[i].currency} <span class="subTotal" data-currency="${cart[i].currency}" data-subtotal="${cart[i].unitCost * cart[i].count}">${cart[i].unitCost * cart[i].count}</span></th>
            </tr>
        `
    }
    productsinCartHTML.innerHTML = htmlContentToAppend;
// Y llamamos y ejecutamos a la función costTicket()
    costTicket();
}

//Funcion que suma el precio de los productos en el subtotal
//dataset: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset

function changeCosts(event) {
    dataArti = document.getElementsByClassName(event.target.dataset.class);

    // Actualiza subtotal
    if (parseInt(dataArti[3].getElementsByTagName('input')[0].value) <= 0) {
        dataArti[3].getElementsByTagName('input')[0].value = 1;    
    }
    let subtotal = parseFloat(dataArti[2].getElementsByClassName('cost')[0].innerHTML) * parseInt(dataArti[3].getElementsByTagName('input')[0].value);
    let elem = dataArti[4].getElementsByClassName('subTotal')[0];
    elem.innerHTML = subtotal;
    elem.dataset.subtotal = subtotal;

    //Llamamos y ejecutamos a la función costTicket()
    costTicket();
}


// Funcion para mostrar y actualizar el monto del subtotal, gastos de envio y total dinamicamente

function costTicket() {
    let envio = document.querySelector('input[type=radio]:checked'); // Obtenemos el valor del input radio en estado checked
    //se define el contador subtotal, gastosEnvio y total inicializados en 0 y lo renderizo en el container HTML de "Costos".
    let subtotal = 0; 
    let gastosEnvio = 0;
    let total = 0;

    let subTotalArticles = document.getElementsByClassName('subTotal');
    for (elem of subTotalArticles) {
            // console.log(elem.dataset.subtotal);
            subtotal += parseFloat(elem.dataset.subtotal);
    }
  // Costos 
 // Se visualiza  en el  HTML el monto en el subtotal 

    document.getElementById('subtotal').innerHTML = subtotal;
    
// Se visualiza en el  HTML el monto del subtotal multiplicado por los costes de envio segun elección del usuario
    
    gastosEnvio = subtotal * TIPO_ENVIO[envio.id] / 100;
    document.getElementById('envio').innerHTML = gastosEnvio;

//Se visualiza en el  HTML el monto final sumando el subtotal con los gastos de envio segun lo seleccionado por el usuario
    
    document.getElementById('total').innerHTML = subtotal + gastosEnvio;
}




//  Desactivación de los campos de la opción no seleccionada por medio del uso del evento click y atributo disabled 

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




// Validacion de formulario Bootstrap src https://getbootstrap.esdocu.com/docs/5.1/forms/validation/

(function () {
    'use strict'
  
    // Obtener todos los formularios a los que queremos aplicar estilos de validación de Bootstrap personalizados
    var forms = document.querySelectorAll('.needs-validation')
  
    // Bucle sobre ellos y evitar el envío
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            validarModal()   // ejecuto la funcion de validarmodal 
          }
          else{
            showSuccessAlert() // ejecuto la alerta confirmando la compra éxitosa
          }
          form.classList.add('was-validated')
        }, false)
      })
  })()



const btnModaFP  = document.getElementById("btn-formapago"); // id del boton link del modal 

const btnFinalizarCompra = document.getElementById("btn-finalizarcompra"); // boton de envio del form 



const inputPagoCard = document.querySelector(".pagotarjeta");  // clase dek input radio tipo forma de pago tarjeta
const inputPagoTransf = document.querySelector(".pagotransferencia");  // clase dek input radio tipo forma de pago tarjeta
const aviso = document.querySelector(".fm"); // mensaje oculto 

// campos que use para la validacion del modal 
const vto = document.getElementById("exp");
const banktransf = document.getElementById("transNum"); 

 
 vto.addEventListener("input", validarModal)
 banktransf.addEventListener("input", validarModal)


function validarModal(){
  if(vto.value != "" || banktransf.value != ""){ // si el input vto OR nro cuenta bancaria son diferentes de vacio 
    aviso.style.display = "none" // el aviso en  rojo desaparece 

  } else { 
    aviso.style.display = "inline" // SI NO, se muestra 
  }

}

  
// Para mostrar forma de pago seleccionada en pantalla:

let  btnguardar = document.getElementById("btn-formapago");
let formaelegida = document.getElementById("formaselect");



btnguardar.addEventListener("click", function () {

// Si el input radio de pago con transferencia o pago con tarjeta esta clickeado, imprimo en el span del html cart la forma
if (inputPagoTransf.checked) 
return formaelegida.innerHTML = "Transferencia Bancaria" ; 

if (inputPagoCard.checked) 
return formaelegida.innerHTML = "Tarjeta de crédito / débito"
  });


  // Recurso de: https://sweetalert2.github.io/ - SweetAlert costumizado para dar otro estilo a las alarmas  

 function showSuccessAlert () {
    Swal.fire({
      iconHtml: '<img src="img/alert success.png">',
      showConfirmButton: false,
      timer: 5000
     
    })
    }