const request = require('request');
const nextISSTimesForMyLocation = function(callback){
  
/**
 *
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
  fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code : ${response.statusCode} when fetching request from given ip address. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let result = JSON.parse(body);
    callback(null, result.ip);
    return;
  });
  // use request to fetch IP address from JSON API
};

//fetch coordinates using api
const fetchCoordsByIP = function(ip, callback) {
  
  request(`https://api.freegeoip.app/json/?apikey=${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg2 = ` it did'nt work. Status code is : ${response.statusCode} fo fetching data from ${body}`;
      callback(Error(msg2), null);
      return;
    }
    const {latitude, longitude} = JSON.parse(body);
    callback(null,{latitude,longitude});
    return;
  });
};

//final api call

const fetchISSFlyOverTimes = function(coords, callback) {

  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    } else if (response.statusCode !== 200) {
      let msg3 = ` it did'nt work. Status code is : ${response.statusCode} fo fetching data from ${body}`;
      callback(Error(msg3), null);
      return;
    }
    const time = JSON.parse(body).response;
    callback(null,time);
    return;
  });
};

}

//#########FINAL FUNCTION############







module.exports = { nextISSTimesForMyLocation };