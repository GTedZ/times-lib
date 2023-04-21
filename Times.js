const { EventEmitter } = require('events');

const SECOND = 1000,
    MINUTE = 60 * SECOND,
    HOUR = 60 * MINUTE,
    DAY = 24 * HOUR,
    MONTH = 30 * DAY,
    YEAR = 365 * DAY;
;

const timeIntervals = {
    SECOND,
    MINUTE,
    HOUR,
    DAY,
    MONTH,
    YEAR
}


class Times {

    all_UTC_Events = ["UTC-SECOND", "UTC-MINUTE", "UTC-HOUR", "UTC-DAY", "UTC-MONTH", "UTC-YEAR"];

    all_Events = [...this.all_UTC_Events];

    running_timeouts = {};

    event = new EventEmitter();

    constructor() {

        for (const UTC_event of this.all_UTC_Events) {
            const [, timeInterval] = UTC_event.split('-');
            this.running_timeouts[timeInterval] = null;
        }

        prepareEventListeners(this);
    }

    /**
     * @returns { {datetime:String, date:String, time:String, ISO:String, UTC:String, timestamp:number } } timeObject
     */
    getUTCTime() {
        const currentTime_obj = new Date();

        const offset = currentTime_obj.getTimezoneOffset();
        const timestamp = currentTime_obj.getTime();
        const UTCString = currentTime_obj.toUTCString();
        const ISOString = currentTime_obj.toISOString();

        const timestamp_with_utc_offset = timestamp + offset * MINUTE;
        const offsetted_time = new Date(timestamp_with_utc_offset);

        const dateTimeString = offsetted_time.toLocaleString();
        const dateString = offsetted_time.toLocaleDateString();
        const timeString = offsetted_time.toLocaleTimeString();

        return { datetime: dateTimeString, date: dateString, time: timeString, ISO: ISOString, UTC: UTCString, timestamp };
    }

    /**
     * @returns { {datetime:String, date:String, time:String, ISO:String, UTC:String, timestamp:number } } timeObject
     */
    getLocalTime() {
        const currentTime_obj = new Date();

        const timestamp = currentTime_obj.getTime();
        const UTCString = currentTime_obj.toUTCString();

        const dateTimeString = currentTime_obj.toLocaleString();
        const dateString = currentTime_obj.toLocaleDateString();
        const timeString = currentTime_obj.toLocaleTimeString();
        const ISOString = currentTime_obj.toISOString();

        return { datetime: dateTimeString, date: dateString, time: timeString, ISO: ISOString, UTC: UTCString, timestamp };
    }

    /**
     * @param {"MINUTE"|"HOUR"|"DAY"|"MONTH"|"YEAR"|"SECOND"} timeInterval
     * @param {number|undefined} timestamp
     * @returns {number} millis_til_next_timeInterval
     */
    millis_til_next_UTC_interval(timeInterval, customTimestamp = undefined) {
        let timestamp = Date.now();

        if (typeof timeInterval !== 'string') throw new Error(`'timeInterval' must be of type 'String', received '${typeof timeInterval}'`);
        if (typeof timeIntervals[timeInterval] === 'undefined') throw new Error(`time interval '${timeInterval}' is invalid, valid values are "${Object.keys(timeIntervals).join('", "')}"`);

        if (typeof customTimestamp !== 'undefined') {
            if (typeof customTimestamp !== 'number') throw new Error(`'customTimestamp' should be of type 'number', received '${typeof customTimestamp}'`);
            if (customTimestamp != customTimestamp) throw new Error(`Received an invalid value '${customTimestamp}'`);
            timestamp = customTimestamp;
        }

        const interval = timeIntervals[timeInterval];

        const currentMills_after_latest_interval = timestamp % interval;

        return interval - currentMills_after_latest_interval;
    }

}

function prepareEventListeners(instance) {

    instance.event.on('newListener', (event) => {
        if (instance.all_UTC_Events.includes(event)) {

            const [, timeInterval] = event.split('-');
            if (instance.event.listenerCount(event) == 0) start_UTC_eventEmitter(instance, timeInterval)

        }
    })

    instance.event.on('removeListener', (event) => {
        if (instance.all_UTC_Events.includes(event)) {

            const [, timeInterval] = event.split('-');
            if (instance.event.listenerCount(event) == 0) remove_UTC_eventEmitter(instance, timeInterval)

        }
    })
}

function start_UTC_eventEmitter(instance, interval) {
    instance.running_timeouts[interval] = setTimeout(
        () => {
            instance.event.emit(`UTC-${interval}`);
            start_UTC_eventEmitter(instance, interval);
        },
        instance.millis_til_next_UTC_interval(interval)
    )
}

function remove_UTC_eventEmitter(instance, interval) {
    clearTimeout(instance.running_timeouts[interval]);
}

const instance = new Times();
module.exports = instance;