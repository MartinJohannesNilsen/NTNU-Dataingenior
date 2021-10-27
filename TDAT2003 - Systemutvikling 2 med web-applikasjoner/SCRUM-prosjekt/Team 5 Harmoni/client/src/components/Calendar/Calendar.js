import listPlugin from '@fullcalendar/list';
import * as React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import '../../css/Calendar.css';
import { createHashHistory } from 'history';
import './main.scss'
import NavbarMainPage from "../Navbar/NavbarMainPage";
import {eventService} from "../../service/EventService";
import {confirmAlert} from "react-confirm-alert";
import Footer from "../Footer/Footer";
import {auth, authenticate} from "../../service/auth.js";
import Navbar from "../Navbar/Navbar";

const history = createHashHistory();

/**
 * @class Calendar
 */
class Calendar extends React.Component {
    check;
    size;

    /**
     * Sets the state of an event array to be empty
     * @param {json} props 
     */
    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }

    /**
     * authenticate() runs to see if the user is logged in
     * if / else sets a check variable true if they are logged in and false if are not
     * Variable list is made empty
     * Every active event (has been approved and is upcoming) are picked up from the database
     * The data we want from the database are filtered out and pushed to the list variable
     * the state are set to be everything that is on the list variable
     */
    componentDidMount() {
        authenticate();
        if (auth.authenticated) {
            this.check = true;
        }else{

            this.check = false;
        }
        let list = [];
        eventService.getAllActive().then(events => {
            events.map(item => list.push({id: item.event_id, title: item.name, date: this.formatDate(item.date)}))
            this.setState({
                    events: list
                }
            )}).catch(error => console.error(error.message));
    }

    /**
     * the date are returned in the format year-month-date
     * @param {date} backendDate - Date from backend
     * @returns {*}
     */
    formatDate(backendDate) {
        let thisDate = new Date(backendDate);

        let year = thisDate.getFullYear();
        let month = thisDate.getMonth()+1;
        if(month < 10) month = "0" + month;
        let date = thisDate.getDate();
        if(date < 10) date = "0" + date;

        return year + "-" + month + "-" + date;
    }

    /**
     * variable size is set to the inner width of the window
     * variable def is changed if size is bigger than 800 px
     * the return() methods vary on if the user is logged in or not
     * the calendar is a pre-made react component
     * the def variable decides the outlook of the calendar based on the screen width with defaultValue
     * the events in the calendar are the one set in the state
     * @returns {*}
     */
    render() {
        this.size = window.innerWidth;
        let def;
        if(this.size > 800){
            def = "dayGridMonth";
        }else{
            def = "listWeek";
        }

        if(this.check){
            return (
                <div>
                    <Navbar/>
                    <div id="CalendarShowDiv">
                        <FullCalendar
                            id="fullCalendar"
                            defaultView={def}
                            plugins={[listPlugin , dayGridPlugin, interactionPlugin]}
                            header={{
                                left: 'prev,next today',
                                center: 'title',
                                right: ''
                            }}
                            eventLimit={true}
                            events={this.state.events}
                            eventClick={function (calEvent) {
                                confirmAlert({
                                    title: calEvent.event._def.title,
                                    buttons: [
                                        {
                                            label: 'Se arrangement',
                                            onClick: () => history.push("/event/public/" + calEvent.event._def.publicId)
                                        },
                                        {
                                            label: 'Se redigerbart arrangement',
                                            onClick: () => history.push("/event/" + calEvent.event._def.publicId)
                                        },
                                        {
                                            label: 'Avslutt'
                                        }
                                    ]
                                });
                            }}
                        />
                    </div>
                    <Footer/>
                </div>
            )
        }else{
            return(
            <div>
                <NavbarMainPage/>
                <div id="CalendarShowDiv">
                    <FullCalendar
                        id="fullCalendar"
                        defaultView={def}
                        plugins={[listPlugin , dayGridPlugin, interactionPlugin]}
                        header={{
                            left: 'prev,next today',
                            center: 'title',
                            right: ''
                        }}
                        eventLimit={true}
                        events={this.state.events}
                        eventClick={function (calEvent) {
                            confirmAlert({
                                title: calEvent.event._def.title,
                                buttons: [
                                    {
                                        label: 'Se arrangement',
                                        onClick: () => history.push("/event/public/" + calEvent.event._def.publicId)
                                    },
                                    {
                                        label: 'Avslutt'
                                    }
                                ]
                            });
                        }}
                    />
                </div>
                <Footer/>
            </div>
            )
        }
    }
}

export default Calendar;


