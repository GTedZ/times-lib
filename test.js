const Time = require('./Times');

const UTCTime = Time.getUTCTime();

const localTime = Time.getLocalTime();

const millis_til_next_UTC_HOUR = Time.millis_til_next_UTC_interval('HOUR');

const millis_til_next_UTC_HOUR_from_specific_timestamp = Time.millis_til_next_UTC_interval('HOUR', new Date('4/21/2023, 10:30 AM').getTime());

Time.event.on('UTC-MINUTE', () => {
    // do something on every UTC minute
})

Time.event.on('UTC-HOUR', () => {
    // do something on every UTC Hour
})

Time.event.on('UTC-DAY', () => {
    // do something on every UTC Day
})