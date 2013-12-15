var Program = Class({
    id        : null,
    start     : null,
    stop      : null,
    channel   : null,
    title     : null,
    sub_title : null,
    desc      : null,
    category  : null,
    video     : null,
    rating    : null,
    icon      : null,

    initialize : function( id, start, stop, channel, title, sub_title, desc, category, video, rating, icon){
        this.id         = id;
        this.start      = start;
        this.stop       = stop;
        this.channel    = channel;
        this.title      = title;
        this.sub_title  = sub_title;
        this.desc       = desc;
        this.category   = category;
        this.video      = video;
        this.rating     = rating;
        this.icon       = icon;
    }
});