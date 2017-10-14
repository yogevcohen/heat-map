
// const airbnbProvider = require('../providers/airbnb-provider');

// getAllCalendarDays = async (listingList) => {
//     return new Promise( async (resolve, reject) => {
//         try {
//             for (var i = 0; i < listingList.length; i++) {
//                 listingList[i].demand = await airbnbProvider.getCalendarDays(listingList[i]);
//             }
//             resolve(listingList);
//         }
//         catch (e) {
//             console.log('Failed to get all listings demand', e);
//             reject(listingList);
//         }
//     });
// }


// module.exports = {
//     getAllCalendarDays,
// };