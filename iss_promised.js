const request = require('request-promise-native');

//first function to fetch an api
const fetchmyIP = function() {
  return request('https://api.ipify.org?format=json');
};
//second function
const fetchcoordinates = function(body) {
  const data = JSON.parse(body);
  const ip = data.ip;
  return request(`https://freegeoip.app/json/${ip}`);
};
//third function
const fetchISSFlyOverTimes = function(coords) {
  const { latitude, longitude } = JSON.parse(coords);
  return request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
};
//final function

const showTimings = function() {
  return fetchmyIP()
    .then(fetchcoordinates)
    .then(fetchISSFlyOverTimes)
    .then(data => {
      const { response } = JSON.parse(data);
      return response;
    });
};
module.exports = { showTimings };