const inputEmail = document.getElementById("inputEmail").value = localStorage.getItem("mail");
const imgUserSelect = document.getElementById('imgDef').src = localStorage.getItem("imgDef"); 
const fileSelect = document.getElementById('inputFileimg').src = localStorage.getItem("inputFileimg"); 
const userFirstName = document.getElementById("inputFirstname").value = localStorage.getItem("inputFirstname"); 
const userSecondName = document.getElementById("inputSecondname").value = localStorage.getItem("inputSecondname"); //NULL 
const userFirstLastname = document.getElementById("inputFirstlastname").value = localStorage.getItem("inputFirstlastname");
const userSecondLastName = document.getElementById("inputsecondLastname").value = localStorage.getItem("inputsecondLastname"); // NULL
const userTelephone = document.getElementById("inputContactnum").value = localStorage.getItem("inputContactnum");  

// Form validation from Bootstrap 5.2 
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
          }
          storeData () // llamo la función 
          form.classList.add('was-validated')
        }, false)
      })
  })()

// Con esta funcion, guardamos los datos que necesitamos del perfil en nuestro almacenamiento local
  function storeData () {
    let inputFirstName = document.getElementById("inputFirstname"); 
    localStorage.setItem("inputFirstname", inputFirstName.value);

    let inputSecondName = document.getElementById("inputSecondname")
    localStorage.setItem("inputSecondname", inputSecondName.value);

    let inputLastName = document.getElementById("inputFirstlastname");
    localStorage.setItem("inputFirstlastname", inputLastName.value);

    let inputsecondLastname = document.getElementById("inputsecondLastname"); 
    localStorage.setItem("inputsecondLastname", inputsecondLastname.value);

    let inputTel = document.getElementById("inputContactnum"); 
    localStorage.setItem("inputContactnum", inputTel.value); 

    let fileSrc = document.getElementById("inputFileimg");
    localStorage.setItem("inputFileimg", fileSrc.value);  

}
