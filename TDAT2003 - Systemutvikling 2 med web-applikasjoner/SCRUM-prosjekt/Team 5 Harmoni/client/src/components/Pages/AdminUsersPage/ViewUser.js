import React, {Component} from 'react';
import '../../../css/ViewUser.css';
import {adminService} from "../../../service/AdminService";

class ViewUser extends Component {

    state = {
        role: ""
    };

    render() {
        return(

            <div>
                <li className="list-group-item">


                     <div className="row" id={"ViewUserMain"}>

                    <div className="col" id={"idCol"}>
                        <div id="viewUsersMobileLegend">Id:</div>
                        <p>{this.props.id}</p>
                    </div>
                    <div className="col-sm-2">
                        <div id="viewUsersMobileLegend">Navn:</div>
                        <p>{this.props.name}</p>
                    </div>
                    <div className="col-sm-2">
                        <div id="viewUsersMobileLegend">E-post:</div>
                        <p>{this.props.email}</p>
                    </div>
                    <div className="col-sm-1">
                        <div id="viewUsersMobileLegend">Tlf.:</div>
                        <p>{this.props.phone}</p>
                    </div>
                    <div className="col-sm-2">
                        <div id="viewUsersMobileLegend">Rolle:</div>
                        <p>{this.state.role}</p>
                    </div>
                    <div className="col-sm-2" id="viewUserConfirmed">
                        <div id="viewUsersMobileLegend">Godkjent:</div>
                        <div>
                            <input type="radio" checked={this.props.approved === 1} readOnly={true} />
                        </div>
                    </div>
                    <div className="col-sm-2" id="viewUserEditButton">
                        <button className="btn btn-primary" onClick={() => {this.handleClick.bind(this); window.location.href="#/admin/users/" + this.props.id + "/edit"}}>Rediger</button>
                    </div>
                     </div>
                </li>
            </div>
        )
    }

    handleClick(){
        console.log("click");
    }

    componentDidMount() {
        window.scrollTo(0,0);
        adminService.getRoleByID(this.props.role).then(role =>
            this.setState({role: role[0].role})).catch((error) => {console.error(error)})
    }
}

export default ViewUser;