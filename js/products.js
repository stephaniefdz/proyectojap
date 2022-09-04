
// Defino las constantes
const ORDER_ASC_BY_COST  = "De menor a mayorcosto";
const ORDER_DESC_BY_COST = "De mayor a menor costo";
const ORDER_BY_PROD_REL  = "Relevancia";
const ORDER_BY_SEARCH    = "Según búsqueda"; // Estoy probando si funciona 
var currentSortCriterio  = undefined;
var minCost = undefined;
var maxCost = undefined;

// Redefini la funcion para poder mostrar la lista de productos 

function 