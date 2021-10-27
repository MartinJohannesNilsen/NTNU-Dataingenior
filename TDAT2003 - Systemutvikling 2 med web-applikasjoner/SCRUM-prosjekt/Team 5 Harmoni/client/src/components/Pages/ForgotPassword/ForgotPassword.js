import React, {Component} from 'react';
import '../../../css/MainPage.css'
import {FooterTransparent} from "../../Footer/Footer";
import {toast} from "react-toastify";
import UserService from "../../../service/UserService";


class ForgotPassword extends Component {
    /**
     * Constructor called when component is made
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            emailRep: ""
        }
        this.keyPressed = this.keyPressed.bind(this);
    }

    keyPressed(event){
        if (event.key === "Enter") {
            this.submit();
        }
    }

    /**
     * Renders the component when loaded
     * @returns {*}
     */
    render() {
        return (
            <div className="LoginFormForm">
                <div className="pageSetup">
                    <div id="LoginFormDiv">
                        <div id="LoginFormWithoutFooter">
                            <div id="MainPageTitle"><a id="LoginPageTitle" href="#/portal">HARMONI</a></div>
                            <div className={"wrapper"}>
                                <div className={"registerContainer"}>
                                    <div className="card RegisterPageCard">
                                        <div className="card-body">
                                            <h1 id={"regTitle"}>Glemt passord</h1>
                                            <form>
                                                <div className="form-group" id="RegisterPageFormGroup">
                                                    <div id="RegisterPageFormFieldsDivForgot">
                                                        <label htmlFor="exampleInputEmail1">E-post: </label>
                                                        <input type="name" name={"email"} className="form-control"
                                                            id="emailInput"
                                                            onChange={this.handleTextChange.bind(this)}
                                                            aria-describedby="emailHelp" placeholder="E-post..." onKeyPress={this.keyPressed}/>
                                                    </div>
                                                    <div id="RegisterPageFormFieldsDivForgot">
                                                        <label htmlFor="exampleInputEmail1">Gjenta e-post: </label>
                                                        <input type="name" name={"emailRep"} className="form-control"
                                                            id="repEmailInput"
                                                            onChange={this.handleTextChange.bind(this)}
                                                            aria-describedby="emailHelp" placeholder="E-post..." required="true" onKeyPress={this.keyPressed}/>
                                                    </div>
                                                    <div id="RegisterPageFormButtonDivForgot">
                                                        <button type={"button"} className={"btn btn-outline-dark"} onClick={() => this.submit()}>Resett passord</button>
                                                        <button type={"button"} className={"btn btn-outline-dark"} onClick={() => window.location.href="#/login"}>Logg inn</button>
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

            </div>

        )

    }

    /**
     * Notifying the user if e-mails are not identical
     * @returns {ToastId}
     */
    notifyFailure = () => toast("E-postene må være identiske", {type: toast.TYPE.ERROR, position: toast.POSITION.BOTTOM_LEFT});

    /**
     * Notifying if change of password is done
     */
    notifySuccess = () => {
        toast("Endring av passord er gjennomført. Sjekk din e-post for mer informasjon", {type: toast.TYPE.SUCCESS, position: toast.POSITION.BOTTOM_LEFT});
    };

    /**
     * Submit which will change the password of the specific user
     */
    submit = () => {
        if (this.state.email === this.state.emailRep) {
            let userService = new UserService();
            userService.forgotPassword(this.state.email)
                .then((res) => {
                    console.log(res);
                    this.notifySuccess();
                    window.location.hash ="/login";
                })
                .catch((err) => {
                    console.error(err);
                });


        } else {
            this.notifyFailure();
            document.getElementById("emailInput").value = "";
            document.getElementById("repEmailInput").value = "";
        }
        console.log(this.state);
    };

    /**
     * Moves to the top when component
     */
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    /**
     * Changes the state when input fields changes
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
}

export default ForgotPassword;