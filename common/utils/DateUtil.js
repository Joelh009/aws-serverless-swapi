var moment = require('moment');
var momentTZ = require('moment-timezone');
var DEFAULT_TIMEZONE = "America/Lima";
var DEFAULT_FORMAT_DATETIME = "DD/MM/YYYY HH:mm:ss";

class DateUtil{

    static getDateTimeNow(){
        var now = new Date();
        console.log("now", now);
        var fecTZ = momentTZ().tz(DEFAULT_TIMEZONE).format();
        console.log("fecTZ", fecTZ);
        var fechaHoy = fecTZ.substring(0, 10) + ' ' + fecTZ.substring(11,19);
        console.log("fechaHoy", fechaHoy);
        var date = moment(fechaHoy, 'YYYY-MM-DD HH:mm:ss').format(DEFAULT_FORMAT_DATETIME);
        console.log("date", date);
        return date;
    }
}

module.exports = DateUtil;