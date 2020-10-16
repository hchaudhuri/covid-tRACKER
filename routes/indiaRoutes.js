const express = require('express'),
	router = express.Router(),
	axios = require('axios');

router.get('/searchind', function(req, res) {
	res.render('search/searchIND');
});

router.get('/casesind', function(req, res) {
	let num1 = req.query.numberind;
	axios
		.get('https://api.covid19india.org/data.json')
		.then(function(response) {
			//fetching india total
			let ind1 = response.data.statewise[0].active,
				ind2 = response.data.statewise[0].confirmed,
				ind3 = response.data.statewise[0].deltaconfirmed,
				ind4 = response.data.statewise[0].deaths,
				ind5 = response.data.statewise[0].deltadeaths,
				ind6 = response.data.statewise[0].deltarecovered,
				ind7 = response.data.statewise[0].lastupdatedtime,
				ind8 = response.data.statewise[0].recovered;

			//fetching statewise total
			let state = response.data.statewise[num1].state,
				date = response.data.statewise[num1].lastupdatedtime,
				active = response.data.statewise[num1].active,
				confirmed = response.data.statewise[num1].confirmed,
				deaths = response.data.statewise[num1].deaths,
				recovered = response.data.statewise[num1].recovered,
				migrated = response.data.statewise[num1].migratedother,
				dconfirmed = response.data.statewise[num1].deltaconfirmed,
				ddeaths = response.data.statewise[num1].deltadeaths,
				drecovered = response.data.statewise[num1].deltarecovered,
				statecode = response.data.statewise[num1].statecode,
				note = response.data.statewise[num1].statenotes;
			res.render('cases/casesIND', {
				ind1: ind1,
				ind2: ind2,
				ind3: ind3,
				ind4: ind4,
				ind5: ind5,
				ind6: ind6,
				ind7: ind7,
				ind8: ind8,

				state: state,
				date: date,
				active: active,
				confirmed: confirmed,
				deaths: deaths,
				recovered: recovered,
				migrated: migrated,
				deltaconfirmed: dconfirmed,
				deltadeaths: ddeaths,
				deltarecovered: drecovered,
				statecode: statecode,
				statenote: note
			});
		})
		.catch(function(error) {
			console.log('something went wrong');
			console.log(error);
		});
});

module.exports = router;
