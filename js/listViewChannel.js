var listViewChannel = Class({
    channels      : null,
    programs      : null,
    progInCreneau : null,

    initialize : function () { 
        document.addEventListener("PROGRAMS_LOADED", this.initData.bind(this), false);
    },

    initData : function (event) {
        this.channels = event.channels;
        this.programs = event.programs;
        this.buildDropdownHTML();
        this.displayTonight();
    },

    displayTonight : function(){
        $("#titreNavBar").text( this.dateToText( new Date()))
        var date = new Date;
        date.setHours(21);
        date.setMinutes(10);
        date.setSeconds(00);
        this.buildListHTML( TvShowTool.getDateFormated(date));
    },

    displayNow : function(){
        $("#titreNavBar").text( this.dateToText( new Date()));
        this.buildListHTML( TvShowTool.getDateFormated( new Date()));
    },

    displayAt : function( formatedDate, inc){
        var date = new Date();
        date.setDate(date.getDate() + inc + 1);
        $("#titreNavBar").text( this.dateToText( date))
        this.buildListHTML( formatedDate);
    },

    buildDropdownHTML : function(){
        var date   = new Date();
        var days   = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
        var months = ["Jan", "Fév", "Mars", "Avril", "Mai", "Juin", "Juil", "Aout", "Sept", "Oct", "Nov", "Déc"];

        for (var i = 0; i < 7; i++){
            date.setDate(date.getDate() + 1);
            if (date.getDay() == 1) $('#dropdownPlus').append( '<li class="dropdown-header">' + (i < 6 ? 'Semaine prochaine' : 'Semaine suivante') + '</li>');
            var drop = '<li><a onclick="listeViewChannel.displayAt('+ TvShowTool.getDateFormated( date) +', '+i+')" href="#">' + this.dateToText( date) + '</a></li>';
            $('#dropdownPlus').append( drop);
        }
    },

    dateToText : function( date){
        var days   = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
        var months = ["Jan", "Fév", "Mars", "Avril", "Mai", "Juin", "Juil", "Aout", "Sept", "Oct", "Nov", "Déc"];

        return days[date.getDay()] + ' ' + date.getDate() + ' ' + months[(date.getMonth())];
    },

    buildListHTML : function ( when) { 
        $("#content").empty();
        for (var i=0; i < this.channels.length-1; i++){ 
            var text = '<div class="row list-group-item" style="position: relative; padding : 0px">'
                     + '    <div class="col-xs-4 col-sm-2 col-md-1">'
                     + '        <img style="padding : 0px" class="col-xs-12" src="img/logos/' + this.channels[i].icon + '"/>'
                     + '    </div>'
                     + '    <div class="col-xs-8 col-sm-10">'
                     + '        <div class="col-xs-12 col-sm-6">'
                     + this.buildHTMLProg( when, i+1, false) 
                     + '        </div>'
                     + '        <div class="hidden-xs col-sm-6">'
                     + this.buildHTMLProg( when, i+1, true) 
                     + '        </div>'
                     + '    </div>'
                     + '</div>'
            $('#content').append( text);
        }
    },

    buildHTMLProg : function( when, channelId, next){
        var progs = this.programs[channelId];
        for (var i=0; i < progs.length-1; i++) {
            if (progs[i].start <= when && progs[i].stop >= when){
                return this.buildOneProg( progs[i + ( next ? 1 : 0)]);
            }
        }
    },

    calculeProgresseBar : function( prog){
        var start = prog.start;
        var stop = prog.stop;
        var now = TvShowTool.getDateFormated( new Date());
        var pourcentage = ((now - start) * 100) / (stop - start)
        return  Math.floor(pourcentage) + "%";
    },

    buildOneProg : function( prog){
        var img = prog.icon ? '<div class="hidden-xs col-sm-2"> <img style="width:50px;" src="' + prog.icon + '"/> </div>' : '';
        var html = '<div class="col-xs-12 col-sm-10" >'
                 + '    <div> <strong>' + prog.title + '</strong> </div>'
                 + '    <div>' + prog.start.substring(8, 10) + ":" + prog.start.substring(10, 12) + '</div>'
                 + '    <div>' + prog.stop.substring(8, 10) + ":" + prog.stop.substring(10, 12) + '</div>'
                 + '    <div>' + prog.category + ' (' + prog.rating + ')</div>'     

                 + '    <div class=" progress hidden-xs">'
                 + '        <div class="progress-bar progress-bar-success" role="progressbar" style="width:' + this.calculeProgresseBar( prog)+ '">'
                 + '        </div>'
                 + '    </div>'

                 + '</div>'
                 + img
        return html;

    }
});
var listeViewChannel = new listViewChannel();


