//Obtenemos los datos a cargar en la página web a partir del JSON que los contiene, se lo pedimos al servidor
var requestURL = "/app/opciones.json";
var request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();
request.onload = function() { //lo que ocurre al recibir la respuesta del servidor
  var opciones = request.response;
  cargarOpciones(opciones);
}

//Se encarga de poblar el html con las opciones recibidas en el objeto JSON
function cargarOpciones(jsonOpciones) {
  var opciones = jsonOpciones["opciones"];

  //Creamos un elemento del acordeón por cada opcion y un elemento de lista por cada valor posible
  for (i = 0; i < opciones.length; i++) {
    var opcion = opciones[i];

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
    //console.log(opcion.valores.length); DEBUG
    for (j = 0; j < opcion.valores.length; j++) {
      var boton = document.createElement("button");
      boton.setAttribute("class","btn btn-default btn-personalizar");
      boton.setAttribute("type","button");
      boton.setAttribute("id","radiobt");

      //var input = document.createElement("input");
      /*input.setAttribute("type","radio");
      input.setAttribute("name","options");
      input.setAttribute("id","option"+j);
      input.setAttribute("autocomplete","off");*/
      
      boton.innerHTML+="<input type=\"radio\" name=\"options\" id=\"option1\" autocomplete=\"off\" checked>";
      boton.innerHTML+= opcion.valores[j];
      //console.log(" "+opcion.valores[j]); DEBUG

      botonesVertical.appendChild(boton);
    }

    colapsable.appendChild(botonesVertical);

    h4.appendChild(nombreOpcion);
    heading.appendChild(h4);

    panel.appendChild(heading);
    panel.appendChild(colapsable);

    document.getElementById("accordionOpciones").appendChild(panel);
  }


/*  var myH1 = document.createElement("div");
  myH1.textContent = jsonObj["squadName"];
  header.appendChild(myH1);

  document.getElementById("layer1").src = path;
  $("#layer1").attr("src", path); //al elemento de id "layer1" le asigna el valor "path" en su atributo "src" */
}
