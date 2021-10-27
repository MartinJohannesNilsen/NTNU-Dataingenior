

import React, {Component} from 'react';
import './Navbar.css';
import createNew from '../../img/createNew.png'

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id="header">
                <a className="navbar-brand" href="/#/">N | M</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
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
                    </ul>
                    <div class="journalistElementer">
                        <ul className="nav navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" id="regSakIkon" href="/#/RegSak"><img src={createNew} width="38"></img></a>
                            </li>
                            <li className="nav-item" id="leggTilSak">
                                <a className="nav-link" href="/#/RegSak">Legg til sak</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )

        /*
        https://icon-library.net/images/white-plus-icon/white-plus-icon-3.jpg
        */
    }
}

export default Navbar;