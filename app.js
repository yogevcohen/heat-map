const request = require('request');
const express = require('express');
const fs = require('fs');
const airbnbProvider = require('./providers/airbnb-provider');
var app = express();
const port = process.env.PORT || 3000;

//Use for logging all routing
app.use((req, res, next) => {
    var now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        console.log('Failed writing log file', err);
    });
    next();
});




app.get('/', (req, res) => {
    airbnbProvider.getAllListings('Amsterdam.heat', 25)
        .then(values => {
            if (fs.existsSync('Amsterdam.heat')) {
                fs.unlinkSync('Amsterdam.heat');
            }
            fs.appendFile('Amsterdam.json', JSON.stringify(values, undefined, 2), (err) => {
                console.log(err);
            });
            console.log(values);
        })

        .catch(console.error);
    res.send('hello express!');
});

app.listen(port, () => {
    console.log(`Server up ${port}`);
});