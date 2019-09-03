console.log('Client side js');


// fetch('http://puzzle.mead.io/puzzle').then((response) => {
// 	response.json().then((data) => {
// 		console.log(data);
// 	});
// });






const form = document.querySelector('form');
const search = document.querySelector('input');
const locationMsg = document.querySelector('#location');
const forecastMsg = document.querySelector('#forecast');
const errorMsg = document.querySelector('#error');

const table = document.querySelector('table');

form.addEventListener('submit', (event) => {
	event.preventDefault();

	const location = search.value;

	locationMsg.textContent = '';
	forecastMsg.textContent = '';
	errorMsg.textContent = '';

	fetch('http://localhost:3000/weather?address=' + encodeURIComponent(location)).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				errorMsg.classList.add('error');
				errorMsg.classList.remove('hide');
				errorMsg.textContent = data.error;
			}
			else {
				locationMsg.textContent = data.location;
				forecastMsg.textContent = data.forecast;
				table.classList.add('show');
				errorMsg.classList.add('hide');
			}
		});
	});

	// console.log(location);
});