var ShowManager = Class({
    channels      : null,
    programs      : null,

    initialize : function () { 
        document.addEventListener("PROGRAMS_LOADED", this.initData.bind(this), false);
    },

    initData : function (event) {
        this.channels = event.channels;
        this.programs = event.programs;
    },

    displayShowInfo : function(  channelId, progId){
        var show = this.getShowById( channelId, progId);
        $("#content").empty();
        $("#content").append( this.addLineInfoShow('<img style="height:40px" src="img/logos/'+ this.getChennelById(show.channel).icon +'"/>',       '<span><h3>'+ show.title +'</h3></span>'));
        if (show.icon) $("#content").append( this.addLineInfoShow("", '<img style="height:200px" src="'+ show.icon +'"/>'));
        $("#content").append( this.addLineInfoShow("Horaires",     TvShowTool.getTextFromXmlDate(show.start) + ' - ' +  TvShowTool.getTextFromXmlDate(show.stop)));
        $("#content").append( this.addLineInfoShow("Description", '['+show.category+' / '+show.rating+' / '+show.video+'] ' + show.desc));
    },

    addLineInfoShow : function(label, text){
        var info =' <div class="form-group">'
                 +'     <label class="col-sm-2 control-label">'+label+'</label>'
                 +'     <div class="col-sm-10">'
                 +'         <p class="form-control-static">'
                 + text
                 +'         </p>'
                 +'     </div>'
                 +' </div>';
        return info;
    },

    getShowById : function( channelId, ProgId){
        var programs = this.programs[channelId];
        for (var i = 0; i < programs.length; i++) if (programs[i].id == ProgId) return programs[i]; return "";
    },

    getChennelById : function( id){
        for (var i = 0; i < this.channels.length; i++) if (this.channels[i].id == id) return this.channels[i]; return "";
    }
});
var showManager = new ShowManager();


