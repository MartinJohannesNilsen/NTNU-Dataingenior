import React, {Component} from "react";
import "../../../../css/GuestEventCard.css"
let ipAdress = process.env.REACT_APP_HOSTNAME || "localhost";


class GuestEventCard extends Component {

    /** renders card with event information
     *
     * @return {*}
     */
    render(){
        return (
            <div>
                <a href = {"#/event/public/" + this.props.id}>
                    <div className="card bg-dark text-white guestEventCard" id="guestEventCardCard">
                        <img className="card-img guestCardImage" src={"http://" + ipAdress + ":8080/image/" + this.props.img_url} alt="Card"/>
                            <div className="card-img-overlay guestCardOverlay" id="guestCardOverlayDiv">
                                <h5 className="card-title eventName">{this.props.name}</h5>
                                <p className="card-text">{this.props.place}</p>
                            </div>
                    </div>
                </a>
            </div>
        )
    }
}

export default GuestEventCard;