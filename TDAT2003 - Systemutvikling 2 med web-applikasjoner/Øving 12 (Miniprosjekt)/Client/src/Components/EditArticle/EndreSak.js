// @flow

import React, {Component} from "react";
import {sakService} from '../Service/service';
import Footer from '../Footer/Footer'

type Props = any;

type State = {
    overskrift: string,
    forfatter: string,
    innhold: string,
    kategori: string,
    bilde: string,
    bildetekst: string,
    viktighet: number,
    dato: string,
    tidspunkt: string
}

class EndreSak extends Component<Props, State>{
    constructor(props:void) {
        super(props);
        this.state = {
            overskrift: "",
            forfatter: "",
            innhold: "",
            kategori: "",
            bilde: "",
            bildetekst: "",
            viktighet: 0,
            dato: "",
            tidspunkt: ""
        };

        (this: any).handleInputChange = this.handleInputChange.bind(this);
        (this: any).handleRadioButton = this.handleRadioButton.bind(this);
    }

    handleInputChange(event:function) {
        const target:any = event.target;
        const value:any = target.type === 'select' ? target.selected : target.value;
        const name:any = target.name;

        this.setState({
        [name]: value
        });
    }

    handleRadioButton(value:any) {
        this.setState({
          viktighet: value
        });
      }
      
    render(){
        //let id = this.state.id
        let tidString:string = JSON.stringify(this.state.tidspunkt);
        let innholdString:string = JSON.stringify(this.state.innhold);

        function tidSubstring():function {
            if(tidString !== undefined){
                return tidString.substr(1,5);
            } 
        }

        function innholdArray():function {
            if(innholdString !== undefined){
            return innholdString.substr(1,innholdString.length-2).split("\\n");
            } 
        }
        
        return(
            <div>
                <div id="endreSakContainer">
                    <div>
                        <h1>Endre sak</h1>
                    </div>
                    <div class="form">
                        <form id="registrationForm" id="previewBottomBorder">
                            <div>
                                <h5>Tittel: </h5>
                                <input type="text" class="form-control" id="tittelInput" placeholder="Skriv inn tittel her ..." 
                                        defaultValue={this.state.overskrift} name="overskrift" type="text" onChange={this.handleInputChange} required="true"/>
                            </div>
                            <div>
                                <h5>Forfatter: </h5>
                                <input type="text" class="form-control" id="forfatterInput" placeholder="Skriv inn ditt navn her ..." 
                                        defaultValue={this.state.forfatter} name="forfatter" type="text" onChange={this.handleInputChange} required="true"/>
                            </div>
                            <div>
                                <h5>Innhold: </h5>
                                <textarea class="form-control" rows="10" id="innholdInput" placeholder="Skriv inn innhold her ..." 
                                            defaultValue={this.state.innhold} name="innhold" type="text" onChange={this.handleInputChange} required="true"/>
                            </div>
                            <div>
                                <h5>Bildeadresse: </h5>
                                <input type="url" class="form-control" id="urlInput" placeholder="Skriv inn url her ..." 
                                        defaultValue={this.state.bilde} name="bilde" type="text" onChange={this.handleInputChange} required="true"/>
                            </div>
                            <div>
                                <h5>Bildetekst: </h5>
                                <input type="text" class="form-control" id="bildeTekstInput" placeholder="Skriv inn bildetekst her ..." 
                                        defaultValue={this.state.bildetekst} name="bildetekst" type="text" onChange={this.handleInputChange}/>
                            </div>
                            <div>
                                <h5>Kategori: </h5>
                                <select class="form-control" id="kategoriValgt" onChange={this.handleInputChange} name="kategori" type="select">
                                    <option selected={this.state.kategori === "Velg kategori"}>Velg kategori</option>
                                    <option selected={this.state.kategori === "Nyheter"}>Nyheter</option>
                                    <option selected={this.state.kategori === "Sport"}>Sport</option>
                                    <option selected={this.state.kategori === "Underholdning"}>Underholdning</option>
                                    <option selected={this.state.kategori === "Politikk"}>Politikk</option>
                                    <option selected={this.state.kategori === "Teknologi"}>Teknologi</option>
                                    <option selected={this.state.kategori === "Økonomi"}>Økonomi</option>
                                </select>
                            </div>
                            <div>
                                <h5>Hovedside? </h5>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="hovedsideJa" onChange={() => this.handleRadioButton(1)} checked={this.state.viktighet === 1}/>
                                    <label class="form-check-label" for="inlineRadio1">Ja</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="hovedsideNei" onChange={() => this.handleRadioButton(2)} checked={this.state.viktighet === 2}/>
                                    <label class="form-check-label" for="inlineRadio2">Nei</label>
                                </div>
                            </div>
                            <div><button type="submit" id="submitButton" class="btn btn-primary" onClick={e => this.onSubmit(e)}>Lagre</button></div>
                            <div><a class="feilmelding" id="feilmelding"></a></div>
                        </form>
                        <div style={{padding: 10}}>
                            <h3>Forhåndsvisning: </h3>
                        </div>
                        <div class="background" id="forhåndsvisningEndreSak">
                            <div class = "grid-container-article">
                                <div class = "bilde">
                                    <img class = "tittelBilde" src={this.state.bilde} alt={this.props.overskrift}></img>
                                    <a>{this.state.bildetekst}</a>
                                </div>
                                <div class = "overskrift">
                                    <h1>{this.state.overskrift}</h1>
                                </div>
                                <div class = "info">
                                    <p><strong>Publisert av:</strong> {this.state.forfatter}</p>
                                    <p><strong>Dato:</strong> {this.state.dato + " kl: " + tidSubstring()}</p>
                                </div>
                                <div class="avsnitt">
                                    {innholdArray().map(avsnitt => (
                                    <div class="avsnittsOppdeling">
                                        <a>{avsnitt}</a>
                                    </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer /> 
            </div>
        )
    }

    componentDidMount(){
        window.scrollTo(0,0);
        sakService.getSakMedID(this.props.match.params.id).then(sak => this.setState({ 
            overskrift: sak[0].overskrift,
            forfatter: sak[0].forfatter,
            innhold: sak[0].innhold,
            kategori: sak[0].kategori,
            bilde: sak[0].bilde,
            bildetekst: sak[0].bildetekst,
            viktighet: sak[0].viktighet,
            dato: sak[0].dato,
            tidspunkt: sak[0].tidspunkt
        })).catch(error => console.error(error.message));
    }

    onSubmit:function = event => {
        let feilmeldingElement:any = document.getElementById("feilmelding");
        if( this.state.kategori === "Velg kategori"){
            feilmeldingElement.innerHTML = "Du må velge kategori!"
        } else if(
            this.state.overskrift === "" || 
            this.state.forfatter === "" ||
            this.state.innhold === "" ||
            this.state.bilde === ""
        ) {
            feilmeldingElement.innerHTML = "Du må fylle inn alle feltene!"
        } else {
            event.preventDefault();
            feilmeldingElement.innerHTML = "Publisert!";

            let id = this.props.match.params.id;
            sakService.endreSak(id, this.state.overskrift, this.state.forfatter, this.state.innhold, this.state.bilde, this.state.bildetekst, this.state.kategori, this.state.viktighet).then((response) => console.log("Det gikk bra å endre saken")).catch(error => console.error(error.message));

            console.log(
                "id: " + this.props.match.params.id +
                " tittel: " + this.state.overskrift +
                " forfatter: " + this.state.forfatter +
                " innhold: " + this.state.innhold +
                " kategori: " + this.state.kategori +
                " viktighet: " + this.state.viktighet + 
                " bildelink: " + this.state.bilde + 
                " bildetekst: " + this.state.bildetekst
            );

            setTimeout(function(){window.location.href="#/sak/"+id; window.location.reload()}, 1000);
        }
    }
}

export default EndreSak;