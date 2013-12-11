var TvShowTool = {
    getDateFormated : function( date){
        return $.format.date( date, "yyyyMMddHHmmss");  
    },

    dateToText : function( date){
        var days   = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
        var months = ["Jan", "Fév", "Mars", "Avril", "Mai", "Juin", "Juil", "Aout", "Sept", "Oct", "Nov", "Déc"];

        return days[date.getDay()] + ' ' + date.getDate() + ' ' + months[(date.getMonth())];
    },
    getDateByTvShowDate : function(xmlDate, hours, minutes){
    	xmlDate = xmlDate.toString();
    	var dateYear = xmlDate.substring(0, 4),
    		dateMonth = (xmlDate.substring(4, 6) - 1),
    		dateDay = xmlDate.substring(6, 8),
    		dateHours = hours || xmlDate.substring(8, 10),
    		dateMinutes = minutes || xmlDate.substring(10, 12),
    		dateSeconds = 0,
    		dateMilliseconds = 0,
    		dateToReturn = null;

    	if (xmlDate) {
	    	if (hours !== null && minutes !== null) {
	    		var date =  new Date();
	            date.setYear(dateYear);
	            date.setMonth(dateMonth);
	            date.setDate(dateDay);
	            date.setHours(dateHours);
	            date.setMinutes(dateMinutes);
	            date.setSeconds(dateSeconds);
	            dateToReturn = date;
	    	} else {
	    		dateToReturn = new Date(dateYear, dateMonth, dateDay, hours, minutes, dateSeconds, dateMilliseconds);
	    	}
    	}
    	return dateToReturn;
    },
    getSliderHoursMinutes : function(value, byString){
    	var hoursMinutes = [];
    	var heure = Math.floor(value / 2);
    	var min = 30;
    	if (value %2 == 0) min = 0;

    	if (byString && !min){
    		min = "00";
    	}

    	hoursMinutes.push(heure);
    	hoursMinutes.push(min);
    	return hoursMinutes;
    }
};