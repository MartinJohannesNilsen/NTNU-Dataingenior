import React, {Component} from "react";
import './EndreSak.css';
import { sakService, sak } from '../Service/service';

class EndreSakRedirect extends Component<>{
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            overskrift: "",
            forfatter: "",
            innhold: "",
            kategori: "",
            bilde: "",
            viktighet: "",
            dato: ""
        }
    }

    render(){
        return(
            <div class="container">
            <div>
                <h1>Endre Sak</h1>
            </div>
            <div class="form">
                <form id="registrationForm">
                    <div>
                        <h5>ID: </h5>
                        <input type="text" class="form-control" id="idInput" placeholder="Skriv inn id'en til artikkelen du vil endre"/>
                    </div>
                    <div class="Mellomrom">
                        <h3>Info om artikkel</h3>
                    </div>
                    <div>
                        <h5>Tittel: </h5>
                        <input disabled type="text" class="form-control" id="tittel" value={this.state.overskrift} />
                    </div>
                    <div>
                        <h5>Dato publisert: </h5>
                        <input disabled type="text" class="form-control" id="dato" value={this.state.dato}/>
                    </div>
                    <div class="buttons">
                        <div class="fetchButton"><button type="submit" id="deleteButton" class="btn btn-secondary" onClick={e => this.fetchInfo(e)}>Hent info</button></div>
                        <div class="editButton"><button type="submit" id="deleteButton" class="btn btn-primary" onClick={e => this.edit(e)}>Rediger</button></div>
                    </div>
                    <div><a class="feilmelding" id="feilmelding"></a></div>
                </form>
            </div>
            </div>
        )
    }

    fetchInfo = event => {
        const id = document.getElementById("idInput").value;
        if(id == ""){
            document.getElementById("feilmelding").innerHTML = "Du må fylle inn id!"
        } else {
            event.preventDefault();
            document.getElementById("feilmelding").innerHTML = "";
            var prevId = this.state.id;

            sakService.getSakMedID(id).then(sak => this.setState({ 
                id: sak[0].id,
                overskrift: sak[0].overskrift,
                forfatter: sak[0].forfatter,
                innhold: sak[0].innhold,
                kategori: sak[0].kategori,
                bilde: sak[0].bilde,
                viktighet: sak[0].viktighet,
                dato: sak[0].dato
            })).catch(error => console.error(error.message));

            if(this.state.id == prevId){
                //document.getElementById("feilmelding").innerHTML = "Denne id'en finnes ikke!";
                document.getElementById("tittel").value = "";
                document.getElementById("dato").value = "";
            } else {
                document.getElementById("feilmelding").innerHTML = " ";
                document.getElementById("tittel").value = this.state.overskrift;
                document.getElementById("dato").value = this.state.dato;
            }
        }
    }

    edit = event => {
        if(document.getElementById("tittel").value == ""){
            document.getElementById("feilmelding").innerHTML = "Du må hente inn artikkel med id"
        } else {
            window.location.href = "http://localhost:3000/#/EndreSak/" + this.state.id;
        }
    }
}

export default EndreSakRedirect;