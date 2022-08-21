document.addEventListener("DOMContentLoaded", function(e){

  
// se va a dirigir a los ID definidos (mail, psw, form) en el index.html
function id(id) {
  return document.getElementById(id);
}
// se va a dirigir a las clases definidas en eñ index.html
function classes(classes) {
  return document.getElementsByClassName(classes);
}


let mail = id("mail"),
  contrasenia = id("psw"),
  form = id("form"),
  errorMsj = classes("error"),
  successIcon = classes("success-icon"),
  failureIcon = classes("failure-icon");

// Cuando se presiona "Ingresar" 

form.addEventListener("submit", (e) => { // Escucha para cuando se envíe el formulario
  e.preventDefault(); // Esto evita que el formulario se envie al hacer click en "Ingresar"
  validar(mail, 0, "Ingresa tu e-mail");  // 
  validar(contraseña, 1, "Ingresa tu contraseña");
});

// Esta funcion usa 3 argumentos que utiliza los ID, classes y el mensaje de .error que se imprime en pantalla  

let validar = (id, clase, mensaje) => {
  if (id.value == '') {
    errorMsj[clase].innerHTML = mensaje;
    id.style.border = "1px solid red";
 // Funcionalidad grafica con Iconos de fontawesome para visualizar que el usuario envia el form en blanco / campos vacios 
    failureIcon[clase].style.opacity = "1";
    successIcon[clase].style.opacity = "0";
   
  } else {
    errorMsj[clase].innerHTML = "";
    id.style.border = "1px solid green";
    window.location.href="inicio.html"     // Si los campos estan completos, redirige a inicio
    setTimeout(2000);
 // Funcionalidad grafica con Iconos de fontawesome para visualizar que hay datos en el campo y se envia 
    failureIcon[clase].style.opacity = "0";
    successIcon[clase].style.opacity = "1";
  }


}
});
