const request = require('request-promise-native');

const fetchMyIp = () => {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
};

const fetchISSFlyOverTimes = (body) => {
  const coords = JSON.parse(body);
  const lat = coords.latitude;
  const long = coords.longitude;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${long}`);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIp()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((body) => {
      return JSON.parse(body).response;
    });
};

module.exports = { nextISSTimesForMyLocation };