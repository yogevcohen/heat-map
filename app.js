const request = require('request');
const express = require('express');
var app = express();
const port = process.env.PORT || 3000;

// getAddress = (address, callback) => {
//     var encodedAddress = encodeURIComponent(address);
//     const client_Id = '&client_id=3092nxybyb0otqw18e8nh5nty';
//     request({
//         url: `https://api.airbnb.com/v2/search_results?location=${encodedAddress}${client_Id}&_limit=1&_offset=1`,
//         json: true
//     }, (error, response, body) => {


//         if (response.statusMessage === "OK") {
//             callback(undefined, {
//                 search_results: body.search_results,
//                 meta_data: body.meta_data,
//             });
//         } else {
//             callback({
//                 error_message:body.error_message,
//                 error_details:body.error_details,
//             });
//             return;
//         }

//     });
// }

// getAddress('Amsterdam, Netherlands', (errorMessage, results) => {
//     if (errorMessage) {
//         console.log(errorMessage);
//     } else {
//         console.log(JSON.stringify(results, undefined, 2));
//     }
// });



app.get('/', (req, res) => {
    res.send('hello express!');
    // res.render('home.hbs', {
    //     pageTitle: 'Home',
    //     wellcomeMessage: 'Wellcome',
    // });
});

app.listen(port, () => {
    console.log(`Server up ${port}`);
});