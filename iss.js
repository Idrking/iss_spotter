const request = require('request');

const fetchMyIp = (callback) => {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response ${body}`;
      callback(Error(msg), null);
      return;
    }
    const IP = JSON.parse(body);
    callback(null, IP.ip);
  });
};


const fetchCoordsByIP = (ip, callback) => {
  request(`https://freegeoip.app/json/${ip}`, (err, response, body) => {
    if (err) {
      callback(err, null);
      return;
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const fullBody = JSON.parse(body);
    const coords = {latitude: fullBody.latitude, longitude: fullBody.longitude};
    callback(null, coords);
  });
};


const fetchISSFlyOverTimes = (coords, callback) => {
  const lon = coords.longitude;
  const lat = coords.latitude;
  request(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}`, (err, response, body) => {
    if (err) {
      callback(err, null);
      return;
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const resp = JSON.parse(body).response;
    callback(null, resp);
  });
};


const nextISSTimesForMyLocation = (callback) => {
  fetchMyIp((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coords, (error, passTimes) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, passTimes);
      });
    });
  });
};
module.exports = { fetchMyIp, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation};