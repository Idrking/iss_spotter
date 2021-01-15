const { fetchMyIp } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');

// fetchMyIp((error, ip) => {
//   if (error) {
//     console.log(`It didn't work`, error);
//     return;
//   }

//   fetchCoordsByIP(ip, (err, data) => {
//     console.log(err)
//     console.log(data);
//   });
// });

// fetchISSFlyOverTimes({latitude: '48.7808', longitude: '-123.7037'}, (err, data) => {
//   if (err) console.log('It did not work!', err);
//   else console.log(data);
// });

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log(`It didn't work!`, error);
  }

  for (let time of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(time.risetime);
    console.log(`Next pass at ${datetime} for ${time.duration} seconds!`);
  }
});