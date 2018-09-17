const DateTimeHelper = {
    GetTodayDate: () => {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        return dd + '/' + mm + '/' + yyyy;
    },
    GetRecentSyncTime: () => {
        var today = new Date();
        return today.getHours() + ":" + DateTimeHelper._syncTimeSpan(today.getMinutes());
    },
    _syncTimeSpan: (minutes) => {
        if(minutes < 14) {
            return "00";
        } else if(minutes < 29) {
            return "15";
        } else if(minutes < 44) {
            return "30";
        } else {
            return "45";
        }
    }
};

module.exports = DateTimeHelper;