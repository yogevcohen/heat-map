const config = require('../config.json');

calcHeatOnListings = async (litingList) => {
litingList.map((listing) => {
        listing.heat = (listing.price / 20)  * listing.demand;
    });
    return litingList;
}

module.exports = {
    calcHeatOnListings,
};