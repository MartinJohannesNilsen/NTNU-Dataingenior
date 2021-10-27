// @flow

import React, {Component} from 'react';
import '../../css/Navbar.css';
import createNew from '../../img/createNew.png';

type State = {
    statusCollapse: any
}

type Props = {
}

class Navbar extends Component<Props, State> {
    constructor(props: void){
        super(props);
        this.state = {
            statusCollapse: "-1000px"
        };

        (this: any).toggle = this.toggle.bind(this);
    }

    toggle(event:any) {
        let isOpen:string = "-80px";
        let isClosed:string = "-1000px";
        
        if(this.state.statusCollapse === isClosed){
            this.setState({statusCollapse: isOpen}) 
        } else {
            this.setState({statusCollapse: isClosed}) 
        }
    }

    render() {
        return (
            <div>
            <nav className="navbar navbar-expand-lg navbar-dark" id="header" onClick={() => window.scrollTo(0, 0)}>
                <a className="navbar-brand" href="#/">N | M</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"
                    onClick={this.toggle}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="nav navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/#/">Nyheter</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/#/kat/Sport">Sport</a>
                        </li>
                        <li className="nav-item ">
                            <a className="nav-link" href="/#/kat/Underholdning">Underholdning</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/#/kat/Politikk">Politikk</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/#/kat/Teknologi">Teknologi</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/#/kat/Økonomi">Økonomi</a>
                        </li>
                    </ul>
                    <div class="journalistElementer">
                        <ul className="nav navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" id="regSakIkon" href="/#/RegSak"><img src={createNew} width="38" alt="RegSakIkon"></img></a>
                            </li>
                            <li className="nav-item" id="leggTilSak">
                                <a className="nav-link" href="/#/RegSak">Legg til sak</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div id="collapseDiv" style={{marginTop: this.state.statusCollapse}}>
                <div>
                    <h5>Kategorier:</h5>
                </div>
                <div class="collapseButton">
                    {/*
                    * btn btn-outline-dark
                    * btn btn-outline-light
                    */}
                    <button class="collapseButtonsOrdered" type="button" class="btn btn-outline-light" onClick={() => {window.location.href="#/"; this.toggle()}}>Nyheter</button>
                    <button class="collapseButtonsOrdered" type="button" class="btn btn-outline-light" onClick={() => {window.location.href="#/kat/Teknologi"; this.toggle()}}>Teknologi</button>
                    <button class="collapseButtonsOrdered" type="button" class="btn btn-outline-light" onClick={() => {window.location.href="#/kat/Økonomi"; this.toggle()}}>Økonomi</button>
                    <button class="collapseButtonsOrdered" type="button" class="btn btn-outline-light" onClick={() => {window.location.href="#/kat/Politikk"; this.toggle()}}>Politikk</button>
                    <button class="collapseButtonsOrdered" type="button" class="btn btn-outline-light" onClick={() => {window.location.href="#/kat/Underholdning"; this.toggle()}}>Underholdning</button>
                    <button class="collapseButtonsOrdered" type="button" class="btn btn-outline-light" onClick={() => {window.location.href="#/kat/Sport"; this.toggle()}}>Sport</button>
                </div>
                <div class="collapseBottomDiv">
                    <div class="collapseBottomDivButtons">
                        <button type="button" id="collapseBottomButton" class="btn btn-outline-light" onClick={() => {window.location.href="#/RegSak"; this.toggle()}}>Registrer sak</button>
                        <button type="button" id="collapseBottomButton" class="btn btn-outline-light" onClick={() => {window.location.href="#/EndreSak"; this.toggle()}}>Endre sak</button>
                        <button type="button" id="collapseBottomButton" class="btn btn-outline-light" onClick={() => {window.location.href="#/SlettSak"; this.toggle()}}>Slett sak</button>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default Navbar;