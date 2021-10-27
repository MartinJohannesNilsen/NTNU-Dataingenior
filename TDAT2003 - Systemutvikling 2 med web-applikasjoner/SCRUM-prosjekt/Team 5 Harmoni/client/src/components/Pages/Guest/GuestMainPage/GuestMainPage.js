import React, { Component } from 'react';
import "../../../../css/GuestMainPage.css"
import "../GuestEventCard/GuestEventCard";
import GuestEventCard from "../GuestEventCard/GuestEventCard";
import {eventService} from "../../../../service/EventService";
import NavbarMainPage from "../../../Navbar/NavbarMainPage";
import Footer from '../../../Footer/Footer';
import ToTop from '../../../ToTop/ToTop'
let ipAdress = process.env.REACT_APP_HOSTNAME || "localhost";

class GuestMainPage extends Component {
    state = {
        events: [],
    };


    /** Scrolls to top of the page and gets all active events from DB and puts them in the component state */
    componentDidMount(){
        window.scrollTo(0,0);
        eventService.getAllActive()
            .then(events => {this.setState({events: events})})
            .catch(error => {console.error(error)});
    }

    /** Render method which renders the component.
     * @return component with carousel if there are more than or exactly 3 active events to show. Shows the three events nearest in time.
     * @return component without carousel if there are less than 3 active events to show.
     */
    render() {
        let urls = [];
        let dates = [];
        let names = [];
        let places = [];
        let id = [];
        if(this.state.events.length >= 3){
            this.state.events.forEach(event => {urls.push(event.img_url); names.push(event.name); places.push(event.place); id.push(event.event_id); dates.push(event.date)});
            return (
                <div>
                    <div id="GuestMainPageContainer">
                        <NavbarMainPage/>
                        <ToTop />
                        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                            <ol className="carousel-indicators">
                                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"/>
                                <li data-target="#carouselExampleIndicators" data-slide-to="1"/>
                                <li data-target="#carouselExampleIndicators" data-slide-to="2"/>
                            </ol>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <a href = {"#/event/public/" + id[0]}>

                                    <img className="d-block w-100" src={"http://" + ipAdress + ":8080/image/" + urls[0]} alt={names[0]}/>
                                        <div className="carousel-caption d-100 d-md-block">

                                            <h5>{names[0]}</h5>
                                            <p>{places[0]}</p>
                                            <p>{this.formatDate(dates[0])}</p>
                                        </div>
                                    </a>
                                </div>
                                <div className="carousel-item">
                                    <a href = {"#/event/public/" + id[1]}>
                                        <img className="d-block w-100" src={"http://" + ipAdress + ":8080/image/" + urls[1]} alt={names[1]}/>

                                        <div className="carousel-caption d-100 d-md-block">

                                            <h5>{names[1]}</h5>
                                            <p>{places[1]}</p>
                                            <p>{this.formatDate(dates[1])}</p>
                                        </div>
                                    </a>
                                </div>
                                <div className="carousel-item">
                                    <a href = {"#/event/public/" + id[2]}>
                                    <img className="d-block w-100" src={"http://" + ipAdress + ":8080/image/" + urls[2]} alt={names[2]}/>
                                    <div className="carousel-caption d-100 d-md-block">
                                        <h5>{names[2]}</h5>
                                        <p>{places[2]}</p>
                                        <p>{this.formatDate(dates[2])}</p>
                                    </div>
                                    </a>
                                </div>
                            </div>
                            <a className="carousel-control-prev" href="#carouselExampleControls" role="button"
                               data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"/>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#carouselExampleControls" role="button"
                               data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"/>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>

                        <div className={"titleAndCardsContainer"}>
                            <div className={"guestMainPageTitleDiv"}>
                                <h3>Alle arrangementer</h3>
                            </div>
                            <div className={"eventCardsContainerBackground"}>
                                <div className={"guestEventCardsContainer"}>
                                    {this.state.events.map(event => (
                                        <GuestEventCard key={event.event_id} id={event.event_id} name = {event.name} description = {event.description} date={event.date}
                                                        place = {event.place} img_url = {event.img_url}/>))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            )
        }else{
            return(
                <div>
                    <div className={"titleAndCardsContainer"}>
                        <div className={"guestMainPageTitleDiv"}>
                            <h3>Alle arrangementer</h3>
                        </div>
                        <div className={"eventCardsContainerBackground"}>
                            <div className={"guestEventCardsContainer"}>
                                {this.state.events.map(event => (
                                    <GuestEventCard key={event.event_id} id={event.event_id} name = {event.name} description = {event.description} date={event.date}
                                                    place = {event.place} img_url = {event.img_url}/>))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    /**
     *
     * Formats string from DB to readable date.
     * @param backendDate
     * @return {string}
     */
    formatDate(backendDate) {
        let thisDate = new Date(backendDate);
        let year = thisDate.getFullYear();
        let month = thisDate.getMonth()+1;
        if(month < 10) month = "0" + month;
        let date = thisDate.getDate();
        if(date < 10) date = "0" + date;
        let hours = thisDate.getHours();
        if(hours < 10) hours = "0" + hours;
        let minutes = thisDate.getMinutes();
        if(minutes < 10) minutes = "0" + minutes;

        return date + "." + month + "." + year + " " + hours + ":" + minutes;
    }
}

export default GuestMainPage;
