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
        $("#content").addClass("centreSmall")
        $("#content").append( this.addLineInfoShow('<img style="height:40px" src="img/logos/'+ this.getChennelById(show.channel).icon +'"/>',       '<span><h3>'+ show.title +'</h3></span>', 3));
        if (show.icon) $("#content").append( this.addLineInfoShow("", '<img class="imgDescription" src="'+ show.icon +'"/>', 3));
        $("#content").append( this.addLineInfoShow("Horaires",     TvShowTool.getTextFromXmlDate(show.start) + ' - ' +  TvShowTool.getTextFromXmlDate(show.stop), 6));
        $("#content").append( this.addLineInfoShow("Description", '['+show.category+' / '+show.rating+' / '+show.video+'] ' + show.desc, 6));
    },

    addLineInfoShow : function(label, text, sm_size){
        var info =' <p><div class="form-group col-sm-'+sm_size+' col-md-12" style="padding:0px;">'
                 +'     <label class="col-sm-12 col-md-1 control-label">'+label+'</label>'
                 +'     <div class="col-sm-12 col-md-11">'
                 +'         <p class="form-control-static">'
                 + text
                 +'         </p>'
                 +'     </div>'
                 +' </div></p>';
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


