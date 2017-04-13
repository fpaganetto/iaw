function opcionSeleccionada(opcion, valor) {
	glyphOk(opcion);
  //alert("Seleccionó: "+opcion+" -> "+valor);
  
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

$( "p" ).click(function() { //ya comprobé que este funciona
  $( this ).slideUp();
});
