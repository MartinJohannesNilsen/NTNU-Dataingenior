import React, {Component} from 'react';
import "../../../css/ShowProfile.css"
import { createHashHistory } from 'history';
import {UserService} from "../../../service/UserService.js";
import {Redirect} from 'react-router-dom';
import { User} from "../EditProfile/EditProfile";
import Navbar from "../../Navbar/Navbar";
import {authenticate, auth} from "../../../service/auth";
import Footer from "../../Footer/Footer";
let ipAdress = process.env.REACT_APP_HOSTNAME || "localhost";

const history = createHashHistory();

/**
 * @class ShowProfile
 * gets the user_id from the parameter
 */
class ShowProfile extends Component {
    user_id = this.props.match.params.userID;

    /**
     * sets the state of the user and authorised to be empty
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            authorized: ""
        }

    }

    /**
     * authenticate() and check if the user_id we have from the params match with the user_id that that are logged in
     * if it doesn't match the state authorised are set false.
     * If it matches the state is set to true and the user data are picked up from the database
     *
     */
    componentDidMount() {
        window.scrollTo(0,0);
        authenticate();
        if (this.props.match.params.userID !== auth.user_id) {
            this.setState({
                authorized: false
            })
        } else {
            this.setState({
                authorized: true
            });
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
     * if the authenticated state was set to false then you are redirected to showProfile for the user that is logged in
     * The data from user and the profile picture are displayed for the user
     * If you want to edit some of it there is a button to move to the edit page
     * @returns {*}
     */
    render() {
        return (
                auth.user_id === this.props.match.params.userID ?
                <div>
                    <Navbar/>
                    <div id="ShowProfileDiv">
                        <h1>Min profil</h1>
                        <hr id="ShowProfileHR"/>
                        <div id="ShowProfilePic">
                            <img id="ShowProfileProfile" alt="profilePic" src={this.state.user.profile_photo === null || this.state.user.profile_photo === "" ? "https://www.sketchengine.eu/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png" : "http://" + ipAdress + ":8080/image/" + this.state.user.profile_photo}
                                 width="250" height="250"/>
                        </div>
                        <div id="ShowProfileText">

                            <div id="ShowProfileLine">
                                <h4 id="h4">Navn: </h4> <h5 id="h5">{this.state.user.name}</h5>
                            </div>
                            <div id="ShowProfileLine">
                                <h4 id="h4">Telefon: </h4><h5 id="h5">{this.state.user.phone}</h5>
                            </div>
                            <div id="ShowProfileLine">
                                <h4 id="h4">E-post: </h4><h5 id="h5">{this.state.user.email}</h5>
                            </div>
                        </div>


                        <div id="ShowProfileButtonDiv">
                            <div id="ShowProfileBtn">
                                <button type="button" className="btn btn-info btn-lg" onClick={() => this.editProfile(this.user_id)}>Endre profil</button>
                            </div>
                        </div>
                    </div>

                    <Footer/>
                </div>
            : <Redirect to={"/profile/" + auth.user_id } />
        )
    }

    /**
     * pushes to the edit page when the button is pushed
     * @param id
     */
    editProfile(id){
        history.push("/profile/"+ id + "/edit")
    }
}

export default ShowProfile;