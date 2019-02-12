let cep = document.getElementById('cep');
let rua = document.getElementById('rua');
let bairro = document.getElementById('bairro');
let cidade = document.getElementById('cidade');
let estado = document.getElementById('uf');

function errorCep() {
	rua.value = ('');
	bairro.value = ('');
	cidade.value = ('');
	estado.value = ('');

	cep.style.borderColor = "#e00012";
}

function pesquisaCep(valor) {
	let cepValue = valor.replace(/\D/g, '');
	let api = 'https://viacep.com.br/ws/' + cepValue + '/json/';

	if (cepValue === '') {
		errorCep();
	} else {
		const request = new XMLHttpRequest();
		request.open('GET', api);
		request.onload = function () {
			const address = JSON.parse(this.responseText);
			console.log(address);

			if (address.erro === true) {
				errorCep();
			} else {
				cep.value = address.cep;
				rua.value = address.logradouro;
				bairro.value = address.bairro;
				cidade.value = address.localidade;
				estado.value = address.uf;

				cep.style.borderColor = "#66afe9";

				initMap();
			}
		};
		request.send();
	}
}

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: {lat: -33.724, lng: -16.031}
	});
	var geocoder = new google.maps.Geocoder();
	document.getElementById('map').style.display = 'block';
  geocodeAddress(geocoder, map);
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('rua').value + ' ' + document.getElementById('cidade').value;
  if (address != ' ') {
	  geocoder.geocode({'address': address}, function(results, status) {
	    if (status === google.maps.GeocoderStatus.OK) {
	      resultsMap.setCenter(results[0].geometry.location);
	      var marker = new google.maps.Marker({
	        map: resultsMap,
	        position: results[0].geometry.location
	      });
	    } else {
	    	document.getElementById('address').style.borderColor = '#e00012';
	      alert('Desculpe, não encontramos seu CEP');
	    }
	  });
  } else {
  	alert('Endereço não encontrado!');
  }
}