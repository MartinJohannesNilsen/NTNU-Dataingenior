import React, {Component} from 'react';

/**
* @class NavbarMainPage
* The component of the navbar showing only when not logged in, or by showing the guest-pages.
* These pages are the guestEventView showing the eventinfo, guestMainPage being the firstpage with an list of events,
* and the calendar showing when not logged in.
*/
class NavbarMainPage extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark" id="navbar">
                    <a className="navbar-brand" href="#/"><h1>Harmoni</h1></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link"
                                   href = "#/">Arrangementer</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"
                                   href = "#/calendar">Kalender</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link"
                                   href = {"#/portal"}>Arrangørportal</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default NavbarMainPage;
