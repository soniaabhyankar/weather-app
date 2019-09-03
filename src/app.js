const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//Start express app
const app = express();

const port = process.env.PORT || 3000;

// Load statis assets from public folder
app.use(express.static(path.join(__dirname, '../public')));

// Handlebars setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../public/templates/views'));
hbs.registerPartials(path.join(__dirname, '../public/templates/partials'));


// Routes
app.get('/', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Sonia Abhyankar'
	});
});

app.get('/weather', (req, res) => {

	if (!req.query.address) {
		return res.send({
			error: 'You must provide an address'
		});
	}

	geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({
				error
			});
		}

		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({
					error
				});
			}

			res.send({
				location,
				forecast: forecastData
			});
		});
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: '404 Page Not Found',
		name: 'Sonia Abhyankar'
	});
});

app.listen(port, () => {
	console.log('Server running on port ' + port);
});