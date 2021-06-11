function replaceAll(string, token, newtoken) {
	while (string.indexOf(token) != -1) {
 		string = string.replace(token, newtoken);
	}
	return string;
}

function getNomeUsuario (){
    var usuario = window.localStorage.getItem("ngStorage-usuario");
    if (usuario){
        //debugger;
        usuario = replaceAll(usuario, '"', '');
        usuario = usuario.split(' ');
        usuario = usuario[0];
        $("#userName").html("Bem Vindo(a) " + usuario);
    }
}

getNomeUsuario();