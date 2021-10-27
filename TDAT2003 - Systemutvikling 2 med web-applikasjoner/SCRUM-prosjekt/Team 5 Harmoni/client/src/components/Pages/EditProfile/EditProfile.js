import React, {Component} from 'react';
import "../../../css/EditProfile.css"
import {FileService} from "../../../service/FileService";
import {Redirect} from 'react-router-dom';
import {auth, authenticate} from "../../../service/auth";
import {UserService, User} from "../../../service/UserService";
import {toast} from 'react-toastify';
import {validateEmail, validatePhone} from "../../../validaters";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";


/**
 * @class EditProfile
 */
class EditProfile extends Component {
    user_id = this.props.match.params.userID;
    user;

    /**
     * sets the states for the user and the profile picture url to be empty
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {user: {}, img_url: ""}

    }

    /**
     * Notifies the user that the change to the user info was a success
     */
    notifySuccess = () => {
        toast("Redigering av bruker vellykket", {type: toast.TYPE.SUCCESS, position: toast.POSITION.BOTTOM_LEFT});
    };

    /**
     * Notifies the user that the change to the password was a succsess
     */
    notifySuccessPw = () => {
        toast("Redigering av passord vellykket", {type: toast.TYPE.SUCCESS, position: toast.POSITION.BOTTOM_LEFT});
    };

    /**
     * Notifies the user that something went wrong in the process
     * @returns {ToastId}
     */
    notifyFailure = () => toast("Noe gikk galt", {type: toast.TYPE.ERROR, position: toast.POSITION.BOTTOM_LEFT});

    /**
     * Notifies the user that the phone number is invalid
     * @returns {ToastId}
     */
    notifyUnvalidPhone = () => toast("Ugyldig telefonnummer", {
        type: toast.TYPE.ERROR,
        position: toast.POSITION.BOTTOM_LEFT
    });

    /**
     * Notifies the user that the email is invalid
     * @returns {ToastId}
     */
    notifyUnvalidEmail = () => toast("Ugyldig e-post", {type: toast.TYPE.ERROR, position: toast.POSITION.BOTTOM_LEFT});

    /**
     * Notifies the user that the email is invalid because it is already registered with another account
     * @returns {ToastId}
     */
    notifyUsedEmail = () => toast("E-post er allerede i bruk", {type: toast.TYPE.ERROR, position: toast.POSITION.BOTTOM_LEFT});

    /**
     * Notifies the user that the phone number is invalid because it is already registered with another account
     * @returns {ToastId}
     */
    notifyUsedPhone = () => toast("Telefonnummeret er allerede i bruk", {type: toast.TYPE.ERROR, position: toast.POSITION.BOTTOM_LEFT});

    /**
     * Notifies the user that the new password and the new password check is not the same
     * @returns {ToastId}
     */
    notifyPasswordNoMatch = () => toast("Nytt passord og repetert nytt passord må være identiske", {type: toast.TYPE.ERROR, position: toast.POSITION.BOTTOM_LEFT});

    /**
     * Notifies the user that the input box for password are not filled
     * @returns {ToastId}
     */
    notifyMissingPassword = () => toast("Du må fylle ut begge passord-feltene", {
        type: toast.TYPE.ERROR,
        position: toast.POSITION.BOTTOM_LEFT
    });

    /**
     * Notifies the user that the current password are wrong
     * @returns {ToastId}
     */
    notifyPasswordFailure = () => toast("Du har skrevet inn feil nåværende passord", {
        type: toast.TYPE.ERROR,
        position: toast.POSITION.BOTTOM_LEFT
    });

    /**
     * Notifies the user that the password are to short
     * @returns {ToastId}
     */
    notifyPasswordLength = () => toast("Det nye passordet må bestå av minst 8 tegn", {
        type: toast.TYPE.ERROR,
        position: toast.POSITION.BOTTOM_LEFT
    });

    /**
     * Notifies the user that the file they want to upload is to large
     * @returns {ToastId}
     */
    notifyTooBigFile = () => toast("Filen du forsøkte å laste opp var for stor", {
        type: toast.TYPE.ERROR,
        position: toast.POSITION.BOTTOM_LEFT
    });

    /**
     * Notifies the user if the data they wrote inn is too large
     * @returns {ToastId}
     */
    notifyTooBigData = () => toast("Navnet du forsøkte å redigere inneholder for mange karakterer", {
        type: toast.TYPE.ERROR,
        position: toast.POSITION.BOTTOM_LEFT
    });

    /**
     * authenticate() runs to get the authenticated user that is logged in
     * the auth.user_id has to match the user_id that are in the params
     * then the user values are picked up from the database and set in the user state
     */
    componentDidMount() {
        window.scrollTo(0,0);
        authenticate();
        if (this.props.match.params.userID === auth.user_id) {
            let userService = new UserService();
            userService.getUser(this.user_id)
                .then(user =>
                    this.setState({
                        user: user
                    })
                )
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    /**
     * If any of these fields are empty, the function returns false, and prompts the user to fill the remaining fields.
     * @param e
     * @returns {boolean}
     */
    checkFields = (e) => {
        const name = document.getElementById("nameInput").value.trim();
        const email = document.getElementById("emailInput").value.trim();
        const phone = document.getElementById("tlfInput").value.trim();
        const pw = this.state.user.password;
        const role = this.state.user.roleid;
        const approved = this.state.user.approved;
        if (
            (name === null || name === "" ||
                email === null || email === "" ||
                phone === null || phone === "" ||
                pw === null || pw === "" ||
                role === null || role === "" ||
                approved === null || approved === "")
        ) {
            this.notifyFailure();
            return false;
        } else if (!(validatePhone(phone))) {
            this.notifyUnvalidPhone();
            return false;
        } else if (!(validateEmail(email))) {
            this.notifyUnvalidEmail();
            return false;
        } else {
            return true;
        }
    };

    /**
     * if the user_id in the params doesn't match they are redirected to showProfile for the user that are logged in (auth.user_id)
     * else it returns input-boxes filled with the data that are registered in the database
     * changes to the boxes are set as the new values and sent in if the user pushes the save button
     * change password has its own set of input boxes and save button that double checks the new password
     * if anything goes wrong the user is notified with a describing method
     * @returns {*}
     */
    render() {
        return (
            auth.user_id === this.props.match.params.userID ?
                <div>
                    <Navbar/>
                    <div id="EditProfileDiv">
                        <h1>Endre Profil</h1>
                        <div id="ShowProfileDivide" className="dropdown-divider border-dark"></div>

                        <div id="EditProfileInput">
                            <div className="col-sm-4">
                                <h5>Navn: </h5>
                                <input
                                    id="nameInput"
                                    className="form-control form-control-lg"
                                    type="text"
                                    defaultValue={this.state.user.name}
                                    aria-describedby="namehelp"
                                />
                                <br/>
                            </div>

                            <div className="col-sm-4">
                                <h5>Telefon: </h5>
                                <input
                                    id="tlfInput"
                                    className="form-control form-control-lg"
                                    type="text"
                                    defaultValue={this.state.user.phone}
                                    aria-describedby="tlfhelp"
                                />
                                <br/>
                            </div>


                            <div className="col-sm-4">
                                <h5>E-post: </h5>
                                <input
                                    id="emailInput"
                                    className="form-control form-control-lg"
                                    type="text"
                                    defaultValue={this.state.user.email}
                                    aria-describedby="emailhelp"
                                />
                                <br/>
                            </div>
                            <div className="col-sm-4">
                                <h5>Profilbilde: </h5>
                                <input
                                    id="fileInput"
                                    className="form-control form-control-lg"
                                    type="file" accept={"image/*"}
                                />
                                <br/>
                            </div>
                        </div>

                        <button type="button" className="btn btn-dark btn-lg" onClick={this.save}>Lagre endringer
                        </button>
                        <button
                            className="btn changePassword btn-outline-info btn-lg"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapsechangePassword"
                            aria-expanded="false"
                            aria-controls="collapsechangePassword"
                        >
                            Endre passord
                        </button>
                        <div id="EditProfileChangePasswordDiv">
                            <div className="collapse" id="collapsechangePassword">

                                <div className="col-sm-4">
                                    <h5>Gammelt passord: </h5>
                                    <input
                                        id="oldPasswordInput"
                                        className="form-control form-control-lg"
                                        type="password"
                                        placeholder="Gammelt passord"
                                        aria-describedby="oldPasHelp"
                                    />
                                    <br/>
                                </div>

                                <div className="col-sm-4">
                                    <h5>Nytt passord: </h5>
                                    <input
                                        id="newPasswordInput"
                                        className="form-control form-control-lg"
                                        type="password"
                                        placeholder="Nytt passord"
                                        aria-describedby="newPasHelp"
                                    />
                                    <br/>
                                </div>
                                <div className="col-sm-4">
                                    <h5>Repeter nytt passord: </h5>
                                    <input
                                        id="reNewPasswordInput"
                                        className="form-control form-control-lg"
                                        type="password"
                                        placeholder="Nytt passord"
                                        aria-describedby="newPasHelp"
                                    />
                                    <br/>
                                </div>
                                <div className={"col-sm-4"}>
                                    <button type="button" className="btn btn-dark btn-lg"
                                            onClick={() => this.changePW()}>Lagre nytt passord
                                    </button>
                                </div>

                            </div>
                        </div>

                    </div>
                    <Footer/>
                </div>
                : <Redirect to={"/profile/" + auth.user_id}/>

        )
    }

    /**
     * If any of the fields are empty, prompt the user to fill them in before proceeding
     * Verifies that the passwords fields are filled out
     * If so the method will check that the old password is correct, and then validate the newPassword and repeatNewPassword field.
     * @returns {boolean}
     */
    changePW = () => {
        let userService = new UserService();

        const email = this.state.user.email;
        const user_id = auth.user_id;
        const oldPWInput = document.getElementById("oldPasswordInput").value;
        const newPWInput = document.getElementById("newPasswordInput").value;
        const reNewPWInput = document.getElementById("reNewPasswordInput").value;

        if (
            oldPWInput === null || oldPWInput === "" ||
            newPWInput === null || newPWInput === "" ||
            reNewPWInput === null || reNewPWInput === ""
        ) {
            this.notifyMissingPassword();
            return false;
        } else if(newPWInput.length < 8){
            this.notifyPasswordLength();
            return false;
        } else{
            if (newPWInput !== reNewPWInput) {
                this.notifyPasswordNoMatch();
            } else {
                userService.updatePassword(email, oldPWInput, newPWInput, user_id)
                    .then((res) => {
                        console.log(res.data.error);
                        if (res.data.error === "Not authorized") {
                            this.notifyPasswordFailure();
                        } else {
                            this.notifySuccessPw();
                            window.location.hash = "/profile/" + auth.user_id;
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        this.notifyFailure();
                    })
            }
        }
    };

    /**
     * first it check if any input-fields are empty and if it isn't it tries to change password
     * The method will then validate the filesize, and refuse to upload files which are too big
     * Thereafter the update of the user will be done
     */
    save = () => {
        if (this.checkFields()) {
            const oldPWInput = document.getElementById("oldPasswordInput").value;
            const newPWInput = document.getElementById("newPasswordInput").value;

            if (oldPWInput !== "" && oldPWInput !== null && newPWInput !== "" && newPWInput !== null) {
                this.changePW();
            }
            let fileService = new FileService();
            let file = document.getElementById(("fileInput")).files[0];
            if (file !== undefined) {
                if (file.size > 10000000) {
                    this.notifyTooBigFile();
                } else {
                    fileService.uploadImage(file)
                        .then((res) => {
                            this.setState({
                                img_url: res.data.filePath.filename
                            })
                        })
                        .catch((err) => {
                            console.log("ERROR:");
                            console.error(err);
                        })
                        .then(() => {
                            let userService = new UserService();
                            let newUser = new User(
                                this.state.user.user_id,
                                document.getElementById("nameInput").value,
                                document.getElementById("emailInput").value,
                                document.getElementById("tlfInput").value,
                                this.state.img_url,
                                this.state.user.password,
                                this.state.user.roleid,
                                this.state.user.approved
                            );
                            userService.updateUser(newUser)
                                .then(() => {
                                    this.notifySuccess();
                                    window.location.hash = "/profile/" + auth.user_id;
                                })
                                .catch((err) => {
                                    if (err.response.data.sqlMessage.indexOf("email") > -1) {
                                        this.notifyUsedEmail();
                                    } else if (err.response.data.sqlMessage.indexOf("phone") > -1) {
                                        this.notifyUsedPhone();
                                    } else if (err.response.data.sqlMessage.indexOf("Data too long") > -1) {
                                        this.notifyTooBigData();
                                    } else {
                                        this.notifyFailure();
                                    }
                                });
                        })
                }
            } else {
                fileService.uploadImage(file)
                    .then((res) => {
                        this.setState({
                            img_url: res.data.filePath.filename
                        })
                    })
                    .catch((err) => {
                        console.log("ERROR:");
                        console.error(err);
                    })
                    .then(() => {
                        let userService = new UserService();
                        let newUser = new User(
                            this.state.user.user_id,
                            document.getElementById("nameInput").value,
                            document.getElementById("emailInput").value,
                            document.getElementById("tlfInput").value,
                            this.state.img_url,
                            this.state.user.password,
                            this.state.user.roleid,
                            this.state.user.approved
                        );
                        userService.updateUser(newUser)
                            .then(() => {
                                this.notifySuccess();
                                window.location.hash = "/profile/" + auth.user_id;
                            })
                            .catch((err) => {
                                if (err.response.data.sqlMessage.indexOf("email") > -1) {
                                    this.notifyUsedEmail();
                                } else if(err.response.data.sqlMessage.indexOf("phone") > -1) {
                                    this.notifyUsedPhone();
                                } else if (err.response.data.sqlMessage.indexOf("Data too long") > -1) {
                                    this.notifyTooBigData();
                                } else {
                                    this.notifyFailure();
                                }

                            })
                    })
            }
        }
    }
}

export default EditProfile;
