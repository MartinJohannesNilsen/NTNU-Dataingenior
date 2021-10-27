// @flow

const dao = require('./dao.js');
type json = {
    id:number,
    overskrift: string,
    innhold: string, 
    forfatter: string,
    bilde: string,
    bildetekst: string,
    kategori: string,
    viktighet:number
}

module.exports = class Nyhetssakdao extends dao {
    getAll(callback:any){
        super.query("select id, overskrift, tidspunkt, dato, bilde, kategori, viktighet from sak ORDER BY id DESC", [], callback);
    }

    getArticlesWithCategory(category:string, callback: function){
        super.query("select id, overskrift, bilde from sak where kategori=? ORDER BY id DESC", [category], callback);
    }

    getArticleWithId(id:number, callback: function){
        super.query("select id, overskrift, forfatter, innhold, tidspunkt, dato, bilde, bildetekst, kategori, viktighet, bildetekst from sak where id=?", [id], callback);
    }

    getArticlesWithPriority(priority:number, callback: function){
        super.query("select id, overskrift, forfatter, innhold, tidspunkt, dato, bilde, kategori, viktighet from sak where viktighet=? ORDER BY id DESC", [priority], callback);
    }

    postArticle(json: json, callback: function){
        let val = [json.overskrift, json.innhold, json.forfatter, json.bilde, json.bildetekst, json.kategori, json.viktighet];
        //Må legge til tidspunkt og dato
        let now = new Date();
        let tidspunkt = now.getHours()+":"+now.getMinutes();
        console.log(tidspunkt);
        tidspunkt += ":00"; //Sekunder må lagres men skal ikke telles
        val.push(tidspunkt);
        let dato = ("0" + now.getDate()).slice(-2)+"."+("0" + (now.getMonth() + 1)).slice(-2)+"."+now.getFullYear().toString().substr(-2);
        console.log(dato);
        val.push(dato);
        super.query("insert into sak (overskrift, innhold, forfatter, bilde, bildetekst, kategori, viktighet, tidspunkt, dato) values (?,?,?,?,?,?,?,?,?)", val, callback);
    }

    deleteArticle(json: json, callback: function){
        super.query("delete from sak where id=?;", [json.id], callback);
    }

    editArticle(json: json, callback: function){
        let now = new Date();
        let tidspunkt = now.getHours()+":"+now.getMinutes();
        console.log(tidspunkt);
        tidspunkt += ":00";
        let dato = ("0" + now.getDate()).slice(-2)+"."+("0" + (now.getMonth() + 1)).slice(-2)+"."+now.getFullYear().toString().substr(-2);
        let val = [json.overskrift, json.forfatter, json.innhold, json.bilde, json.bildetekst, json.kategori, json.viktighet, dato, tidspunkt, json.id];
        super.query("update sak set overskrift=?, forfatter=?, innhold=?, bilde=?, bildetekst=?, kategori=?, viktighet=?, dato=?, tidspunkt=? WHERE id=?;", val, callback);
    }
}