//Cargamos el estilo preseleccionado inmediatamente
var estilo = getCookie("estilo");
var indice = 1; //indice: 0-> bootstrap, 1->style.css (propio) VARIABLE GLOBAL
console.log(estilo);
if (estilo != "") { //si ya hay una opción elegida previamente
  cambiarEstilo(indice, estilo);
}



$('#est1').click(function (){
  cambiarEstilo(indice, "style1");
   //$('link[href="css/style2.css"]').attr('href','css/style1.css');
   $('meta[name="theme-color"]').attr('content','#000000');
});
$('#est2').click(function (){
    cambiarEstilo(indice, "style2");
   //$('link[href="css/style1.css"]').attr('href','css/style2.css');
   $('meta[name="theme-color"]').attr('content','#ffffff');
});



function cambiarEstilo(indiceCSS, estilo) { //indiceCSS: 0-> bootstrap, 1->style.css (propio)
    var estiloCSS = document.getElementsByTagName("link").item(indiceCSS);
    var nuevo = document.createElement("link");
    nuevo.setAttribute("rel", "stylesheet");
    nuevo.setAttribute("type", "text/css");
    nuevo.setAttribute("href", "css/"+estilo+".css");
    document.getElementsByTagName("head").item(0).replaceChild(nuevo, estiloCSS);
    setCookie("estilo", estilo, 30); //guardar estilo en una cookie, válido por 30 días
}
