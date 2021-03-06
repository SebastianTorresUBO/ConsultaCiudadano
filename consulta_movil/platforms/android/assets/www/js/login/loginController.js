define(["app", "js/login/loginView"], function(app, LoginView) {
	var $ = Dom7;
	/**
	 * Bindings array. Bind DOM event to some handler function in controller
	 * @type {*[]}
	 */
	var bindings = [{
		element: '.btn-link-registro',
		event: 'click',
		handler: registro
	}, {
		element: '.recuperar-password',
		event: 'click',
		handler: recuperarPassword
	}, {
		element: '.list-panel-registro',
		event: 'click',
		handler: registro
	}
	];

    function init() {
		LoginView.render({
			bindings: bindings
		});
	}

	$('.btn-ingresar').on('click', function() {
			var loginValues = $('.login-form input');
			var email = loginValues[0].value;
			var password = loginValues[1].value;
			validarLogin(email, password);
		});

	function validarLogin(email, password){
		if (email.length > 3 && password.length > 3) {
			api.login(email, password, function(data){
				data = JSON.parse(data);
				console.log(data.status);
				if (data.status == 'ok') {
					app.f7.alert('Bienvenido ' + data.rango + ' ' + data.apellidos, data.response);
					app.router.load('escaner');
				}else{
					app.f7.alert('Los datos ingresados no concuerdan con la base de datos.', data.response);
					return;
				}
			});
		}else {
			app.f7.alert("Datos incompletos.");
			return;
		}
	}

	function registro(){
		app.router.load('agenteNew');
	}

	function recuperarPassword(){
		app.f7.prompt('Ingrese el correo electrónico con el cual se registró:', 'Recuperación de contraseña',
			function (email) {
			if (email != '' && email.length >= 4) {
				api.recuperarPassword(email, function(data){
					data = JSON.parse(data);
					if (data.status == 'ok') {
						app.f7.alert('Se ha enviado un correo electrónico con la contraseña a: ' + email, data.response);
					}else{
						app.f7.alert(data.response,'Error');
					}
				})
			}else{
				app.f7.alert('Introduzca un correo electrónico válido.');
			}
			
		}, function(value){});
	}

    return {
        init: init
    };
});