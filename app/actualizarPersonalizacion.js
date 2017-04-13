function opcionSeleccionada(opcion, valor) {
  alert("Seleccionó: "+opcion+" -> "+valor);

}

$( "p" ).click(function() { //ya comprobé que este funciona
  $( this ).slideUp();
});

function glyphOk(e){
	var target = e.target;
	alert("e");
}
