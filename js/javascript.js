function formatar(mascara, documento){
	var i = documento.value.length
	var saida = mascara.substring(0,1)
	var texto = mascara.substring(i)
	if (texto.substring(0,1) != saida){
		documento.value += texto.substring(0,1)
	}
}

function errorCep() {
	let rua = document.getElementById('rua').value = ('')
	let bairro = document.getElementById('bairro').value = ('')
	let cidade = document.getElementById('cidade').value = ('')
	let estado = document.getElementById('uf').value = ('')

	document.getElementById('cep').style.borderColor = "#e00012";
}

function pesquisaCep(valor) {
	let cep = valor.replace(/\D/g, '')
	let api = 'https://viacep.com.br/ws/' + cep + '/json/'

	if(cep != '') {
		request = new XMLHttpRequest()
		request.open('GET', api)
		request.addEventListener("error", function(){
			errorCep()
		}, false);

		request.onload = function(){
			let address = JSON.parse(request.responseText)
			if (address.erro != true) {
				let rua = document.getElementById('rua').value = (address.logradouro)
				let bairro = document.getElementById('bairro').value = (address.bairro)
				let cidade = document.getElementById('cidade').value = (address.localidade)
				let estado = document.getElementById('uf').value = (address.uf)
				document.getElementById('cep').style.borderColor = "#66afe9";
			} else {
				errorCep()
			}
		}
	} else {
		errorCep()
	}
	request.send()
}

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: {lat: -33.724, lng: -16.031}
  });
  var geocoder = new google.maps.Geocoder();
  document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });
}
function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('rua').value + ', ' + document.getElementById('cidade').value 
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
    	document.getElementById('address').style.borderColor = "#e00012";
      alert('Desculpe, não encontramos seu CEP');
    }
  });
}