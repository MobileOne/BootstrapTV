var listViewChannel = Class({
    channels      : null,
    programs      : null,
    progInCreneau : null,

    initialize : function () { 
        this.loading();
        document.addEventListener("PROGRAMS_LOADED", this.initData.bind(this), false);
    },

    loading : function(){
        var load = '<div class="loading"><img src="img/loading.png"/><br/>Chargement en cours</div>';
        $("#content").append(load);
    },

    initData : function (event) {
        this.channels = event.channels;
        this.programs = event.programs;
        this.displayNow();
    },

    displayTonight : function(){
        this.closeDrop();
        $("#titreNavBar").text( TvShowTool.dateToText( new Date()))
        var date = new Date;
        date.setHours(21);
        date.setMinutes(10);
        date.setSeconds(00);
        context.selectedDate = TvShowTool.getDateFormated(date).toString();
        this.displayAt( TvShowTool.getDateFormated(date));
    },

    displayNow : function(){
        this.closeDrop();
        $("#titreNavBar").text( TvShowTool.dateToText( new Date()));
        context.selectedDate = TvShowTool.getDateFormated( new Date()).toString();
        this.displayAt( TvShowTool.getDateFormated( new Date()));
    },

    displayAt : function( formatedDate, inc, slider){
        this.closeDrop();
        $("#titreNavBar").text( TvShowTool.dateToText( TvShowTool.getDateByTvShowDate( formatedDate)));
        context.selectedDate = formatedDate.toString();
        this.buildListHTML( formatedDate);
        if (!slider) $("#slider").slider('setValue', TvShowTool.getSliderValueByFormatedDate( formatedDate));
    },

    closeDrop : function(){
        $("#btnCollapse").addClass("collapsed");
        $("#menuCollapse").removeClass("in");
        $("#menuCollapse").addClass("collapse");
        $("#menuCollapse").css("height : 1px;");
    },

    buildListHTML : function ( when) { 
        $("#slidecontainer").addClass("hidden-xs");
        $("#content").empty();
        for (var i=0; i < this.channels.length-1; i++){ 
            var text = '<div class="row list-group-item" style="position: relative; padding : 0px">'
                     + '    <div class="col-xs-3 col-sm-2 col-md-1" style="text-align:center;">'
                     + '        <img style="padding : 10px; box-sizing : border-box; width:100%;" src="img/logos/' + this.channels[i].icon + '"/>'
                     + '    </div>'
                     + '    <div class="col-xs-9 col-sm-10" style="padding-left : 0px;">'
                     + '        <div class="col-xs-12 col-sm-6 col-md-4" style="padding-left : 0px;">'
                     + this.buildHTMLProg( when, i+1, false) 
                     + '        </div>'

                     + '        <div class="hidden-xs hidden-sm col-md-4" style="padding-left : 0px;">'
                     + this.buildHTMLDesc( when, i+1) 
                     + '        </div>'

                     + '        <div class="hidden-xs col-sm-6 col-md-4">'
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
        return "Programme non disponible"
    },

    buildHTMLDesc : function( when, channelId, next){
        var progs = this.programs[channelId];
        for (var i=0; i < progs.length-1; i++) {
            if (progs[i].start <= when && progs[i].stop >= when){
                return this.buildOneDesc( progs[i]);
            }
        }
        return "Description non disponible"
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
        var img = prog.icon ? '<div style="padding : 0px;" class="hidden-xs col-sm-3"> <img style="width:100%;" src="' + prog.icon + '"/> </div>' : '';
        var html = '<div class="col-xs-12 col-sm-9" style="padding-left : 0px;" onclick="showManager.displayShowInfo('+prog.channel + ', '+prog.id+')">'
                 + '    <div> <strong>' + prog.title + '</strong> </div>'
                 + '    <div>' + prog.start.substring(8, 10) + ":" + prog.start.substring(10, 12) + '</div>'
                 + '    <div>' + prog.category + ' (' + prog.rating + ')</div>';     

         if (prog.start <= TvShowTool.getDateFormated( new Date()) && prog.stop >= TvShowTool.getDateFormated( new Date()))
         html   += '    <div class=" progress progress-striped active" style="height:7px; margin-bottom:5px; padding-left : 0px;">'
                 + '        <div class="progress-bar progress-bar-success" role="progressbar" style="width:' + this.calculeProgresseBar( prog)+ '">'
                 + '        </div>'
                 + '    </div>';

        if (prog.stop <= TvShowTool.getDateFormated( new Date()) )
         html   += '    <div class=" progress progress-striped active" style="height:7px; margin-bottom:5px; padding-left : 0px;">'
                 + '        <div class="progress-bar progress-bar-danger" role="progressbar" style="width:100%">'
                 + '        </div>'
                 + '    </div>';

           html += '</div>'
                 + img
        return html;
    },

    buildOneDesc : function( prog){
        var txt = prog.desc? prog.desc.substring(0, 200) +" ..." : "[Aucune description]";
        var html = '<div class="col-md-12" style="padding-left : 0px;" onclick="showManager.displayShowInfo('+prog.channel + ', '+prog.id+')">'
                 + '    <div>' + txt +  '</div>'
           html += '</div>'
        return html;
    }
});
var listeViewChannel = new listViewChannel();


