var navBar = Class({

    initialize : function () { 
        this.buildDropdownHTML();
    },

    buildDropdownHTML : function(){
        var date   = new Date();
        var days   = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
        var months = ["Jan", "Fév", "Mars", "Avril", "Mai", "Juin", "Juil", "Aout", "Sept", "Oct", "Nov", "Déc"];

        for (var i = 0; i < 7; i++){
            date.setDate(date.getDate() + 1);
            if (date.getDay() == 1) $('#dropdownPlus').append( '<li class="dropdown-header">' + (i < 6 ? 'Semaine prochaine' : 'Semaine suivante') + '</li>');
            var drop = '<li><a onclick="listeViewChannel.displayAt('+ TvShowTool.getDateFormated( date) +', '+i+')" href="#">' + TvShowTool.dateToText( date) + '</a></li>';
            $('#dropdownPlus').append( drop);
        }

        $('#dropdownPlus').append( '<li><a onclick="updateData()" href="#"><strong>Mettre à jour</strong></a></li>');

        $('#slider').slider({
            formater : function(val){
                var hoursMinutes = TvShowTool.getSliderHoursMinutes(val, true);
                heure = hoursMinutes[0];
                min = hoursMinutes[1];
                return heure + ":" + min;
            }
        });
        $('#slider').slider()        
        .on('slide', function(ev){
            var hoursMinutes = TvShowTool.getSliderHoursMinutes(ev.value),
                heure = hoursMinutes[0],
                min = hoursMinutes[1],
                d = context.selectedDate,
                date =  TvShowTool.getDateByTvShowDate(d, heure, min);
            
            listeViewChannel.displayAt(TvShowTool.getDateFormated( date), 1, true);
        });
    }

});
var navBar = new navBar();


