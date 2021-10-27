import React, { Component } from 'react';
import '../../../css/MainPage.css';
import {FooterTransparent} from '../../Footer/Footer'
import { auth } from "../../../service/auth.js"
import { Redirect } from "react-router-dom"


/**
* @class MainPage
* This class is seen as the portal login-screen, giving the user the option to either login or register a new user in the host-portal. 
*/
class MainPage extends Component {
    
    /** 
    * The component will now render on top of the screen.
    */
    componentDidMount(){
        window.scrollTo(0,0);
    }

    /**
    * Checks if the user is logged in and redirects if true. Further on it shows the portal site, with two options; login and register.
    */
    render() {  
        return (
            auth.authenticated === true
                ? <Redirect to="/overview" /> // Redirecting to overview page if user already is logged in.
                : 

            <div>
                <div id="MainPageDiv">
                    <div id="MainPageDivWithoutFooter">
                        <div id="MainPageTitle">HARMONI</div>
                        <div id="MainPageText"><h4>En portal for informasjonsflyt under planlegging av arrangementer</h4></div>
                        <div id="MainPageButtonDiv">
                            <div id="MainPageButtons">
                                <button type="button" className="btn btn-outline-light btn-lg" onClick={()=> window.location.href = "#/login"}>Logg inn</button>
                            </div>
                            <div id="MainPageButtons">
                                <button type="button" className="btn btn-outline-light btn-lg" onClick={()=> window.location.href = "#/register"}>Registrer ny bruker</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <FooterTransparent />
                    </div>    
                </div>
            </div>
        )
    }
}

export default MainPage;
