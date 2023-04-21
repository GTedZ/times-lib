const time = require('./Times');

const UTCTime = time.getUTCTime();

const localTime = time.getLocalTime();

const millis_til_next_UTC_HOUR = time.millis_til_next_UTC_interval('HOUR');

const millis_til_next_UTC_HOUR_from_specific_timestamp = time.millis_til_next_UTC_interval('HOUR', new Date('4/21/2023, 10:30 AM').getTime());

time.event.on('UTC-MINUTE', () => {
    // do something on every UTC minute
})

time.event.on('UTC-HOUR', () => {
    // do something on every UTC Hour
})

time.event.on('UTC-DAY', () => {
    // do something on every UTC Day
})