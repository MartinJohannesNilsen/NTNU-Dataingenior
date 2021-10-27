import React, {Component} from 'react';
import Navbar from '../../Navbar/Navbar'
import "../../../css/EventPage.css"
import {eventService} from "../../../service/EventService";
import $ from 'jquery';
import Footer from '../../Footer/Footer'
import ToTop from '../../ToTop/ToTop'

var moment = require("moment");
moment().format();
let ipAdress = process.env.REACT_APP_HOSTNAME || "localhost";


export class event {
    constructor(event_id, name, date, description, place, artists, tech_rider, hospitality_rider, personnel, category_id, filed, pending, canceled, img_url){
        this.event_id = event_id;
        this.name = name;
        this.date = date;
        this.place = place;
        this.artists = artists;
        this.tech_rider = tech_rider;
        this.hospitality_rider = hospitality_rider;
        this.personnel = personnel;
        this.category_id = category_id;
        this.filed = filed;
        this.pending = pending;
        this.canceled = canceled;
        this.img_url = img_url;
        this.description = description;
    }
}

/**
 * EventPage component
 * @class EventPage
 */
class EventPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedEvents: [],
            shownEvents: [],
            length: 6
        };
        this.handleSearch = this.handleSearch.bind(this);
    }

    /**
     * The formatDate() function formats the backendDate we get from database to work with other functions in the eventPage
     * component and be more readable for Norwegian users.
     * @param backendDate
     * @returns {string}
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

    /**
     * getCurrentDate() creates a date object from which we get the current date down to minutes and returns it in the same
     * format as the return from the formatDate() function for comparison purposes.
     * @returns {string}
     */
    getCurrentDate() {
        let newDate = new Date();
        let date = newDate.getDate();
        if(date<10){
            date = "0" + date;
        }
        let month = newDate.getMonth()+1;
        if(month<10){
            month = "0" + month;
        }
        let year = newDate.getFullYear();
        let hours = newDate.getHours();
        if(hours<10){
            hours = "0" + hours;
        }
        let minutes = newDate.getMinutes();
        if(minutes<10){
            minutes = "0" + minutes;
        }
        return year + "-" + month + "-" + date + "T" + hours + ":" + minutes + ":00:000Z";
    }


    /**
     * eventFilterAllActive() calls a fetch from database through eventService, fetching all non-archived events. All fetched
     * events are placed in the loadedEvents array while shownEvents is assigned events that are not cancelled. This makes
     * sure only events that are being organized or are ready to be hosted will be shown when calling this function.
     */
    eventFilterAllActive() {
        eventService.getNonFiledEvents().then(events => this.setState({
            loadedEvents: events,
            shownEvents: events.filter(e => e.canceled !== 1)
        })).then(this.resetSortDropdown())
            .catch(error => console.error(error.message));
    }

    /**
     * eventFilterPending() calls a fetch from database through eventService, fetching all non-archived events. All events
     * are placed in the loadedEvents array while all events that are pending and not cancelled are placed in shownEvents.
     * Rendering shownEvents with these criteria displays events that are being organized.
     */
    eventFilterPending() {
        eventService.getNonFiledEvents().then(events => this.setState({
            loadedEvents: events,
            shownEvents: events.filter(e=> (e.date > this.getCurrentDate()) && e.pending === 1 && e.canceled !== 1)
        })).then(this.resetSortDropdown())
            .catch(error => console.error(error.message));
    }

    /**
     * eventFilterArchived() calls a fetch from database through eventService, fetching all archived events placing them
     * in both loadedEvents and shownEvents.
     */
    eventFilterArchived() {
        eventService.getAllArchived().then(events => this.setState({
            loadedEvents: events,
            shownEvents: events
        })).then(this.resetSortDropdown())
            .catch(error => console.error(error.message));
    }

    /**
     * eventFilterApproved() calls a fetch from database through eventService, fetching all non-archived events placing them
     * in loadedEvents while events that are not pending and not cancelled are placed in shownEvents. This will display
     * all events that are ready to be hosted.
     */
    eventFilterApproved() {
        eventService.getNonFiledEvents().then(events => this.setState({
            loadedEvents: events,
            shownEvents: events.filter(e => (e.date > this.getCurrentDate() && e.pending === 0 && e.canceled !== 1))
        })).then(this.resetSortDropdown())
            .catch(error => console.error(error.message));
    }

    /**
     * eventFilterCancelled() calls a fetch from database through eventService, fetching all cancelled events placing them
     * in both loadedEvents and shownEvents to display all cancelled events.
     */
    eventFilterCancelled() {
        eventService.getCancelled().then(events => this.setState({shownEvents: events, loadedEvents: events})).then(this.resetSortDropdown());
    }

    /**
     * sortByName() sorts events in shownEvents by name.
     */
    sortByName() {
        this.setState({ shownEvents: this.state.shownEvents.sort((a, b) => a.name.localeCompare(b.name)) })
    }

    /**
     * timeFromNow() compares the current date to the date of an event, returning a value greater than zero if the event is
     * still ahead in time, or less than zero if the date has passed.
     * Used to sort upcoming events by which is closer in time.
     * @param date
     * @param now
     * @returns {number}
     */
    timeFromNow(date, now) {
        const compareDate = new Date(date.date);

        return compareDate - now;
    }

    /**
     * sortByClosest() utilizes sortByDate() and timeFromNow() to sort events in shownEvents by which is closest in time,
     * filtering out events that are in the past.
     */
    sortByClosest() {
        const now = new Date();
        this.sortByDate();
        this.setState({ shownEvents: this.state.shownEvents.reverse().filter(a => this.timeFromNow(a, now) > 0) })
    }

    /**
     * sortByDate() sorts shownEvents to show events sorted chronologically, descending from the event furthest ahead in time.
     */
    sortByDate() {
        this.setState({ shownEvents: this.state.shownEvents.sort((a, b) => b.date.localeCompare(a.date)) })
    }

    /**
     * handleSearch() takes input from searchBar(). If there is input, shownEvents will be updated to show events that has some
     * string matching input from searchBar() and the page re-rendered.
     * If input is cleared handleSearch() will call componentDidMount(), re-rendering the page with all active events and sort/filter dropDowns reset to default values.
     */
    handleSearch() {
        const searchTitleElement = document.getElementById("searchBar");
        let searchTitle = searchTitleElement.value;
        if(searchTitle !== ""){
            this.setState({shownEvents: this.state.loadedEvents.filter(e => e.name.toLowerCase().includes(searchTitle.toLowerCase()) || e.description.toLowerCase().includes(searchTitle.toLowerCase()))});
        } else {
            this.resetSortAndFilterDropdowns();
            this.componentDidMount();
        }
    }

    /**
     * This function is used to reset sort and filter dropDowns to their default values.
     */
    resetSortAndFilterDropdowns() {
        $("#eventPageShow .btn:first-child ").text("Vis");
        $("#eventPageSort .btn:first-child ").text("Sorter etter");
    }

    /**
     * This function used to reset sort dropDown.
     */
    resetSortDropdown() {
        $("#eventPageSort .btn:first-child ").text("Sorter etter");
    }

    /**
     * componentDidMount() provides instructions to render() about what to do on initial mount and when called by handleSearch().
     */
    componentDidMount() {
        window.scrollTo(0,0);
        eventService.getNonFiledEvents().then(events => this.setState({
            loadedEvents: events,
            shownEvents: events.filter(e => e.canceled !== 1)
        }))
            .catch(error => console.error(error.message));
    }


    /**
     * Renders the component when called upon by index.js or triggered by a setState/componentDidMount call.
     * @returns {html}
     */

    render() {

        $(function() {
            $("#eventPageShow a").click(function() {
            $("#eventPageShow .btn:first-child ").text($(this).text());
        });
            $("#eventPageSort a").click(function() {
            $("#eventPageSort .btn:first-child ").text($(this).text());
        });
    });

        return (

            <div id="eventPagePage" className="pageSetup">
                <Navbar/>

                <ToTop />
                <div>
                    <div id="eventPageBackground">
                        <div id="eventPageContainer">
                            <div id="eventPageBanner">
                                <div id="eventPageTitle">
                                    <h1>ARRANGEMENTER</h1>
                                </div>
                            </div>
                            <div id="eventPageInfoContainer" className="eventPageInformation">
                            <div id="eventPageBar">
                                <div id="eventPageShow">
                                    <div className="dropdown">
                                        <button className="btn border-dark dropdown-toggle" type="button" id="dropdownMenuButton"
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Vis
                                        </button>
                                        <div className="dropdown-menu" id="eventPageFilter" aria-labelledby="dropdownMenuButton">

                                                <a className="dropdown-item" href="#/event" onClick={() => this.eventFilterAllActive()}>Alle aktive</a>
                                                <a className="dropdown-item" href="#/event" onClick={() => this.eventFilterPending()}>Under planlegging</a>
                                                <a className="dropdown-item" href="#/event" onClick={() => this.eventFilterApproved()}>Ferdig planlagte</a>
                                            <div className="dropdown-divider"/>
                                                <a className="dropdown-item" href="#/event" onClick={() => this.eventFilterArchived()}>Arkiverte</a>
                                                <a className="dropdown-item" href="#/event" onClick={() => this.eventFilterCancelled()}>Avlyste</a>

                                        </div>
                                    </div>
                                </div>
                                <div id="eventPageSort">
                                    <div className="dropdown">
                                        <button className="btn border-dark dropdown-toggle " type="button" id="dropdownMenuButton"
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Sorter etter
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">

                                            <a className="dropdown-item" href="#/event" onClick={() => this.sortByName()}>Navn</a>
                                            <div className="dropdown-divider"/>
                                            <span className="dropdown-item-text">Dato:</span>
                                            <div id="eventPageDDItems">
                                                <a className="dropdown-item" href="#/event" onClick={() => this.sortByClosest()}>Nærmest</a>
                                                <a className="dropdown-item" href="#/event" onClick={() => this.sortByDate()}>Lengst frem</a>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div id="eventPageSearchBarBox">
                                    <div id="eventPageSearchBar">
                                        <input className="form-control border-dark" type="text" placeholder="Søk" aria-label="Search" id="searchBar" onChange={() => this.handleSearch()}/>
                                    </div>
                                </div>
                            </div>
                            <div className="dropdown-divider border-dark"/>
                            <div id="eventPageEventTable">
                                {this.state.shownEvents.slice(0, this.state.length).map(event => (
                                    <div key = {event.event_id}>
                                        <EventCard event_id={event.event_id} name={event.name} img_url={event.img_url} description={event.description} date={this.formatDate(event.date)} compareDate={event.date} place={event.place} pending={event.pending} filed={event.filed} canceled={event.canceled}/>
                                    </div>
                                ))}

                            </div>
                            <div id="eventPageFetchMoreEventsButton">
                                {this.state.shownEvents.length > this.state.length &&
                                <div>
                                    <button type="button" className="btn btn-light"
                                            onClick={() => this.setState({length: this.state.length + 6})}>Last inn flere arrangementer
                                    </button>
                                </div>
                                }
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

/**
 * EventCard component
 * When called, builds the event cards for eventPage by using props.
 * @class EventCard
 */
class EventCard extends Component {

    render() {

        let color = this.getColor(this.props.canceled, this.props.pending, this.props.filed, this.props.compareDate);
        return (
            <div id="eventPageEventCardLink">
                <a href = {"#/event/" + this.props.event_id}>
                    <div className="card eventPageEventCard">
                            <img id="eventPageCardImg" className="card-img-top eventPageEventCardImg" src={"http://" + ipAdress + ":8080/image/" + this.props.img_url} alt={this.props.name} />

                            <div className="card-body" id="eventPageOuterCardBody">

                            <div id="eventPageCardBody" className="card-body">
                                <h5 className="card-title">{this.props.name}</h5>
                                <div id="eventPageStatus">

                                    <button className={"btn btn-outline-"+color+" btn-sm"}>Status: {this.getStatus(this.props.canceled, this.props.pending, this.props.filed,  this.props.compareDate)}</button>
                                </div>
                                <div id="eventPageCardLocation">
                                    {this.props.place}
                                </div>
                                <div id="eventPageCardDate">
                                    {this.props.date}
                                </div>
                            </div>
                            </div>
                    </div>
                </a>
            </div>
        )
    }


    /**
     * getStatus() is a function used to determine what state an event is currently in by looking at their pending and filed
     * status and planned date vs. current date.
     * @param canceled
     * @param pending
     * @param filed
     * @param date
     * @returns {string}
     */
    getStatus(canceled, pending, filed, date){
        let status;
        if(canceled === 1) {
            status = "Avlyst"
        }else if(pending === 1 && filed === 0) {
            status = "Til godkjenning";
        }
        else if(filed === 1 && pending === 0) {
            status = "Arkivert";
        }
        else if(filed === 1 && pending === 1) {
            status = "Ikke utført";
        }
        else if(pending === 0 && filed === 0 &&  date > this.getCurrentDate()) {
            status = "Kommende";
        } else {
            status = "Utført";
        }
        return status;
    }

    /**
     * getColor() is used to determine the outline color of the status marker in event cards by looking at pending and
     * filed statuses and the date relative to current date.
     * @param canceled
     * @param pending
     * @param filed
     * @param date
     * @returns {string}
     */
    getColor(canceled, pending, filed, date){
        let color;
        if(canceled === 1) {
            color = "danger"
        }else if(pending === 1 && filed === 0) {
            color = "warning";
        }
        else if(filed === 1 && pending === 0) {
            color = "secondary";
        }
        else if(pending === 0 && filed === 0 &&  date > this.getCurrentDate()) {
            color = "success";
        }
        else if(pending === 1 && filed === 1) {
            color = "primary";
        }else{
            color = "info";
        }
        return color;
    }

    /**
     * getCurrentDate() formats the date into a format we can use with out other functions.
     * @returns {string}
     */
    getCurrentDate() {
        let newDate = new Date();
        let date = newDate.getDate();
        if(date<10){
            date = "0" + date;
        }
        let month = newDate.getMonth()+1;
        if(month<10){
            month = "0" + month;
        }
        let year = newDate.getFullYear();
        let hours = newDate.getHours();
        if(hours<10){
            hours = "0" + hours;
        }
        let minutes = newDate.getMinutes();
        if(minutes<10){
            minutes = "0" + minutes;
        }
        return year + "-" + month + "-" + date + "T" + hours + ":" + minutes + ":00:000Z";
    }
}

export default EventPage;


