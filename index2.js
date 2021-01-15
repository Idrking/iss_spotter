const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then((passTimes) => {
    for (let time of passTimes) {
      const datetime = new Date(0);
      datetime.setUTCSeconds(time.risetime);
      console.log(`Next pass at ${datetime} for ${time.duration} seconds!`);
    }
  })
  .catch(error => {
    console.log(`It didn't work: ${error.message}`);
  });