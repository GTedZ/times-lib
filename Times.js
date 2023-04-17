const SECOND = 1000,
    MINUTE = 60 * SECOND;
;


class Times {

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

}

const instance = new Times();
module.exports = instance;