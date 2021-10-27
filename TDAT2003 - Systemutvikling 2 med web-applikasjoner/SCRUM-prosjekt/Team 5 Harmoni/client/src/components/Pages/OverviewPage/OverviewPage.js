import React, {Component} from 'react';
import "../../../css/Overview.css"
import { createHashHistory } from 'history';
import "../../../img/concert.jpg"
import Navbar from '../../Navbar/Navbar'
import Footer from '../../Footer/Footer';
import {UserService} from "../../../service/UserService";
import {authenticate, auth} from "../../../service/auth";

const history = createHashHistory();

class OverviewPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user : {},
            user_id: -1
        }
    }

    /** Scrolls to top of the page, authenticates and gets user information from DB*/
    componentDidMount() {
        window.scrollTo(0,0);
        authenticate();

        let userService = new UserService();
        userService.getUser(auth.user_id).then(user => {
                    this.setState({
                        user: user
                    })
                }
            )
            .catch(error => console.error(error));
    };


    /** Renders component */
    render() {
        return (
            <div className="pageSetup">
                <Navbar/>

                {/* ---- JUMBOTRON ---- */}

                <div className="jumbotron jumbotron-fluid">
                    <div className="titleContainer">
                        <h1 id={"jumbotronTitle"} className="display-4">Skap harmoni.</h1>
                    </div>
                </div>


                {/* ---- CARDS ---- */}

                <div id="OverviewDiv">
                    <div id="overviewPageCardContainer">

                        {/* ---- ADD ARRANGEMENT CARD ---*/}

                        <div id="overviewPageCardContent" className="card overview">
                            <div className="card-body">
                                <div id="overviewPageCardTitle">
                                    <h5 className="card-title">Legg til arrangement</h5>
                                </div>
                                <div id="overviewPageCardText">
                                    <p className="card-text">Legg til de eventene du måtte ønske.</p>
                                </div>
                                <div id="overviewPageCardBtn">
                                    <button className="btn btn-primary" onClick={this.addEvent} role="button">Legg til arrangement</button>
                                </div>
                            </div>
                        </div>

                        {/* ---- SEE ALL ARRANGEMENTS CARD ---*/}

                        <div id="overviewPageCardContent" className="card overview">
                            <div className="card-body">
                                <div id="overviewPageCardTitle">
                                    <h5 className="card-title">Se alle arrangementer</h5>
                                </div>
                                <div id="overviewPageCardText">
                                    <p className="card-text">Få en oversikt over alle dine arrangementer.</p>
                                </div>
                                <div id="overviewPageCardBtn">
                                    <button className="btn btn-success" onClick={this.seeEvents} role="button">Se alle arrangement</button>
                                </div>
                            </div>
                        </div>

                        {/* ---- SHOW PROFILE CARD ---*/}

                        <div id="overviewPageCardContent" className="card overview">
                            <div className="card-body">
                                <div id="overviewPageCardTitle">
                                    <h5 className="card-title">Vis profil</h5>
                                </div>
                                <div id="overviewPageCardText">
                                    <p className="card-text">Vil du endre profilen din kan du gjøre det her.</p>
                                </div>
                                <div id="overviewPageCardBtn">
                                    <button className="btn btn-warning" onClick={() => this.seeProfile(auth.user_id)}  role="button">Vis profil</button>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    addEvent(){
        history.push("/overview/addEvent")
    }

    seeEvents(){
        history.push("/event")
    }

    seeProfile(id){
        history.push("/profile/" + id)
    }
}

export default OverviewPage;