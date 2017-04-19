function cargarRecordado(){
	var cookieAuto = JSON.parse(getCookie("autoPersonalizado"));
	//Opcion: Color, Llantas, Polarizado, Motor...
	for(var opcion in cookieAuto){
    	opcionSeleccionada(opcion,cookieAuto[opcion]);
		var boton = $(".btn-personalizar:contains("+cookieAuto[opcion]+")");
		boton.addClass("active");
	}
}