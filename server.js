const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getcurrentYear', () => {
	return new Date().getFullYear()
})
hbs.registerHelper('screamIt' , (text) => {
	return text.toUpperCase();
})

app.set('view engine', 'hbs');

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.originalUrl}`;
	fs.appendFile('server.log', log + '\n', (err) =>{
		if (err) {
			console.log('Unable to append server log');
		}
	})
	//console.log();
	next();
})


// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to Home Page'
	})
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Us Page'
	});
});
app.get('/portfolio', (req, res) => {
	res.render('portfolio.hbs', {
		pageTitle: 'portfolio Page'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Unable to handle request'
	})
});

app.listen(port, () => {
	console.log(`server is up on ${port}`);
});