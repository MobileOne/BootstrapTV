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
        this.displayNow();
    },

    displayTonight : function(){
        $("#titreNavBar").text( TvShowTool.dateToText( new Date()))
        var date = new Date;
        date.setHours(21);
        date.setMinutes(10);
        date.setSeconds(00);
        context.selectedDate = TvShowTool.getDateFormated(date).toString();
        this.buildListHTML( TvShowTool.getDateFormated(date));
    },

    displayNow : function(){
        $("#titreNavBar").text( TvShowTool.dateToText( new Date()));
        context.selectedDate = TvShowTool.getDateFormated( new Date()).toString();
        this.buildListHTML( TvShowTool.getDateFormated( new Date()));
    },

    displayAt : function( formatedDate, inc){
        $("#titreNavBar").text( TvShowTool.dateToText( TvShowTool.getDateByTvShowDate( formatedDate)));
        context.selectedDate = formatedDate.toString();
        this.buildListHTML( formatedDate);
    },

    test : function( val){ debugger; },

    buildListHTML : function ( when) { 
        $("#content").empty();
        for (var i=0; i < this.channels.length-1; i++){ 
            var text = '<div class="row list-group-item" style="position: relative; padding : 0px">'
                     + '    <div class="col-xs-3 col-sm-2 col-md-1">'
                     + '        <img style="padding : 0px" class="col-xs-12" src="img/logos/' + this.channels[i].icon + '"/>'
                     + '    </div>'
                     + '    <div class="col-xs-9 col-sm-10">'
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

        var xmlDateStart = prog.start,
            start = TvShowTool.getDateByTvShowDate(xmlDateStart).getTime(),
            xmlDateStop = prog.stop,
            stop = TvShowTool.getDateByTvShowDate(xmlDateStop).getTime(),
            xmlDateNow = TvShowTool.getDateFormated( new Date()),
            now = TvShowTool.getDateByTvShowDate(xmlDateNow).getTime(),
            duree = stop - start,
            passe = now  - start;

        return  Math.floor((passe / duree) * 100) + "%";
    },

    buildOneProg : function( prog){
        var img = prog.icon ? '<div class="hidden-xs col-sm-2"> <img style="width:50px;" src="' + prog.icon + '"/> </div>' : '';
        var html = '<div class="col-xs-12 col-sm-10" >'
                 + '    <div> <strong>' + prog.title + '</strong> </div>'
                 + '    <div>' + prog.start.substring(8, 10) + ":" + prog.start.substring(10, 12) + '</div>'
                 + '    <div>' + prog.stop.substring(8, 10) + ":" + prog.stop.substring(10, 12) + '</div>'
                 + '    <div>' + prog.category + ' (' + prog.rating + ')</div>';     

         if (prog.start <= TvShowTool.getDateFormated( new Date()) && prog.stop >= TvShowTool.getDateFormated( new Date()))
         html += '    <div class=" progress progress-striped active" style="height:7px; margin-bottom:5px;">'
                 + '        <div class="progress-bar progress-bar-success" role="progressbar" style="width:' + this.calculeProgresseBar( prog)+ '">'
                 + '        </div>'
                 + '    </div>';

           html += '</div>'
                 + img
        return html;

    }
});
var listeViewChannel = new listViewChannel();


