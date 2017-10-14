const request = require('request');
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const config = require('./config.json');
const calendarManager = require('./managers/calendar-manager.js');
const listingManager = require( './managers/listing-manager.js');
const demandCalculator = require( './managers/demand-calculator.js');

var app = express();
const port = process.env.PORT || 3000;

//Regestring hbs helpers
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('getMap', (fileName) => {
    var scr = `<script> function init(){initMap("${fileName}");} </script>\
    <script async defer src="https://maps.googleapis.com/maps/api/js?key=${config.googleMapAPi}&libraries=visualization&callback=init"></script>`
    return scr;
});

hbs.registerHelper('getHeatMapFiles', () => {
    var menu = '';
    fs.readdirSync(__dirname).filter((file) => file.indexOf('heat') > 0).forEach(file => {
        menu += `<a href='/viewheatmap/${file}'>${file.slice(0, file.indexOf('heat') - 1)}</a>`;
    })

    return menu;
});

//Regestring routes
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home',
    });
});

app.get('/viewheatmap/:file', (req, res) => {
    res.render('heatmap.hbs', {
        file: req.params.file,
    });
});

//Use for logging all routing
app.use((req, res, next) => {
    var now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    next();
});




app.get('/files/:city', async (req, res) => {
    try {
        var obj = JSON.parse(fs.readFileSync(__dirname + `/${req.params.city}`, 'utf8'));
        res.send(obj);
    }
    catch (e) {
        console.log(e);
    }

});


app.get('/createheatmap/:city', async (req, res) => {
    console.log(req.params);

    if (!req.params.city) {
        console.log('City was not provided.');
        res.send('Please provide city.');
        return;
    }
    var city = req.params.city;

    res.render('building-heat-map.hbs', {
        city: city,
    });

    var allListing = await listingManager.getAllListings(city);
    calendarManager.getAllCalendarDays(allListing).then(
        (values) => {
            demandCalculator.calcHeatOnListings(values).then((listingWithHeat) => {
                if (fs.existsSync(__dirname + `${city}.heat`)) {
                    fs.unlinkSync(`${city}.heat`);
                }
                fs.appendFile(`${city}.heat`, JSON.stringify(listingWithHeat, undefined, 2), (err) => {
                    console.log(err);
                });
            });

        });
});

//Setting up server.
app.listen(port, () => {
    console.log(`Server up ${port}`);
});