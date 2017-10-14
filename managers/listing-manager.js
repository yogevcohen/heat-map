const airbnbProvider = require('../providers/airbnb-provider');
const config = require('../config.json');
//Getting All listings
getAllListings = async (address) => {
    var allListing = [];
    for (var i = 0; i < config.totalListingOffsets; i++) {
        allListing.push(... await airbnbProvider.getListing(address, i * config.listingLimit))
    }
    return allListing;
}

module.exports = {
    getAllListings,
};