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
            validarModal()   
          }
          else{
            showAlert()
          }
          form.classList.add('was-validated')
        }, false)
      })
  })()



const btnModaFP  = document.getElementById("btn-formapago"); // id del boton link del modal 
const inputPagoCard = document.querySelector(".pagotarjeta");  // clase dek input radio tipo forma de pago tarjeta
const inputPagoTransf = document.querySelector(".pagotransferencia");  // clase dek input radio tipo forma de pago tarjeta
const btnFinalizarCompra = document.getElementById("btn-finalizarcompra"); // boton de envio del form 
const aviso = document.querySelector(".fm"); // mensaje oculto 
const vto = document.getElementById("exp");
const banktransf = document.getElementById("transNum"); 

 // Muestra en rojo el mensaje de Debe seleccionar forma de pago al darle click, se evalua el btn forma de pago si tiene una clase que se llama invalido. Entonces marca el btn del modal en  rojo y aparece el mensaje de error

 vto.addEventListener("input", validarModal)
 banktransf.addEventListener("input", validarModal)


function validarModal(){
  if(vto.value != "" || banktransf.value != ""){
    aviso.style.display = "none"

  } else { 
    aviso.style.display = "inline" 
  }

}


//   if (!inputPagoCard.checked) {
//     btnFinalizarCompra.addEventListener("click",() => { 
//        if (btnModaFP.className.indexOf("invalido") < 0) {   
//    btnModaFP.classList.toggle("invalido")
//    aviso.classList.toggle("fm")
   
// }
//   }) }

//   if (!inputPagoTransf.checked) {
//     btnFinalizarCompra.addEventListener("click",() => { 
//        if (btnModaFP.className.indexOf("invalido") < 0) {
//    btnModaFP.classList.toggle("invalido")
//    aviso.classList.toggle("fm")
// }
//   }) }
  
// Para mostrar forma de pago seleccionada en pantalla:

let  btnguardar = document.getElementById("btn-formapago");
let formaelegida = document.getElementById("formaselect");



btnguardar.addEventListener("click", function () {
    if (inputPagoTransf.checked || inputPagoCard.checked) // Si el input radio de pago con transferencia o pago con tarjeta esta clickeado, imprimo en el span del html cart la forma
        formaelegida.innerHTML = "Transferencia Bancaria" ;
        formaelegida.innerHTML = "Tarjeta de crédito / débito"
  });
  
  // Recurso de: https://sweetalert2.github.io/ - SweetAlert

  function showAlert () {
    aviso.style.display = 'none';
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Has comprado exitosamente',
      showConfirmButton: false,
      timer: 1500
    })
   }