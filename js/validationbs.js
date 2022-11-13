// Ejemplo de JavaScript inicial para deshabilitar el envío de formularios si hay campos no válidos
// src https://getbootstrap.esdocu.com/docs/5.1/forms/validation/


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
            showAlert() // ejecuto la alerta 
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

 function showAlert () {
    Swal.fire({
      iconHtml: '<img src="img/alert success.png">',
      showConfirmButton: false,
      timer: 6000
     
    })
    }
