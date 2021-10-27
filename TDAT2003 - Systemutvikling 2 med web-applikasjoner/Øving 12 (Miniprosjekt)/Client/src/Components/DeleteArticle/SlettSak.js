// @flow

import React, {Component} from "react";
import {sakService, sak} from '../Service/service';
import Footer from '../Footer/Footer'

type State = {
    saker: sak[],
    match: {params: {id:number}}
}

type Props = {
    saker: sak[]
}

class SlettSak extends Component<State, Props>{
    constructor(props:void) {
        super(props);
        this.state = {
            saker: []
        }
    }

    handleDelete(sakId:number):function {
        if (window.confirm('Er du sikker på at du vil slette denne saken?')){
            console.log(sakId);
            this.setState({saker: this.state.saker.filter(e => e.id !== sakId)})
            sakService.slettSak(sakId).then((response) => console.log("Slettet")).catch(error => console.error(error.message));
            setTimeout(function() {window.location.reload()}, 1000);
        }
    }

    handleSearch() {
        let søketittelElement: any = document.getElementById("søkefelt");
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
                    <div>
                        <h1>Slett sak</h1>
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
                                        <th scope="col">Slett</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.saker.map(sak => 
                                    <tr>
                                        <th scope="row" width="30">{sak.id}</th>
                                        <td>{sak.overskrift}</td>
                                        <td width="30"><button type="button" class="btn btn-outline-danger" onClick={() => this.handleDelete(sak.id)}>X</button></td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div><a class="feilmelding" id="feilmelding"></a></div>
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
}

export default SlettSak;