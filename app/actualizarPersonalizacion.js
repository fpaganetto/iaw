function opcionSeleccionada(opcion, valor) {
	glyphOk(opcion);
  	dibujar(opcion,valor);
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

  //obtenemos la imagen original de existir
  /*  var imagenOpcionSeleccionada = document.getElementById("opcion-"+opcion);
  var existeID = true;
  if (imagenOpcionSeleccionada == null) {
    existeID = false;
    imagenOpcionSeleccionada = document.createElement("img");
  }
  imagenOpcionSeleccionada.setAttribute("src", "app/img/"+opcion+"/"+valor+".png");
  imagenOpcionSeleccionada.setAttribute("class", "imagen-opcion");
  imagenOpcionSeleccionada.setAttribute("id", "opcion-"+opcion);

  if (!existeID) {
    document.getElementById("imagen-personalizada").appendChild(imagenOpcionSeleccionada);
  }*/


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
