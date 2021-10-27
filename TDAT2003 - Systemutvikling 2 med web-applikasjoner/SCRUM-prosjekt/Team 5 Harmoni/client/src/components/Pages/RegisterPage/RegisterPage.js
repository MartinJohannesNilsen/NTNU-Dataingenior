import React, {Component} from 'react';

import "../../../css/RegisterPage.css"
import UserService, {User} from "../../../service/UserService.js";
import {FileService} from "../../../service/FileService";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {NavbarMainPage} from '../../Navbar/Navbar'
import Footer from '../../Footer/Footer'
import {FooterTransparent} from '../../Footer/Footer'
import {confirmAlert} from "react-confirm-alert";
import {toast} from "react-toastify";
import {validateEmail} from "../../../validaters";

/** 
* @class RegisterPage
* class that extends React Component, showing as an registerscreen for the host-portal. 
* Here you can register a new user with name, email, telephonenumber, password and a profile picture. 
*/
class RegisterPage extends Component {

    /** 
    * The constructor creates a state-object holding information about the different form-input-fields. It also binds this on to different functions, telling these functions what "this" refers to.
    */
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            phone: "",
            role: "ingenRolle",
            image_url: "",
            password: "",
            repeatedPassword: "",
            synligModal: false,
            modalFeedback: "",
            modalTitle: "",
        };
        this.keyPressed = this.keyPressed.bind(this);
        this.regUser = this.regUser.bind(this);
    }

    /** 
    * @param {event} event
    * Function adding a keyEventListener in the inputFields, which listenes after the enter-key and will register if all the fields are filled in correctly.
    */
    keyPressed(event) {
        if (event.key === "Enter" && (this.state.name !== "" && this.state.email !== "" && this.state.phone !== "" && this.state.password !== "" && this.state.repeatedPassword !== "")) {
            this.regUser();
        }
    }

    /** 
    * The component will now render on top of the screen.
    */
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    /** 
    * Renders the component with all the input-fields in a form, with buttons directing you based on if you got to register or not. 
    * An alert wil pop up if some of the fields are incorrectly filled in. 
    */
    render() {
        return (
            <div className="pageSetup">
                <div id="LoginFormDiv">
                    <div id="LoginFormWithoutFooter">
                        <div id="MainPageTitle"><a id="LoginPageTitle" href="#/portal">HARMONI</a></div>
                        <div className={"wrapper"}>
                            <div className={"registerContainer"}>
                                <div className="card RegisterPageCard">
                                    <div className="card-body">
                                        <h1 id={"regTitle"}>Registrer</h1>
                                        <form>
                                            <div className="form-group" id="RegisterPageFormGroup">
                                                <div id="RegisterPageFormFieldsDiv">
                                                    <label htmlFor="exampleInputEmail1">Navn: </label>
                                                    <input type="name" name={"name"} className="form-control"
                                                           id="firstNameInput"
                                                           onChange={this.handleTextChange.bind(this)}
                                                           aria-describedby="emailHelp" placeholder="Navn..."
                                                           onKeyPress={this.keyPressed}/>
                                                </div>
                                                <div id="RegisterPageFormFieldsDiv">
                                                    <label htmlFor="exampleInputEmail1">E-post: </label>
                                                    <input type="email" name={"email"} className="form-control"
                                                           id="emailInput"
                                                           onChange={this.handleTextChange.bind(this)}
                                                           aria-describedby="emailHelp" placeholder="E-post..."
                                                           onKeyPress={this.keyPressed}/>
                                                </div>
                                                <div id="RegisterPageFormFieldsDiv">
                                                    <label htmlFor="exampleInputEmail1">Telefon:</label>
                                                    <input type="tel" pattern={"[0-9]{8}"} name={"phone"}
                                                           className="form-control" id="exampleInputEmail1"
                                                           onChange={this.handleTextChange.bind(this)}
                                                           aria-describedby="emailHelp" placeholder="Telefon..."
                                                           onKeyPress={this.keyPressed}/>
                                                </div>
                                                <div id="RegisterPageFormFieldsDiv">
                                                    <label htmlFor="exampleInputEmail1">Profilbilde:</label>
                                                    <input type="file" id={"imageUpload"}
                                                           accept={"image/jpeg, image/jpg, image/png"}/>
                                                </div>
                                                <div id="RegisterPageFormFieldsDiv">
                                                    <label htmlFor="exampleInputPassword1">Passord:</label>
                                                    <input type="password" name="password" className="form-control"
                                                           className="passwordInput"
                                                           onChange={this.handleTextChange.bind(this)}
                                                           placeholder="Passord..." onKeyPress={this.keyPressed}/>
                                                </div>
                                                <div id="RegisterPageFormFieldsDiv">
                                                    <label htmlFor="exampleInputPassword1">Gjenta passord:</label>
                                                    <input type="password" name={"repeatedPassword"}
                                                           className="form-control" className="passwordInput"
                                                           onChange={this.handleTextChange.bind(this)}
                                                           placeholder="Gjenta passord..."
                                                           onKeyPress={this.keyPressed}/>
                                                </div>
                                                <div id="RegisterPageFormButtonDiv">
                                                    <button type="button"
                                                            className={"login-button"}
                                                            className="btn btn-outline-dark"
                                                            onClick={this.regUser.bind(this)}
                                                            disabled={this.state.name === "" || this.state.email === ""
                                                            || this.state.phone === "" || this.state.password === "" || this.state.repeatedPassword === ""}>Registrer
                                                    </button>
                                                    <button type="button" className={"login-button"} className="btn btn-outline-dark"
                                                            onClick={() => window.location.href = "#/login"}>
                                                        Logg inn
                                                    </button>
                                                </div>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <FooterTransparent/>
                    </div>
                </div>
            </div>
        );
    }

    /**
     * Notifying the user if something went wrong when trying to register
     * @returns {ToastId}
     */
    notifyFailure = () => toast("Noe gikk galt", {type: toast.TYPE.ERROR, position: toast.POSITION.BOTTOM_LEFT});

    /**
     * Notifying the user if the file is of another type than image
     * @returns {ToastId}
     */
    notifyWrongMimeType = () => toast("Du må laste opp et bilde", {
        type: toast.TYPE.ERROR,
        position: toast.POSITION.BOTTOM_LEFT
    });

    /**
     * Notifying the user if the file is too big to be uploaded
     * @returns {ToastId}
     */
    notifyTooBigFile = () => toast("Filen du forsøkte å laste opp var for stor", {
        type: toast.TYPE.ERROR,
        position: toast.POSITION.BOTTOM_LEFT
    });

    /**
     * Changes the state when input field is changed
     * @param event
     */
    
    handleTextChange = event => {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    };

    /**
     * Gives user a toast
     * @param feedback is what kind of feedback the user should get
     */
    showFeedback(feedback) {
        if (feedback === "phoneAndPasswords") {
            confirmAlert({
                title: 'Feil',
                message: 'Telefonnummeret må være på 8 siffer og passordene må matche.',
                buttons: [
                    {
                        label: 'Ok',
                    },
                ]
            });
        } else if (feedback === "phone") {
            confirmAlert({
                title: 'Feil',
                message: 'Telefonnummeret må være på 8 siffer.',
                buttons: [
                    {
                        label: 'Ok',
                    },
                ]
            });
        } else if (feedback === "passwords") {
            confirmAlert({
                title: 'Feil',
                message: 'Passordene må matche.',
                buttons: [
                    {
                        label: 'Ok',
                    },
                ]
            });
        } else if (feedback === "successfullRegistration") {
            confirmAlert({
                title: 'Suksess!',
                message: 'Bruker registrert!',
                buttons: [
                    {
                        label: 'Ok',
                    },
                ]
            });
        } else if (feedback === "samePhone") {
            confirmAlert({
                title: 'Feil',
                message: 'Telefonnummeret er allerede i bruk.',
                buttons: [
                    {
                        label: 'Ok',
                    },
                ]
            });
        } else if (feedback === "sameEmail") {
            confirmAlert({
                title: 'Feil!',
                message: 'Eposten er allerede i bruk!',
                buttons: [
                    {
                        label: 'Ok',
                    },
                ]
            });
        } else if (feedback === "email") {
            confirmAlert({
                title: "Feil!",
                message: "Eposten er ikke av gyldig format",
                buttons: [
                    {
                        label: "Ok",
                    }
                ]
            })
        } else if (feedback === "pwLen") {
            confirmAlert({
                title: "Feil!",
                message: "Passordet må bestå av minst 8 tegn",
                buttons: [
                    {
                        label: "Ok"
                    }
                ]
            })
        } else if (feedback === "tooLongData") {
            confirmAlert({
                title: "Feil!",
                message: "Navnet du har skrevet inn et for langt",
                buttons: [
                    {
                        label: "Ok"
                    }
                ]
            })
        }

    }

    /**
     * The method will firstly validate the different input
     * If they all go through the user will be registrated
     */

    regUser = () => {

        {
            if (!(this.state.phone.match(/^\d{8}$/)) && this.state.password !== this.state.repeatedPassword) {
                this.showFeedback("phoneAndPasswords")
            } else if (!(this.state.phone.match(/^\d{8}$/))) {
                this.showFeedback("phone");
            } else if (!(validateEmail(this.state.email))) {
                this.showFeedback("email");
            } else if (this.state.password.length < 8) {
                this.showFeedback("pwLen");
            } else if (this.state.password !== this.state.repeatedPassword) {
                this.showFeedback("passwords");
            } else {
                let userService = new UserService();
                let fileService = new FileService();
                let profilePicture = document.getElementById("imageUpload").files[0];
                if (profilePicture !== undefined) {
                    if (profilePicture.size > 10000000) { //Bigger than 10 MB
                        this.notifyTooBigFile();
                        return;
                    }
                }
                fileService.uploadImage(profilePicture)
                    .then((res) => {
                        console.log(res);
                        console.log("filename: " + res.data.filePath.filename);
                        this.setState({
                            image_url: res.data.filePath.filename
                        });

                    })
                    .catch((err) => {
                        console.error(err);
                    })
                    .then(() => {
                        let user = new User(null, this.state.name, this.state.email, this.state.phone, this.state.image_url, this.state.password, null, null);
                        userService.registerUser(user)
                            .then(() => {
                                this.showFeedback("successfullRegistration");
                                window.location.hash = "/login";
                            })
                            .catch((error) => {
                                console.log(error);
                                console.error(error.response.data);
                                if (error.response.data.sqlMessage.indexOf("email") > -1) {
                                    console.log("e-post");
                                    this.showFeedback("sameEmail");
                                }
                                if (error.response.data.sqlMessage.indexOf("phone") > -1) {
                                    console.log("telefon");
                                    this.showFeedback("samePhone");
                                }

                                if(error.response.data.sqlMessage.indexOf("Data too long") > -1) {
                                    this.showFeedback("tooLongData");
                                }
                            })
                    })
                    .catch((err) => {
                        console.error(err);
                    })
            }
        }
    };


}

export default RegisterPage;