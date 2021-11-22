const { showTimings } = require('./iss_promised');

showTimings()
  .then(data => {
    console.log(data);
  })
  .catch((error) => {
    console.log("it did not work ", error.message);
  });