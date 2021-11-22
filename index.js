const { nextISSTimesForMyLocation } = require("./iss");

const printTime = (passtime) => {
  for (const pass of passtime) {
    const date = new Date(0);
    date.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next Pass at ${date} (pacific daylight time) for ${duration} seconds`);
  }
};
nextISSTimesForMyLocation((error, data) => {
  if (error) {
    return console.log(error);
  }
  printTime(data);
});

























// fetchMyIP((error,ip)=>{
//   if(error){
//     console.log(error);
//   }
//   else if(ip){
//     console.log('Here is the ip address', ip);
//   }
//});
// fetchCoordsByIP('108.180.138.235',(error,data) => {
//   if(error){
//     console.log( error);
//   }
//   console.log(data);
// });

// const result = {latitude: '49.27670', longitude: '-123.13000'};
// fetchISSFlyOverTimes(result,(error,timings)=>{
//   if(timings){
//     console.log(timings);
//   }
//   else if(error){
//     console.log(error);
//   }

//})