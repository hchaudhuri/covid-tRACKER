const express = require('express'),
	router = express.Router(),
	axios = require('axios');

router.get('/bycountry', function(req, res) {
	res.render('search/search');
});

router.get('/cases', function(req, res) {
	let num = req.query.number;
	axios
		.get('https://api.covid19api.com/summary')
		.then(function(response) {
			//fetching world total
			let world1 = response.data.Global.NewConfirmed,
				world2 = response.data.Global.TotalConfirmed,
				world3 = response.data.Global.NewDeaths,
				world4 = response.data.Global.TotalDeaths,
				world5 = response.data.Global.NewRecovered,
				world6 = response.data.Global.TotalRecovered;

			//fetching countrywise total
			let country = response.data.Countries[num].Country,
				newCo = response.data.Countries[num].NewConfirmed,
				totalCo = response.data.Countries[num].TotalConfirmed,
				newDe = response.data.Countries[num].NewDeaths,
				totalDe = response.data.Countries[num].TotalDeaths,
				newRe = response.data.Countries[num].NewRecovered,
				totalRe = response.data.Countries[num].TotalRecovered,
				date = response.data.Countries[num].Date;

			res.render('cases/cases', {
				NewConfirmed: world1,
				TotalConfirmed: world2,
				NewDeaths: world3,
				TotalDeaths: world4,
				NewRecovered: world5,
				TotalRecovered: world6,

				country: country,
				newCo: newCo,
				totalCo: totalCo,
				newDe: newDe,
				totalDe: totalDe,
				newRe: newRe,
				totalRe: totalRe,
				date: date
			});
		})
		.catch(function(error) {
			console.log('CHECK INTERNET CONNECTION');
			console.log(error);
		});
});

module.exports = router;
