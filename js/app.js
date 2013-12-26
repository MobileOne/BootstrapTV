

function loadData(){
    var tvProg = new TVProg();
}

function updateData(){
    jQuery.ajax({
  type: 'GET', 
  url: 'http://geoffreynoel.fr/tvbootstrap/phpScript/updateTvProgram.php', 
  success: function(data, textStatus, jqXHR) {
       alert("Mise à jour réussie\nLes données du programme TV sont maintenant à jours\nL'application va maintenant se recharger");
       location.reload();

  },
  error: function(jqXHR, textStatus, errorThrown) {
    alert("Problème lors de la mise à jour des données sur le serveur");
  }
});
}

var TVProg = Class({
    dataLoader  : null,
    channels    : null,
    programs    : null,

    initialize : function(){
        var timestamp = new Date().getTime();
        this.dataLoader = new DataLoader( "data/tnt_lite.xml?timestamp="+timestamp);
        document.addEventListener("PROGRAMS_LOADED", this.initData.bind(this), false);
    },

    initData : function( event){
        this.channels = event.channels;
        this.programs = event.programs;
    }
});

var DataLoader = Class({
    xmlFile  : null,
    channels : new Array(),
    programs : new Array(),

    getChannels : function(){
        return this.channels;
    },

    getPrograms : function(){
        return this.programs;
    },

    initialize : function( fileName){
        var self = this;
        $.ajax({
            type: "GET",
            url: fileName,
            dataType: "xml",
            success: function (xml) {
                self.xmlFile = xml;
                self.buildChannelList();
                self.buildProgList();
                
                var PROGRAMS_LOADED = document.createEvent("Event");
                PROGRAMS_LOADED.initEvent("PROGRAMS_LOADED", true, true);
                PROGRAMS_LOADED.channels = self.channels;
                PROGRAMS_LOADED.programs = self.programs;
                document.dispatchEvent(PROGRAMS_LOADED);
            },
            error : function(){
                alert("Erreur de chargement du XML")
            }
        });
    },

    buildChannelList : function(){
        var self = this;
        if( !this.xmlFile) return;
        var channels = $(this.xmlFile).find("channel");
        channels.each(function( i ) {
            var id          = $(channels[i]).attr("id");
            var displayName = $(channels[i]).find("display-name").text();
            var icon        = $(channels[i]).find("icon").attr("src").substring(17);
            var channel     = new Channel( id, displayName, icon);
            self.channels.push(channel);
            self.programs[id] = new Array();
        });
    },

    buildProgList : function(){
        var self = this;
        if( !this.xmlFile) return;
        var progs = $(this.xmlFile).find("programme");
        progs.each(function( i ) {
            var start     = $(progs[i]).attr("start");
            var stop      = $(progs[i]).attr("stop");
            var channel   = $(progs[i]).attr("channel");
            var title     = $(progs[i]).find("title").text();
            var sub_title = $(progs[i]).find("sub_title").text();
            var desc      = $(progs[i]).find("desc").text();
            var category  = $(progs[i]).find("category").first().text();
            var video     = $(progs[i]).find("video").find("aspect").text();
            var rating    = $(progs[i]).find("rating").find("value").text();
            var icon      = $(progs[i]).find("icon").attr("src");
            var prog = new Program( i, start, stop, channel, title, sub_title, desc, category, video, rating, icon);
            self.programs[channel].push(prog);
        });
    }
});



