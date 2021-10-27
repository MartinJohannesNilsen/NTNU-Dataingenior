import React, {Component} from "react";
import './EndreSak.css';
import { sakService, sak } from '../Service/service';

class EndreSak extends Component<>{
    constructor(props) {
        super(props);
        this.state = {
            overskrift: "",
            forfatter: "",
            innhold: "",
            kategori: "",
            bilde: "",
            viktighet: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRadioButton = this.handleRadioButton.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'select' ? target.selected : target.value;
        const name = target.name;

        this.setState({
        [name]: value
        });
    }

    handleRadioButton(value) {
        this.setState({
          viktighet: value
        });
      }

    render(){
        return(
            <div class="container">
                <div>
                    <h1>Endre sak</h1>
                </div>
                <div class="form">
                    <form id="registrationForm">
                        <div>
                            <h5>Tittel: </h5>
                            <input type="text" class="form-control" id="tittelInput" placeholder="Skriv inn tittel her ..." 
                                    defaultValue={this.state.overskrift} name="overskrift" type="text" onChange={this.handleInputChange}/>
                        </div>
                        <div>
                            <h5>Forfatter: </h5>
                            <input type="text" class="form-control" id="forfatterInput" placeholder="Skriv inn ditt navn her ..." 
                                    defaultValue={this.state.forfatter} name="forfatter" type="text" onChange={this.handleInputChange}/>
                        </div>
                        <div>
                            <h5>Innhold: </h5>
                            <textarea class="form-control" rows="5" id="innholdInput" placeholder="Skriv inn innhold her ..." 
                                        defaultValue={this.state.innhold} name="innhold" type="text" onChange={this.handleInputChange}/>
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
                        <div>
                            <h5>Bildelink: </h5>
                            <input type="url" class="form-control" id="urlInput" placeholder="Skriv inn url her ..." 
                                    defaultValue={this.state.bilde} name="bilde" type="text" onChange={this.handleInputChange}/>
                        </div>
                        <div><button type="submit" id="submitButton" class="btn btn-primary" onClick={e => this.onSubmit(e)}>Lagre</button></div>
                        <div><a class="feilmelding" id="feilmelding"></a></div>
                    </form>
                </div>
            </div>
        )
    }

    componentDidMount(){
        sakService.getSakMedID(this.props.match.params.id).then(sak => this.setState({ 
            overskrift: sak[0].overskrift,
            forfatter: sak[0].forfatter,
            innhold: sak[0].innhold,
            kategori: sak[0].kategori,
            bilde: sak[0].bilde,
            viktighet: sak[0].viktighet
        })).catch(error => console.error(error.message));
    }

    onSubmit = event => {
        if( this.state.kategori === "Velg kategori"){
            document.getElementById("feilmelding").innerHTML = "Du må velge kategori!"
        } else if(
            this.state.overskrift === "" || 
            this.state.forfatter === "" ||
            this.state.innhold === "" ||
            this.state.bilde === ""
        ) {
            document.getElementById("feilmelding").innerHTML = "Du må fylle inn alle feltene!"
        } else {
            event.preventDefault();
            document.getElementById("feilmelding").innerHTML = "Publisert!";

            sakService.endreSak(this.props.match.params.id, this.state.overskrift, this.state.forfatter, this.state.innhold, this.state.bilde, this.state.kategori, this.state.viktighet).then((response) => console.log("Det gikk bra å endre saken")).catch(error => console.error(error.message));

            console.log(
                "id: " + this.props.match.params.id +
                " tittel: " + this.state.overskrift +
                " forfatter: " + this.state.forfatter +
                " innhold: " + this.state.innhold +
                " kategori: " + this.state.kategori +
                " viktighet: " + this.state.viktighet + 
                " bildelink: " + this.state.bilde
            );

        }
    }
}

export default EndreSak;