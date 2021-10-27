// @flow

const dao = require('./dao.js');

module.exports = class Kommentardao extends dao {
    getCommentsWithArticleid(nyhetssakid:number, callback: function){
        super.query("select id, nyhetssakId, datoOgTidspunkt, kommentar, forfatter from kommentarer where nyhetssakId=? ORDER BY id DESC limit 20;", [nyhetssakid], callback);
    }

    postComment(json: any, callback: function){
        let val = [json.nyhetssakId, json.forfatter, json.kommentar];
        //Må legge til tidspunkt og dato
        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        if(hours < 10){hours = "0"+hours;};
        if(minutes < 10){minutes = "0"+minutes}
        let tidspunkt = hours + ":" + minutes;
        let dato = ("0" + now.getDate()).slice(-2)+"."+("0" + (now.getMonth() + 1)).slice(-2)+"."+now.getFullYear().toString().substr(-2);
        let datoOgTidspunkt = dato + " - " + tidspunkt;
        val.push(datoOgTidspunkt);
        super.query("insert into kommentarer (nyhetssakId, forfatter, kommentar, datoOgTidspunkt) values (?,?,?,?)", val, callback);
    }
}