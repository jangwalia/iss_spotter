const request = require('request');
const nextISSTimesForMyLocation = function (callback) {
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
    request(`https://freegeoip.app/json/${result.ip}`, (error, response, body) => {
      if (error) {
        callback(error, null);
        return;
      }
      if (response.statusCode !== 200) {
        const msg2 = ` it did'nt work. Status code is : ${response.statusCode} fo fetching data from ${body}`;
        callback(Error(msg2), null);
        return;
      }
      const { latitude, longitude } = JSON.parse(body);
      request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`, (error, response, body) => {
        if (error) {
          callback(error, null);
          return;
        } else if (response.statusCode !== 200) {
          let msg3 = ` it did'nt work. Status code is : ${response.statusCode} fo fetching data from ${body}`;
          callback(Error(msg3), null);
          return;
        }
        const time = JSON.parse(body).response;
        callback(null, time);
        return;
      });
    });
  });
};


//#########FINAL FUNCTION############
module.exports = { nextISSTimesForMyLocation };