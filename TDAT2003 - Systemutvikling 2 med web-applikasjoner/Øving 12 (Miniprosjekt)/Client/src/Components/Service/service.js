// @flow

import axios from 'axios';
let ipAdresse = "localhost"; //Localhost
//let ipAdresse = "10.10.129.25"; //Hjemme
//let ipAdresse:string = "10.22.158.126"; //Skolen
//let ipAdresse = "172.20.10.3"; //Delt internett fra iPhone
//let ipAdresse = "192.168.110.113";

//Sak når vi skal opprette til database, vil ikke ha tidspunkt, dato eller id da dette lages i mySQL
export class sak { 
    overskrift: string;
    innhold: string;
    forfatter: string;
    bilde: string;
    bildetekst: string;
    kategori: string;
    viktighet: number;
    //Må lage typene under for typesjekking, selv om du ikke bruker dem (Attributtene opprettes av serveren/databasen)
    id: number;
    tidspunkt: any;
    dato: any;
    

    constructor(overskrift:string, forfatter:string, innhold:string, bilde:string, bildetekst:string, kategori:string, viktighet:number){
        this.overskrift = overskrift;
        this.innhold = innhold;
        this.forfatter = forfatter;
        this.bilde = bilde;
        this.bildetekst = bildetekst;
        this.kategori = kategori;
        this.viktighet = viktighet;
    }
}

export class sakMedId{
    id: number;
    overskrift: string;
    innhold: string;
    forfatter: string;
    bilde: string;
    bildetekst: string;
    kategori: string;
    viktighet: number;

    constructor(id:number, overskrift:string, forfatter:string, innhold:string, bilde:string, bildetekst:string, kategori:string, viktighet:number){
        this.id = id;
        this.overskrift = overskrift;
        this.innhold = innhold;
        this.forfatter = forfatter;
        this.bilde = bilde;
        this.bildetekst = bildetekst;
        this.kategori = kategori;
        this.viktighet = viktighet;
    }
}

export class kommentar{
    nyhetssakId: number;
    forfatter: string;
    kommentar: string;

    constructor(nyhetssakId:number, forfatter:string, kommentar:string){
        this.nyhetssakId = nyhetssakId;
        this.forfatter = forfatter;
        this.kommentar = kommentar;
    }
}

class SakService {

    opprettSak(sak:sak){
        return axios.post("http://"+ipAdresse+":8080/sak",sak).then((response => response.data))
    }

    opprettKommentar(kommentar:string){
        return axios.post("http://"+ipAdresse+":8080/kommentar",kommentar).then((response => response.data))
    }

    getSaker() {
        return axios.get("http://"+ipAdresse+":8080/sak").then(response => response.data);
    }

    getSakMedID(id:number){
        return axios.get("http://"+ipAdresse+":8080/sak/"+id).then(response => response.data);
    }

    getKommentarMedNyhetssakID(id:number){
        return axios.get("http://"+ipAdresse+":8080/kommentar/"+id).then(response => response.data);
    }

    getSakerMedViktighet1(){
        return axios.get("http://"+ipAdresse+":8080/sak/pri/1").then(response => response.data);
    }

    getSakerMedViktighet2(){
        return axios.get("http://"+ipAdresse+":8080/sak/pri/2").then(response => response.data);
    }

    getSakerMedKategori(kategori:string){
        return axios.get("http://"+ipAdresse+":8080/sak/kat/"+kategori).then(response => response.data);
    }

    slettSak(id:number){
        console.log(id);
        return axios.delete("http://"+ipAdresse+":8080/sak", { data: { id: id }}).then(response => console.log(response.data)).catch(error => console.log(error));
    }

    endreSak(id:number, overskrift:string, forfatter:string, innhold:string, bilde:string, bildetekst:string, kategori:string, viktighet:number){
        const sak = new sakMedId(id, overskrift, forfatter, innhold, bilde, bildetekst, kategori, viktighet);
        return axios.put("http://"+ipAdresse+":8080/sak", sak).then(response => console.log(response.data)).catch(error => console.log(error));
    }
    
}

export let sakService = new SakService();


