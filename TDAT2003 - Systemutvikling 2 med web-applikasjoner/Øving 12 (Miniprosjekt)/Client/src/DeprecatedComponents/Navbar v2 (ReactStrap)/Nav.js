

import React, { useState } from 'react';
import { Collapse, Button} from 'reactstrap';
import createNew from '../../img/createNew.png'

const Nav = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark" id="header">
                <a className="navbar-brand" href="/#/">N | M</a>
                <Button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"
                    onClick={toggle}>
                    <span className="navbar-toggler-icon"></span>
                </Button>
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
            <Collapse isOpen={isOpen} class="collapseBoks">
                <div class="collapseDiv">
                    <div>
                        <h5>Kategorier:</h5>
                    </div>
                    <div class="collapseButton">
                        {/*
                        * btn btn-outline-dark
                        * btn btn-outline-light
                        */}
                        <button class="collapseButtonsOrdered" type="button" class="btn btn-outline-light" onClick={() => {window.location.href="#/"; toggle()}}>Nyheter</button>
                        <button class="collapseButtonsOrdered" type="button" class="btn btn-outline-light" onClick={() => {window.location.href="#/kat/Teknologi"; toggle()}}>Teknologi</button>
                        <button class="collapseButtonsOrdered" type="button" class="btn btn-outline-light" onClick={() => {window.location.href="#/kat/Økonomi"; toggle()}}>Økonomi</button>
                        <button class="collapseButtonsOrdered" type="button" class="btn btn-outline-light" onClick={() => {window.location.href="#/kat/Politikk"; toggle()}}>Politikk</button>
                        <button class="collapseButtonsOrdered" type="button" class="btn btn-outline-light" onClick={() => {window.location.href="#/kat/Underholdning"; toggle()}}>Underholdning</button>
                        <button class="collapseButtonsOrdered" type="button" class="btn btn-outline-light" onClick={() => {window.location.href="#/kat/Sport"; toggle()}}>Sport</button>
                    </div>
                    <div class="collapseBottomDiv">
                        <div class="collapseBottomDivButtons">
                            <button type="button" id="collapseBottomButton" class="btn btn-outline-light" onClick={() => {window.location.href="#/RegSak"; toggle()}}>Registrer sak</button>
                            <button type="button" id="collapseBottomButton" class="btn btn-outline-light" onClick={() => {window.location.href="#/EndreSak"; toggle()}}>Endre sak</button>
                            <button type="button" id="collapseBottomButton" class="btn btn-outline-light" onClick={() => {window.location.href="#/SlettSak"; toggle()}}>Slett sak</button>
                        </div>
                    </div>
                </div>
            </Collapse>
        </div>
    );
}

export default Nav;