const axios = require('axios');
const moment = require('moment');
const config = require('../config.json');



getListing = async (city, offest) => {
    var encodedAddress = encodeURIComponent(city);
    var url = `https://api.airbnb.com/v2/search_results?location=${encodedAddress}${config.clientId}&_limit=40&_offset=${offest}&currency=EUR`
    console.log('on request', offest);
    return await axios.get(url).then((response) => {
        if (response.status !== 200) {
            throw new Error('Invalid request');
        } else if (!response.data.search_results) {
            throw new Error('Unable to find city');
        }
        return response.data.search_results.map((listing) => {
            return item = {
                id: listing.listing.id,
                lat: listing.listing.lat,
                lng: listing.listing.lng,
                price: listing.pricing_quote.localized_nightly_price,
            }
        });

    }).catch((e) => {
        console.log(e.message);
    });
}

getCalendarDays = async (listing) => {
    var startDate = new Date();
    var startDateString = moment(startDate).format(config.dateFormat);
    var endDateMoment = moment(startDate);
    endDateMoment.add(config.monthsToCheckDemand, 'months');
    var endDateString = endDateMoment.format(config.dateFormat);
    var totalDays = moment(endDateMoment).diff(startDate, 'days');

    var url = `https://api.airbnb.com/v2/calendar_days?client_id=${config.clientId}&listing_id=${listing.id}&start_date=${startDateString}&end_date=${endDateString}`
    // console.log('on request', listing.id);    
    return await axios.get(url).then((response) => {
        if (response.status !== 200) {
            throw new Error('Invalid request');
        } else if (!response.data.calendar_days) {
            throw new Error('Unable to find listing', listing.id);
        }
        var totalUnavailbel = response.data.calendar_days.filter((day) => !day.available).length;

        // totalDays = Math.max(totalDays,totalUnavailbel);
        var demand = response.data.calendar_days.filter((day) => !day.available).length / totalDays;
        // console.log(demand);
        return demand;

    }).catch((e) => {
        console.log(e.message);
    });
}


module.exports = {
    getListing,
    getCalendarDays,
};