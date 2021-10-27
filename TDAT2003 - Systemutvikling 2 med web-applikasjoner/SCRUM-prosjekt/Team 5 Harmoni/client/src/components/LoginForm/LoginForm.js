import React, {Component} from 'react';
import "../../css/LoginForm.css";
import UserService from "../../service/UserService.js"
import {authenticate} from "../../service/auth";
import {NavbarMainPage} from '../Navbar/Navbar.js'
import {toast} from "react-toastify";

let crypto = require('crypto');

/**
 * LoginForm
 */
class LoginForm extends Component{
    /**
     * @param {json} props 
     */
    constructor(props){
        super(props);
        this.state = {
            email: "",
            pw: "",
        };
        this.keyPressed = this.keyPressed.bind(this);
    }

    /**
     * Alerts the user if e-mail or password is wrong. Also gives an error if the user is not yet validated.
     * @function
     */
    notifyFailure = () => toast("E-post/passord var feil eller så er bruker ikke godkjent", {type: toast.TYPE.ERROR, position: toast.POSITION.BOTTOM_LEFT});



    /**
     * Submitting the values in state to a validate function to check if email/pw are valid.
     * If so, send the user to the home page/overview page.
     * @function
     */
    submit = () => {
        let userService = new UserService();
        userService.validate(this.state.email, this.state.pw)
            .then((response) => {
                let token = response.data.jwt;
                window.localStorage.setItem("token", token);
                window.location.hash = "/overview";
            })
            .then(authenticate)
            .catch((err) => {
                this.clearPassword();
                this.notifyFailure();
                console.error(err);
            })

    };

    /** 
     * Runs every time input-fields are updated. Updates the state with the most current values. 
     * @function
     */
    updateInputValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value 
        });
    }

    /** 
     * Clears password field if an error is encountered. Mainly to discourage trial and error of passwords.
     * @function
     */
    clearPassword = () => {
        document.getElementById("password-input").value = "";
    }

    /** 
     * Submits the entered data when the ENTER key is pressed
     * @function
     */
    keyPressed(event){
        if (event.key === "Enter") {
            this.submit();
        }
    }

    /**
     * Displays a form for login. Contains a text-input-field for both e-mail and password and buttons for registration and login. If login is successful, the user is then redirected to the overview page.
     */
    render(){        
        return(
            <div>
                <form id="LoginFormForm">
                    <div className="card LoginFormCard">
                        <div className="card-body">
                            <h1 id="login-title">Logg inn</h1>
                            <div className="form-group" id="email-input-container">
                                <label htmlFor="email-input">E-post</label>
                                <input type="email" name={"email"} className="form-control" id="email-input" placeholder="Skriv inn e-post" name="email" onChange={this.updateInputValue} onKeyPress={this.keyPressed}/>
                            </div>
                            <div className="form-group" id="password-input-container">
                                <label htmlFor="password-input">Passord</label>
                                <input type="password" className="form-control" id="password-input" placeholder="Skriv inn passord" onKeyPress={this.keyPressed} name="pw" onChange={this.updateInputValue} />
                            </div>
                            <div id="LoginFormButtons">
                                <button type="button" className="btn btn-outline-dark login-button" onClick={this.submit}>Logg inn</button>
                                <button type="button" className="btn btn-outline-dark login-button" onClick={() => window.location.href="#/register"}>Registrer</button>
                            </div>
                            <div id="loginFormForgotPW">
                                <a href="#/forgotpassword">Glemt passord?</a>
                            </div>
                            </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default LoginForm;