// @flow

import React, {Component} from "react";
import '../../css/RegSak.css';
import { sakService, sak } from '../Service/service';
import Footer from '../Footer/Footer';

type State = {
    tittel: string,
    innhold: string,
    forfatter: string,
    kategori: string,
    hovedside: string,
    bildelink: string,
    bildetekst: string
}

type Props = {}

class RegSak extends Component<Props, State>{
    constructor(props: void){
        super(props);
        this.state = {
            tittel: "",
            innhold: "",
            forfatter: "",
            kategori: "",
            hovedside: "",
            bildelink: "",
            bildetekst: ""
        }
    }

    render(){
        return(
            <div>
                <div class="container">
                    <div>
                        <h1>Registrer ny sak</h1>
                    </div>
                    <div class="form">
                        <form id="registrationForm">
                            <div>
                                <h5>Tittel: </h5>
                                <input type="text" class="form-control" id="tittelInput" placeholder="Skriv inn tittel her ..." required="true"/>
                            </div>
                            <div>
                                <h5>Forfatter: </h5>
                                <input type="text" class="form-control" id="forfatterInput" placeholder="Skriv inn ditt navn her ..." required="true"/>
                            </div>
                            <div>
                                <h5>Innhold: </h5>
                                <textarea class="form-control" rows="10" id="innholdInput" placeholder="Skriv inn innhold her ..." required="true"/>
                            </div>
                            <div>
                                <h5>Bildeadresse: </h5>
                                <input type="url" class="form-control" id="urlInput" placeholder="Skriv inn url her ..." required="true"/>
                            </div>
                            <div>
                                <h5>Bildetekst: </h5>
                                <input type="text" class="form-control" id="bildetekstInput" placeholder="Skriv inn bildetekst her ..."/>
                            </div>
                            <div>
                                <h5>Kategori: </h5>
                                <select class="form-control" id="kategoriValgt">
                                    <option>Velg kategori</option>
                                    <option>Nyheter</option>
                                    <option>Sport</option>
                                    <option>Underholdning</option>
                                    <option>Politikk</option>
                                    <option>Teknologi</option>
                                    <option>Økonomi</option>
                                </select>
                            </div>
                            <div>
                                <h5>Hovedside? </h5>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="hovedsideJa" value="1" checked/>
                                    <label class="form-check-label" for="inlineRadio1">Ja</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="hovedsideNei" value="2"/>
                                    <label class="form-check-label" for="inlineRadio2">Nei</label>
                                </div>
                            </div>
                            <div><button type="submit" id="submitButton" class="btn btn-primary" onClick={e => this.onSubmit(e)}>Publiser</button></div>
                            <div><a class="feilmelding" id="feilmelding"></a></div>
                        </form>
                    </div>
                </div>
                <Footer />
            </div> 
        );
    }

    componentDidMount(){
        window.scrollTo(0,0);
    }

    onSubmit:function = event => {
        let kategoriValgtELement: any = document.getElementById("kategoriValgt");
        let feilmeldingElement: any = document.getElementById("feilmelding");
        let tittelInputElement: any = document.getElementById("tittelInput");
        let forfatterInputElement: any = document.getElementById("forfatterInput");
        let innholdInputElement: any = document.getElementById("innholdInput");
        let urlInputElement: any = document.getElementById("urlInput");
        let bildetekstInputElement: any = document.getElementById("bildetekstInput");
        let hovedSideJaElement: any = document.getElementById("hovedsideJa");
        let hovedSideNeiElement: any = document.getElementById("hovedsideNei");

        if( kategoriValgtELement.value === "Velg kategori"){
            feilmeldingElement.innerHTML = "Du må velge kategori!"
        } else if(
            tittelInputElement.value === "" || 
            forfatterInputElement.value === "" ||
            innholdInputElement.value === "" ||
            urlInputElement.value === ""
        ) {
            feilmeldingElement.innerHTML = "Du må fylle inn alle feltene!"
        } else {
            event.preventDefault();
            feilmeldingElement.innerHTML = "Publisert!"
            
            this.state.tittel = tittelInputElement.value;
            this.state.forfatter = forfatterInputElement.value;
            this.state.innhold = innholdInputElement.value;
            this.state.kategori = kategoriValgtELement.value;
            this.state.bildelink = urlInputElement.value;
            if(bildetekstInputElement.value !== ""){
                this.state.bildetekst = bildetekstInputElement.value;
            }
            if(hovedSideJaElement.checked) {
                this.state.hovedside = hovedSideJaElement.value;
            } else {
                this.state.hovedside = hovedSideNeiElement.value;
            }

            let nySak = new sak(this.state.tittel, this.state.forfatter, this.state.innhold, this.state.bildelink, this.state.bildetekst, this.state.kategori, this.state.hovedside);
            sakService.opprettSak(nySak).then((response) => console.log("Det gikk bra å legge inn i databasen")).catch(error => console.error(error.message));

            console.log(
                "tittel: " + this.state.tittel +
                " forfatter: " + this.state.forfatter +
                " innhold: " + this.state.innhold +
                " kategori: " + this.state.kategori +
                " hovedside: " + this.state.hovedside + 
                " bildelink: " + this.state.bildelink +
                " bildetekst: " + this.state.bildetekst
            );

            setTimeout(function() {window.location.href = "#/"; window.location.reload()}, 1000);
        }
    }
}

export default RegSak;