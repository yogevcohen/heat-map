


getAllListings = (address, totalOffsets) => {
    var offsets = [];
    for (var i = 0; i < totalOffsets; i++) {
        offsets.push(i * 40);
    }

    var promises = offsets.map(function (offset) {
        return new Promise(function (resolve, reject) {
            getListing('Amsterdam', offset).then((res1) => {
                if (res1) {
                    resolve(res1);
                }
            }).catch((e) => {
                reject(e);
            });
        });
    });

    return Promise.all(promises);
}

getListing = (address, offest) => {

    const client_Id = '&client_id=3092nxybyb0otqw18e8nh5nty';
    var encodedAddress = encodeURIComponent(address);
    var url = `https://api.airbnb.com/v2/search_results?location=${encodedAddress}${client_Id}&_limit=40&_offset=${offest}`
    return axios.get(url).then((response) => {
        if (response.status !== 200) {
            throw new Error('Unable to find address');
        }
        var litsingResults = [];
        for (var i = 0; i < response.data.search_results.length; i++) {
            const r = {
                id: response.data.search_results[i].listing.id,
                lat: response.data.search_results[i].listing.lat,
                lng: response.data.search_results[i].listing.lng,
            };
            litsingResults.push(r);
        }

        return {
            index: offest,
            list: litsingResults
        };
    }).catch((e) => {
        console.log(e.message);
    });

}


module.exports = {
    getAllListings,
    getListing
};