import { DateTime, Interval } from "luxon";

// Converts time to Month Abrivation - DD - YYYY, Time
export const ToDateTime_Med = (isoDate) => {
    const current = DateTime.fromISO(isoDate)
    return current.toLocaleString(DateTime.DATETIME_MED)
}


// Converts time to 24 hour time frame if not show date and time
export const To24HourTime = (isoDate) => {
    const old = DateTime.fromISO(isoDate)
    const current = new Date()

    const interval = Interval.fromDateTimes(old, current)

    const intervalTime = Math.round(interval.length('hours'))

    if(intervalTime >= 24) {
        return ToDateTime_Med(isoDate)
    } else if(intervalTime >= 1) {
        return `${intervalTime} hour(s) ago`
    } else {
        return 'Less than 1 hour ago'
    }
}
