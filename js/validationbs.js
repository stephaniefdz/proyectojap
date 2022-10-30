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


 // Muestra en rojo el mensaje de Debe seleccionar forma de pago si no se selecciono el input radio de forma (y se llenaron su campos input text)

  if (!inputPagoCard.checked) {
    btnFinalizarCompra.addEventListener("click",() => { 
       if (btnModaFP.className.indexOf("invalido") < 0) {   
   btnModaFP.classList.toggle("invalido")
   aviso.classList.toggle("fm")
   
}
  }) }

  if (!inputPagoTransf.checked) {
    btnFinalizarCompra.addEventListener("click",() => { 
       if (btnModaFP.className.indexOf("invalido") < 0) {
   btnModaFP.classList.toggle("invalido")
   aviso.classList.toggle("fm")
}
  }) }
  
  
   function showAlert () {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Has comprado exitosamente',
      showConfirmButton: false,
      timer: 1500
    })
   }