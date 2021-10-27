// @flow

import React, {Component} from "react";
import {sakService, sak} from '../Service/service';
import Footer from '../Footer/Footer'

type Props = {
    match: {params: {id:number}}
}

type State = {
    saker: sak[],
    id: number
}

class EndreSakRedirect extends Component<Props, State>{
    constructor(props:void) {
        super(props);
        this.state = {
            saker: [],
            id: -1
        }
    }

    handleEdit(sakId:number) {
        window.location.href = "#/EndreSak/"+sakId;
    }

    handleSearch() {
        const søketittelElement: any = document.getElementById("søkefelt");
        let søketittel = søketittelElement.value;
        if(søketittel !== ""){
            this.setState({saker: this.state.saker.filter(e => e.overskrift.toLowerCase().includes(søketittel.toLowerCase()))});
        } else {
            sakService.getSaker().then(saker => this.setState({saker: saker})).catch(error => console.error(error.message));
        }
    }

    render(){
        return(
            <div>
                <div class="container">
                    <div id="endreSak">
                        <h1>Endre sak</h1>
                    </div>
                    <form class="form-inline md-form mr-auto mb-4" id="søkefeltEndreOgSlettSak">
                        <input class="form-control mr-sm-2" type="text" placeholder="Skriv inn tittel her" aria-label="Search" id="søkefelt" onChange={() => this.handleSearch()}/>
                        <button type="button" class="btn btn-primary btn-rounded" onClick={() => this.handleSearch()}>Søk</button>
                    </form>
                    <div class="oversikt">
                        <div class="table-wrapper-scroll-y my-custom-scrollbar">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Tittel</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.saker.map(sak => 
                                    <tr>
                                        <th scope="row" width="30">{sak.id}</th>
                                        <td>{sak.overskrift}</td>
                                        <td width="30"><button type="button" class="btn btn-outline-warning" onClick={() => this.handleEdit(sak.id)}>Endre</button></td>
                                    </tr>)
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div><a class="feilmelding" id="feilmelding"> </a></div>
                </div>
                <Footer />
            </div>
        )
    }

    componentDidMount(){
        window.scrollTo(0,0);
        sakService.getSaker().then(saker => this.setState({saker: saker})).catch(error => console.error(error.message));
    }

    componentDidUpdate(prevProps:any){
        if(this.props.match.params.id !== prevProps.match.params.id){
            window.scrollTo(0,0);
            sakService.getSaker().then(saker => this.setState({saker: saker})).catch(error => console.error(error.message));
        }
    }

    edit:function = event => {
        const tittelElement: any = document.getElementById("tittel");
        const feilmeldingElement: any = document.getElementById("feilmelding");
        if(tittelElement.value === ""){
            feilmeldingElement.innerHTML = "Du må hente inn artikkel med id"
        } else {
            window.location.href = "#/EndreSak/" + this.state.id;
        }
    }
}

export default EndreSakRedirect;