//Obtenemos los datos a cargar en la página web a partir del JSON que los contiene, se lo pedimos al servidor
var autoPersonalizado = {}; //variable global conteniendo los datos seleccionados por un usuario

var request = new XMLHttpRequest();
request.open("GET", "/app/opciones.json");
request.responseType = "json";
request.send();
request.onload = function() { //lo que ocurre al recibir la respuesta del servidor
  var opciones = request.response;
  cargarOpciones(opciones);
}

//Se encarga de poblar el html con las opciones recibidas en el objeto JSON
function cargarOpciones(jsonOpciones) {
  var opciones = jsonOpciones["opciones"];
  var cookieAuto = getCookie("autoPersonalizado");
  var recordarAuto = false;
  //Comparamos que las opciones de la cookie y el modelo extraído del servidor son idénticos para evitar problemas
  //Sólo vamos a cargar los datos de la cookie en la aplicación si la descripción de la cookie coincide con la del modelo, sino son versiones distintas
  if (cookieAuto != "") {
    cookieAuto = JSON.parse(getCookie("autoPersonalizado")); //si la cookie existe, parsearlo para obtener los datos de la cookie
    console.log("Cookie: ");
    console.log(cookieAuto);
    var nombresCookie = Object.keys(cookieAuto);
    recordarAuto = (nombresCookie.length == opciones.length);
    console.log(nombresCookie);
    for (i = 0; (recordarAuto && i < opciones.length); i++) {
      recordarAuto = (nombresCookie[i] == opciones[i].nombre);
    }
  }
  console.log("Recordar: "+recordarAuto);

  //Creamos un elemento del acordeón por cada opcion y un elemento de lista por cada valor posible
  for (i = 0; i < opciones.length; i++) {
    var opcion = opciones[i];
    if (!recordarAuto) {
      autoPersonalizado[opcion.nombre] = ""; //agregamos al objeto el campo "opcion.nombre" (que es un string como "Color") para luego poder asignarle valores
    }
    var panel = document.createElement("div");
    panel.setAttribute("class", "panel panel-default");

    var heading = document.createElement("div");
    heading.setAttribute("class", "panel-heading");
    heading.setAttribute("role", "tab");
    heading.setAttribute("id", "heading"+i);

    var h4 = document.createElement("h4");
    h4.setAttribute("class", "panel-title mayus");

    var nombreOpcion = document.createElement("a");
    nombreOpcion.setAttribute("class", "collapsed");
    nombreOpcion.setAttribute("role", "button");
    nombreOpcion.setAttribute("data-toggle", "collapse");
    nombreOpcion.setAttribute("data-parent", "#accordionOpciones");
    nombreOpcion.setAttribute("href", "#collapse"+i);
    nombreOpcion.setAttribute("aria-expanded", "false");
    nombreOpcion.setAttribute("aria-controls", "collapse"+i);
    nombreOpcion.innerHTML = opcion.nombre;

    var colapsable = document.createElement("div");
    colapsable.setAttribute("id", "collapse"+i);
    colapsable.setAttribute("class", "panel-collapse collapse");
    colapsable.setAttribute("role", "tabpanel");
    colapsable.setAttribute("aria-labelledby", "heading"+i);

    var botonesVertical = document.createElement("div");
    botonesVertical.setAttribute("class","btn-group-vertical");
    botonesVertical.setAttribute("data-toggle","buttons")

    for (j = 0; j < opcion.valores.length; j++) {
      var boton = document.createElement("div");
      if (recordarAuto && opcion.valores[j] == cookieAuto[opcion.nombre]) {
        boton.setAttribute("class","btn btn-default btn-personalizar active");
        opcionSeleccionada(opcion.nombre, opcion.valores[j]); //el objeto autoPersonalizado se actualiza apropiadamente
      }
      else {
        boton.setAttribute("class","btn btn-default btn-personalizar");
      }
      boton.setAttribute("id", opcion.nombre+"-radiobt"+j);
      boton.setAttribute("onclick", "opcionSeleccionada(\""+opcion.nombre+"\", \""+opcion.valores[j]+"\")");

      boton.innerHTML+="<input type=\"radio\" name=\"options\" id=\"option1\" autocomplete=\"off\" checked>";
      boton.innerHTML+= opcion.valores[j];

      botonesVertical.appendChild(boton);
    }

    colapsable.appendChild(botonesVertical);

    h4.appendChild(nombreOpcion);
    heading.appendChild(h4);

    panel.appendChild(heading);
    panel.appendChild(colapsable);

    document.getElementById("accordionOpciones").appendChild(panel);
  }//end for
  console.log(autoPersonalizado);
}



function opcionSeleccionada(opcion, valor) {
	glyphOk(opcion);
  dibujar(opcion,valor);
  autoPersonalizado[opcion] = valor; //guardamos en el objeto el cambio
  console.log(autoPersonalizado);
}

function glyphOk(opcion){
	var pestania = $("a:contains("+opcion+")");
	//console.log(pestania.find("spawn").length);
	if(!pestania.find("spawn").length){
		var tilde = document.createElement("spawn");
		tilde.setAttribute("class","glyphicon glyphicon-ok pull-right");

		pestania.append(tilde);
	}
	//<span class="glyphicon glyphicon-ok pull-right"></span>
}

function dibujar(opcion,valor){
  console.log("Seleccionó: "+opcion+" -> "+valor);

  var canvas = document.getElementById("imagen-personalizada");
  var ctx = canvas.getContext("2d");
  var imageObj = new Image();
  imageObj.onload = function() {//dibujar cuando la imagen esté cargada
    ctx.drawImage(imageObj, 0, 0, canvas.width, canvas.height);
  };
  imageObj.src = "app/img/"+opcion+"/"+valor+".png";
}

$( "p" ).click(function() { //ya comprobé que este funciona
  $( this ).slideUp();
});

//manipulación de autoPersonalizado
$("#recordar").click(function() {
  setCookie("autoPersonalizado", JSON.stringify(autoPersonalizado), 30); //guardamos el auto como un string en una cookie, válida por 30 días
  console.log("Personalización registrada")
});
