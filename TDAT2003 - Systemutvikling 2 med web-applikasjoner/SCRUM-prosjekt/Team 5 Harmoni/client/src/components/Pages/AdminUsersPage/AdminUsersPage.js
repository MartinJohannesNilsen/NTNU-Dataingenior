import React, {Component} from 'react';

import Navbar from '../../Navbar/Navbar'
import ViewUser from "./ViewUser";
import {adminService} from '../../../service/AdminService'
import "../../../css/AdminUsersPage.css"
import Footer from '../../Footer/Footer'


class AdminUsersPage extends Component {
    /**
     * Sets the state when component is made
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            shownUsers: []
        }

    }

    /**
     * Renders the component
     * @returns {*}
     */

    render() {
        return (
            <div>
                <div id="AdminUsersPageContainerDiv">
                    <div className={"AdminUsersPageWrapper"}>
                        <Navbar/>
                        <div id="AdminUsersPageOverflow">
                            <div id={"adminSearchField"}>
                                <input className="form-control border-dark" type="text" placeholder="Søk" aria-label="Search" id="adminSearchBar" onChange={() => this.handleSearch()}/>
                            </div>

                            <div className={"card"} id={"AdminUsersPageContainer"}>
                                <div className={"card-header"}>
                                    <div className={"row"}>

                                        <div className="col-sm-1">
                                            <p>Id</p>
                                        </div>
                                        <div className="col-sm-2">
                                            <p>Navn</p>
                                        </div>
                                        <div className="col-sm-2">
                                            <p>Email</p>
                                        </div>
                                        <div className="col-sm-1">
                                            <p>Telefon</p>
                                        </div>
                                        <div className="col-sm-2">
                                            <p>Rolle</p>
                                        </div>
                                        <div className="col-sm-2">
                                            <p>Godkjent</p>
                                        </div>
                                        <div className="col-sm-2">
                                            <p>Rediger</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {this.state.shownUsers.map((user) => {
                                return (<ViewUser key={user.user_id} id={user.user_id} name={user.name} email={user.email} phone={user.phone} role={user.role_id} approved={user.approved} />)
                            })}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    /**
     * Method which sets the state based on what input the user gives
     *
     */
    handleSearch() {
        const searchTitleElement = document.getElementById("adminSearchBar");
        let searchTitle = searchTitleElement.value;
        if(searchTitle !== ""){
            this.setState({shownUsers: this.state.shownUsers.filter(e =>
                    e.user_id.toString().toLowerCase().includes(searchTitle.toLowerCase()) ||
                    e.name.toLowerCase().includes(searchTitle.toLowerCase()) ||
                    e.email.toLowerCase().includes(searchTitle.toLowerCase())||
                    e.phone.toLowerCase().includes(searchTitle.toLowerCase())
                )})
        } else {
            this.componentDidMount();
        }
    }

    /**
     * Moves to the top of the screen. Then all users will be loaded from the database, and sets the state
     *
     */
    componentDidMount() {
        window.scrollTo(0,0);
        adminService.getUsers()
            .then((users) => {
                    this.setState({
                        shownUsers: users
                    })
                }
            )
            .catch((error) => {
                console.error(error);
            })
    }


}

export default AdminUsersPage;