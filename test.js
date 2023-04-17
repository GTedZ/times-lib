const time = require('./Times');

const UTCTime = time.getUTCTime();
const localTime = time.getLocalTime();

console.log({ UTCTime, localTime })