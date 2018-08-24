var moment = require('moment');





var someTimestamp = moment().valueOf();
console.log(someTimestamp);

var createdAt = 1234;

var date = moment(someTimestamp);

// date.add(1, 'years');


console.log(date.format('h:mm A' ));





