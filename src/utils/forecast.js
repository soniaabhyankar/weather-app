const request = require('request');

const forecast = (latitude, longitude, callback) => {
	const url = 'https://api.darksky.net/forecast/35582b80de042cb719389829e3e449ab/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si';

	request({ url, json: true }, (error, { body } = {}) => {
		if (error) {
			callback('Unable to connect to weather app', undefined);
		}
		else if (body.error) {
			callback('Unable to find location', undefined);
		}
		else {
			callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees. There is a ' + body.currently.precipProbability + '% chance of rain.');
		}
	});
};


module.exports = forecast;