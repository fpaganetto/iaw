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




//Código provisto por https://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
} //devuelve el valor de la cookie "cname", o "" si no existe

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
