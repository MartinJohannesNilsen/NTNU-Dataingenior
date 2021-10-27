import React, {Component} from 'react';
import "../../../css/AddEvent.css"
import {eventService} from "../../../service/EventService";
import {validatePhone, validateEmail, validateTickets, validateInput} from "../../../validaters";
import {toast} from 'react-toastify';
import Calendar from 'react-calendar'
import Navbar from '../../Navbar/Navbar'
import Footer from '../../Footer/Footer'
import {FileService} from "../../../service/FileService";
let ipAdress = process.env.REACT_APP_HOSTNAME || "localhost";

class EditEvent extends Component{
    /**
     * Setting up states for all input variables
     * @param {JSON} props
     */
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(), dateChosenHour: null, dateChosenMin: null,
            Name: "", Description: "", Place: "", Artists: "",
            ContactName: "", ContactPhone: "", ContactEmail: "", haveContactInfo: true,
            Tech: "", Hospitality: "", Personnel: "", Contract: "",
            Picture: "", Category: 1,
            GratisTicketBox: false, GratisTicketAmount: null, GratisTicketPrice: 0,
            StandardTicketBox: false, StandardTicketAmount: null, StandardTicketPrice: null,
            VIPTicketBox: false, VIPTicketAmount: null, VIPTicketPrice: null,
            EarlyBirdTicketBox: false, EarlyBirdTicketAmount: null, EarlyBirdTicketPrice: null,
            GoldenCircleTicketBox: false, GoldenCircleTicketAmount: null, GoldenCircleTicketPrice: null,
            Categories: [], Tickets: [],
            DateHour: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
            DateMin: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
            contractUploaded : false,
            personellUploaded : false,
            pictureUploaded : false,
            techUploaded : false,
            hospitalityUploaded : false
        };
        this.changeBox = this.changeBox.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.updateEventInfo = this.updateEventInfo.bind(this);
        this.updateTicketInfo = this.updateTicketInfo.bind(this);
        this.updateContactInfo = this.updateContactInfo.bind(this);
        this.registerEvent = this.registerEvent.bind(this);
    }

    /**
     * onChange function to change state variables
     * @param {SyntheticEvent} event
     */
    changeValue(event){
        this.setState({[event.target.id]: event.target.value})
    }

    /**
     * onChange function to change checkedbox state
     * @param {SyntheticEvent} event
     */
    changeBox(event) {
        this.setState({[event.target.id + "TicketBox"]: event.target.checked});
        if (this.state[event.target.id + "TicketBox"]){
            this.setState({[event.target.id + "TicketAmount"]: 0});
            this.setState({[event.target.id + "TicketPrice"]: 0});
        }
    }

    /**
     * onChange function to change date state from calendar
     * @param {SyntheticEvent} event
     */
    changeDate(event) {
        this.setState({date: event})
    }

    /**
     * Form validation that checks if the input is correctly filled
     * @returns {boolean} true if all correct fields are filled
     * @returns {boolean} false if inputs
     */
    formValidation(){
        return (validateInput(this.state.Name) && this.state.Description !== "" && validateInput(this.state.Place)
            && validateInput(this.state.Artists) && validateInput(this.state.ContactName) && validateInput(this.state.ContactEmail) && validateInput(this.state.ContactEmail) && this.ticketCheck());
    }

    /**
     * Form validation that checks if the date is forward in time
     * @returns {boolean} true if date is forward in time
     * @returns {boolean} false if date is backwards in time
     */
    checkDate(){
        let thisDate = this.state.date;
        thisDate.setHours(this.state.dateChosenHour);
        thisDate.setMinutes(this.state.dateChosenMin);

        return thisDate > new Date();
    }

    /**
     * Form validation that checks if the ticket info is correctly filled
     * @returns {boolean} true if ticket input is correct
     * @returns {boolean} false if ticket input is incorrect
     */
    ticketCheck(){
        let status = false;
        let belowZero = false;

        this.state.Tickets.map(ticket => {
            if(this.state[ticket.name + "TicketBox"]) {
                if (this.state[ticket.name + "TicketAmount"] > 0 && this.state[ticket.name + "TicketAmount"] !== null && this.state[ticket.name + "TicketPrice"] !== null) {
                    if (validateTickets(this.state[ticket.name + "TicketAmount"]) && validateTickets(this.state[ticket.name + "TicketPrice"])) {
                        status = true;
                    } else {
                        belowZero = true;
                    }
                } else {
                    belowZero = true;
                }
            }
        });

        if(!belowZero) {
            return status;
        }
        else return false;
    }

    /**
     * Pulling all info regarding the event from the database,
     * and filling the state with input info
     */
    componentDidMount() {
        window.scrollTo(0,0);
        eventService
            .getEventById(this.props.match.params.id)
            .then(data => this.updateEventInfo(data))
            .catch(Error => console.log(Error));

        eventService
            .getTicket()
            .then(data => this.setState({Tickets: data}))
            .catch(Error => console.log(Error));

        eventService
            .getCategories()
            .then(categories => this.setState({Categories: categories}))
            .catch(Error => console.log(Error));

        eventService
            .getContactinfoForEvent(this.props.match.params.id)
            .then(data => this.updateContactInfo(data))
            .catch(Error => console.log(Error));

        eventService
            .getTicketFromEvent(this.props.match.params.id)
            .then(data => this.updateTicketInfo(data))
            .catch(Error => console.log(Error));
    }

    /**
     * Notifying successful registration of event
     */
    notifySuccess = () => {
        toast("Registrering av arrangement vellykket", {type: toast.TYPE.SUCCESS, position: toast.POSITION.BOTTOM_LEFT});
    };

    /**
     * Notifying that something went wrong if input is invalid
     * @returns {ToastId}
     */
    notifyFailure = () => toast("Noe gikk galt", {type: toast.TYPE.ERROR, position: toast.POSITION.BOTTOM_LEFT});

    /**
     * Notifying the user need to change date to valid date
     * @returns {ToastId}
     */
    notifyDateFailure = () => toast("Du kan ikke velge et tidspunkt som ikke er fremover i tid", {type: toast.TYPE.ERROR, position: toast.POSITION.BOTTOM_LEFT});

    /**
     * Notifying that a file isnt uploaded
     * @returns {ToastId}
     */
    notifyNoFileUploaded = () => toast("Du må laste opp en fil", {type: toast.TYPE.ERROR, position: toast.POSITION.BOTTOM_LEFT});

    /**
     * Notifying successful file upload
     * @returns {ToastId}
     */
    notifyPictureUploaded = () => toast("Fil lastet opp. Trykk på lagre endringer for å lagre alt", {type: toast.TYPE.SUCCESS, position: toast.POSITION.BOTTOM_LEFT});

    /**
     * Notifying invalid phonenumber
     * @returns {ToastId}
     */
    notifyUnvalidPhone = () => toast("Ugyldig telefonnummer", {type: toast.TYPE.ERROR, position: toast.POSITION.BOTTOM_LEFT});

    /**
     * Notifying invalid email
     * @returns {ToastId}
     */
    notifyUnvalidEmail = () => toast("Ugyldig e-post", {type: toast.TYPE.ERROR, position: toast.POSITION.BOTTOM_LEFT});

    /**
     * Notifying that the file is too big
     * @returns {ToastId}
     */
    notifyTooBigFile = () => toast("En av filene du forsøkte å laste opp var for store", {type: toast.TYPE.ERROR, position: toast.POSITION.BOTTOM_LEFT});

    /**
     * Notifying that the ticket input is invalid
     * @returns {ToastId}
     */
    notifyTicketsError = () => toast("Du må fylle ut billettkategori med positive tall under 9 siffre", {type: toast.TYPE.ERROR, position: toast.POSITION.BOTTOM_LEFT});

    /**
     * Setting all states to data from database. Called in componentDidMount
     * @param {JSON} data - Data from database
     */
    updateEventInfo(data){
        let thisDate = new Date(data[0].date);
        let hour = thisDate.getHours();
        if(hour<10) hour = "0"+hour;
        let min = thisDate.getMinutes();
        if(hour<10) hour = "0" + min;

        this.setState({dateChosenHour: hour});
        this.setState({dateChosenMin: min});
        this.setState({date: thisDate});
        this.setState({Name: data[0].name});
        this.setState({Description: data[0].description});
        this.setState({Place: data[0].place});
        this.setState({Artists: data[0].artists});
        this.setState({Category: data[0].category_id});
        this.setState({Tech: data[0].tech_rider});
        this.setState({Hospitality: data[0].hospitality_rider});
        this.setState({Personnel: data[0].personnel});
        this.setState({Picture: data[0].img_url});
        this.setState({Contract: data[0].contract});

    }

    /**
     * Setting all ticket states to correct info from database. Called in componentDidMount
     * @param {JSON[]} data - Data from database
     */
    updateTicketInfo(data) {
        data.map(ticket => {
            eventService
                .getTicketById(ticket.ticket_category_id)
                .then(name => this.updateTicketAmount(name.name, ticket.number, ticket.price))
                .catch(Error => console.log(Error))
        })
    }

    /**
     * Setting all ticket states to correct info from database. Called in updateTicketInfo(data)
     * @param {String} name - name of ticket
     * @param {number} amount - amount of tickets for sale
     * @param {number} price - price of one ticket
     */
    updateTicketAmount(name, amount, price){
        this.setState({[name + "TicketBox"]: true});
        this.setState({[name + "TicketAmount"]: amount});
        this.setState({[name + "TicketPrice"]: price});
    }

    /**
     * Setting all contact info states to correct info from database. Called in componentDidMount
     * @param data
     */
    updateContactInfo(data){
        if(data === undefined){
            this.setState({haveContactInfo: false} )
        }
        else {
            this.setState({ContactName: data.name});
            this.setState({ContactPhone: data.phone});
            this.setState({ContactEmail: data.email});
        }
    }

    /**
     * Renders all input boxes pre-filled with the existing info regarding the event.
     * Button at bottom to update the event if validation remains correct.
     * @returns {*}
     */
    render() {
        return (
            <div>
                <Navbar/>
                <div id="EventInputContainer">
                    <h2 id ="EventInputHeader">Redigere arrangement</h2>
                    <div id = "EventInputFields">
                        <p id = "EventInputLabels">Navn på arrangementet:</p>
                        <input type="text"
                               className = "form-control"
                               id = "Name"
                               value={this.state.Name}
                               onChange={this.changeValue}
                        />
                    </div>

                    <div id ="EventInputFields">
                        <p id="EventInputLabels">Dato for arrangementet:</p>
                        <div id="EventInputCalendar">
                            <Calendar
                                value = {this.state.date}
                                onChange = {this.changeDate}
                            />
                        </div>
                    </div>

                    <div id = "EventInputFields">
                        <p id="EventInputLabels">Tidspunkt for arrangementet:</p>
                        <div id="EventDateInput">
                            <select className="form-control"
                                    id ="dateChosenHour"
                                    value={this.state.dateChosenHour}
                                    onChange={this.changeValue}
                            >
                                {this.state.DateHour.map(hour =>
                                    <option
                                        key={hour}
                                        value ={hour}
                                        defaultValue={hour}
                                    >
                                        {hour}
                                    </option>
                                )}
                            </select>
                            <select className="form-control"
                                    id ="dateChosenMin"
                                    value={this.state.dateChosenMin}
                                    onChange={this.changeValue}
                            >
                                {this.state.DateMin.map(min =>
                                    <option
                                        key={min}
                                        value ={min}
                                        defaultValue={min}
                                    >
                                        {min}
                                    </option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div id="EventInputFields">
                        <p id="EventInputLabels">Beskrivelse for arrangementet:</p>
                        <textarea rows="4"
                                  className="form-control"
                                  placeholder={this.state.Placeholder}
                                  id="Description"
                                  value={this.state.Description}
                                  onChange={this.changeValue}>
                        </textarea>
                    </div>
                    <div id="EventInputFields">
                        <p id="EventInputLabels">Sted for arrangementet:</p>
                        <input type="text"
                               className="form-control"
                               id="Place"
                               value ={this.state.Place}
                               onChange={this.changeValue}
                        />
                    </div>
                    <div id = "EventInputFields">
                        <p id = "EventInputLabels">Artister:</p>
                        <input type="text"
                               className = "form-control"
                               id = "Artists"
                               value ={this.state.Artists}
                               onChange={this.changeValue}
                        />
                    </div>
                    <div id="EventInputFields">
                        <p id="EventInputLabels">Kontaktinformasjon - navn:</p>
                        <input type="text"
                               className="form-control"
                               id="ContactName"
                               value ={this.state.ContactName}
                               onChange={this.changeValue}
                        />
                    </div>
                    <div id="EventInputFields">
                        <p id="EventInputLabels">Kontaktinformasjon - telefonnummer:</p>
                        <input type="text"
                               className="form-control"
                               id="ContactPhone"
                               value ={this.state.ContactPhone}
                               onChange={this.changeValue}
                        />
                    </div>
                    <div id="EventInputFields">
                        <p id="EventInputLabels">Kontaktinformasjon - email:</p>
                        <input type="text"
                               className="form-control"
                               id="ContactEmail"
                               value ={this.state.ContactEmail}
                               onChange={this.changeValue}
                        />
                    </div>
                    <div id = "EventInputFiles">
                        <div >
                            <p id = "EventInputLabels">Nåværende Tech Riders:</p>
                            <button id="eventViewInfoDownloadButtons" className="btn" disabled={this.state.Tech === ""}
                                    onClick={() => window.open("http://" + ipAdress + ":8080/image/" + this.state.Tech)}
                                    target="_blank"><i className="fa fa-download"></i> Last ned
                            </button>
                        </div>
                        <div>
                            <p id="EventInputLabels">Nye Tech Riders:</p>
                            <div id="EventNewFile">
                                <input type="file"
                                       className="form-control"
                                       placeholder={this.state.Placeholder}
                                       id="rider1Input"
                                       required={true}
                                       accept={"application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document,  text/plain, application/pdf"}
                                />
                                <button className={""} onClick={() => this.submitNewTechRider()}>Bekreft</button>
                            </div>
                        </div>
                    </div>

                    <div id="EventInputFiles">
                        <div >
                            <p id = "EventInputLabels">Nåværende Hospitality Riders:</p>
                            <button id="eventViewInfoDownloadButtons" className="btn" disabled={this.state.Hospitality === ""}
                                    onClick={() => window.open("http://" + ipAdress + ":8080/image/" + this.state.Hospitality)}
                                    target="_blank"><i className="fa fa-download"></i> Last ned
                            </button>
                        </div>
                        <div>
                            <p id="EventInputLabels">Nye Hospitality Riders:</p>
                            <div id="EventNewFile">
                                <input type="file"
                                       className="form-control"
                                       placeholder={this.state.Placeholder}
                                       id="rider2Input"
                                       required={true}
                                       accept={"application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document,  text/plain, application/pdf"}
                                />
                                <button type={"button"} className={""} onClick={() => this.submitNewHospitalityRider()}>Bekreft</button>
                            </div>
                        </div>
                    </div>

                    <div id="EventInputFiles">
                        <div >
                            <p id = "EventInputLabels">Nåværende Personnel:</p>
                            <button id="eventViewInfoDownloadButtons" className="btn" disabled={this.state.Personnel === ""}
                                    onClick={() => window.open("http://" + ipAdress + ":8080/image/" + this.state.Personnel)}
                                    target="_blank"><i className="fa fa-download"></i> Last ned
                            </button>
                        </div>
                        <div>
                            <p id="EventInputLabels">Nytt Personnel:</p>
                            <div id="EventNewFile">
                                <input type="file"
                                       className="form-control"
                                       placeholder={this.state.Placeholder}
                                       id="personellInput"
                                       required={true}
                                       accept={"application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document,  text/plain, application/pdf"}
                                />
                                <button type={"button"} className={""} onClick={() => this.submitNewPersonell()}>Bekreft</button>
                            </div>
                        </div>
                    </div>

                    <div id="EventInputFiles">
                        <div>
                            <p id = "EventInputLabels">Nåværende Kontrakt:</p>
                            <button id="eventViewInfoDownloadButtons" className="btn" disabled={this.state.Contract === ""}
                                    onClick={() => window.open("http://" + ipAdress + ":8080/image/" + this.state.Contract)}
                                    target="_blank"><i className="fa fa-download"></i> Last ned
                            </button>
                        </div>
                        <div>
                            <p id="EventInputLabels">Ny Kontrakt:</p>
                            <div id="EventNewFile">
                                <input type="file"
                                       className="form-control"
                                       placeholder={this.state.Placeholder}
                                       id="contractInput"
                                       required={true}
                                       accept={"application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document,  text/plain, application/pdf"}
                                />
                                <button type={"button"} className={""} onClick={() => this.submitNewContract()}>Bekreft</button>
                            </div>
                        </div>
                    </div>

                    <div id="EventInputFiles">
                        <div >
                            <p id = "EventInputLabels">Nåværende Bilde:</p>
                            <button id="eventViewInfoDownloadButtons" className="btn" disabled={this.state.Picture === ""}
                                    onClick={() => window.open("http://" + ipAdress + ":8080/image/" + this.state.Picture)}
                                    target="_blank"><i className="fa fa-download"></i> Last ned
                            </button>
                        </div>
                        <div>
                            <p id="EventInputLabels">Nytt Bilde:</p>
                            <div id="EventNewFile">
                                <input type="file"
                                       className="form-control"
                                       placeholder={this.state.Placeholder}
                                       id="imageInput"
                                       required={true}
                                       accept={"image/*"}
                                />
                                <button type={"button"} className={""} onClick={() => this.submitNewPicture()}>Bekreft</button>
                            </div>
                        </div>
                    </div>

                    <div id ="EventInputFields">
                        <p id = "EventInputLabels">Kategori for arrangementet:</p>
                        <select className ="form-control"
                                id ="Category"
                                value ={this.state.Category}
                                onChange={this.changeValue}
                        >
                            {this.state.Categories.map(category =>
                                <option
                                    value ={category.category_id}
                                    defaultValue={category.category_id}
                                >
                                    {category.name}
                                </option>
                            )};
                        </select>
                    </div>
                    <p id="EventInputTitle">Billettyper:</p>
                    <div id="EventInputTicketContainer">
                        <div id="EventInputTicketBoxes">
                            <div id="EventInputCheckboxes">
                                <div id="EventTicketInnerLabel">
                                    <label id="EventTicketLabels">{"Gratis billetter"}</label>
                                </div>
                                <div id="EventTicketInnerCheckbox">
                                    <input type="checkbox"
                                           id={"Gratis"}
                                           checked={this.state.GratisTicketBox}
                                           onChange={this.changeBox}
                                    />
                                </div>
                            </div>
                            <div id="EventTicketInput">
                                <div id="EventTicketAmount">
                                    <input type="number"
                                           id={"GratisTicketAmount"}
                                           className="form-control"
                                           placeholder={"Antall Gratis billetter"}
                                           value={this.state["GratisTicketAmount"]}
                                           disabled={!this.state["GratisTicketBox"]}
                                           onChange={this.changeValue}
                                    />
                                </div>
                                <div id="EventTicketPrice">
                                    <input type="number"
                                           id ={"GratisTicketPrice"}
                                           className="form-control"
                                           value = {0}
                                           disabled={true}
                                    />
                                </div>
                            </div>
                        </div>
                        {(this.state.Tickets.filter(tickets => (tickets.name !== "Gratis"))).map(tickets =>
                            <div id="EventInputTicketBoxes">
                                <div id="EventInputCheckboxes">
                                    <div id="EventTicketInnerLabel">
                                        <label id="EventTicketLabels">{tickets.name + " billetter"}</label>
                                    </div>
                                    <div id="EventTicketInnerCheckbox">
                                        <input type="checkbox"
                                               id={tickets.name}
                                               checked={this.state[tickets.name +"TicketBox"]}
                                               onChange={this.changeBox}
                                        />
                                    </div>
                                </div>
                                <div id="EventTicketInput">
                                    <div id="EventTicketAmount">
                                        <input type="number"
                                               id={tickets.name + "TicketAmount"}
                                               className="form-control"
                                               placeholder={"Antall " + tickets.name + " billetter"}
                                               value={this.state[tickets.name + "TicketAmount"]}
                                               disabled={!this.state[tickets.name + "TicketBox"]}
                                               onChange={this.changeValue}
                                        />
                                    </div>
                                    <div id="EventTicketPrice">
                                        <input type="number"
                                               id ={tickets.name + "TicketPrice"}
                                               className="form-control"
                                               placeholder={"Pris for " + tickets.name + " billetter" }
                                               value = {this.state[tickets.name + "TicketPrice"]}
                                               disabled={!this.state[tickets.name + "TicketBox"]}
                                               onChange={this.changeValue}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div id = "EventInputButton">
                        <button type="button"
                                className="btn btn-outline-primary btn-lg"
                                onClick={this.registerEvent}
                        >
                            Lagre endringer
                        </button>
                    </div>
                    <Footer/>
                </div>
            </div>
        );
    }

    /**
     * Uploading contract to server
     */
    submitNewContract() {
        let fileService = new FileService();
        let fileContract = document.getElementById("contractInput");

        if (fileContract.files[0] !== undefined) {
            if (fileContract.files[0].size > 10000000) {
                this.notifyTooBigFile();
            } else {
                fileService.uploadFile(fileContract.files[0])
                    .then((res) => {
                        this.setState({
                            Contract : res.data.filePath.filename
                        });
                        this.notifyPictureUploaded();

                    })
                    .catch((err) => {
                        this.notifyNoFileUploaded();
                        console.error(err);
                    })
            }
        } else {
            this.notifyNoFileUploaded();
        }
    }

    /**
     * Uploading tech rider to server
     */
    submitNewTechRider() {
        let fileService = new FileService();
        let fileRider1 = document.getElementById("rider1Input");

        if (fileRider1.files[0] !== undefined) {
            if (fileRider1.files[0].size > 10000000) {
                this.notifyTooBigFile();
            } else {
                fileService.uploadFile(fileRider1.files[0])
                    .then((res) => {
                        this.setState({
                            Tech : res.data.filePath.filename
                        });
                        this.notifyPictureUploaded();

                    })
                    .catch((err) => {
                        console.error(err);
                        this.notifyNoFileUploaded();
                    })
            }
        } else {
            this.notifyNoFileUploaded();
        }
    }

    /**
     * Uploading hospitality rider to server
     */
    submitNewHospitalityRider() {
        let fileService = new FileService();
        let fileRider2 = document.getElementById("rider2Input");

        if (fileRider2.files[0] !== undefined) {
            if (fileRider2.files[0].size > 10000000) {
                this.notifyTooBigFile();
            } else {
                fileService.uploadFile(fileRider2.files[0])
                    .then((res) => {
                        this.setState({
                            Hospitality : res.data.filePath.filename
                        });
                        this.notifyPictureUploaded();

                    })
                    .catch((err) => {
                        console.error(err);
                        this.notifyNoFileUploaded();
                    })
            }
        } else {
            this.notifyNoFileUploaded();
        }
    }

    /**
     * Uploading personnel to server
     */
    submitNewPersonell() {
        let fileService = new FileService();
        let filePersonell = document.getElementById("personellInput");

        if (filePersonell.files[0] !== undefined) {
            if (filePersonell.files[0].size > 10000000) {
                this.notifyTooBigFile();
            } else {
                fileService.uploadFile(filePersonell.files[0])
                    .then((res) => {
                        this.setState({
                            Personnel : res.data.filePath.filename
                        });
                        this.notifyPictureUploaded();

                    })
                    .catch((err) => {
                        console.error(err);
                        this.notifyNoFileUploaded();
                    })
            }
        } else {
            this.notifyNoFileUploaded();
        }
    }

    /**
     * Uploading picture to server
     */
    submitNewPicture() {
        let fileService = new FileService();
        let image = document.getElementById("imageInput");

        if (image.files[0] !== undefined) {
            if (image.files[0].size > 10000000) {
                this.notifyTooBigFile();
            } else {
                fileService.uploadImage(image.files[0])
                    .then((res) => {
                        this.setState({
                            Picture : res.data.filePath.filename
                        });
                        this.notifyPictureUploaded();
                    })
                    .catch((err) => {
                        console.error(err);
                        this.notifyNoFileUploaded();
                    })
            }
        } else {
            this.notifyNoFileUploaded();
        }
    }

    /**
     * Updates the event to the database if all input remains valid
     */
    registerEvent(){
        if(this.formValidation() && this.checkDate()){
            if (!(validateEmail(this.state.ContactEmail))) {
                this.notifyUnvalidEmail();
            } else if (!(validatePhone(this.state.ContactPhone))) {
                this.notifyUnvalidPhone();
            } else {
                console.log(this.state);

                let day = this.state.date.getDate();
                let month = this.state.date.getMonth() + 1;
                let year = this.state.date.getFullYear();
                let hour = this.state.dateChosenHour;
                let min = this.state.dateChosenMin;
                if (day < 10) {
                    day = "0" + day
                }
                if (month < 10) {
                    month = "0" + month
                }
                let date = year + "-" + month + "-" + day + " " + hour + ":" + min + ":00";

                eventService
                    .updateEvent(this.props.match.params.id, this.state.Name, date, this.state.Description, this.state.Place, this.state.Category, this.state.Artists, this.state.Tech, this.state.Hospitality, this.state.Personnel, this.state.Picture, this.state.Contract)
                    .catch(Error => console.log(Error));

                eventService
                    .deleteTicketsForEvent(this.props.match.params.id)
                    .then(() => this.updateById(this.props.match.params.id))
                    .catch(Error => console.log(Error));

                this.notifySuccess();
            }
        } else if (!this.ticketCheck()) {
            this.notifyTicketsError();
        }
        else{
            if(!this.checkDate()){
                this.notifyDateFailure();
            }
            else{
                this.notifyFailure();
            }
        }
    }

    /**
     * Using the given eventId to update tables with eventId as foreign key
     * @param {number} EventId - eventId connected to event
     */
    updateById(eventID){
        this.state.Tickets.map(ticket =>{
            if(this.state[ticket.name + "TicketBox"]){
                if(this.state[ticket.name + "TicketAmount"] != null && this.state[ticket.name + "TicketAmount"] > 0){
                    eventService
                        .addTicket(ticket.ticket_category_id, eventID, this.state[ticket.name + "TicketAmount"], this.state[ticket.name + "TicketPrice"])
                        .catch(Error => console.log(Error))
                }
            }
        });
        if(this.state.haveContactInfo) {
            eventService
                .updateContactInfo(this.state.ContactName, this.state.ContactPhone, this.state.ContactEmail, eventID)
                .then(() => window.location.href = "#/event/" + this.props.match.params.id)
                .catch(Error => console.log(Error));
        }
        else{
            eventService
                .addContactInfo(this.state.ContactName, this.state.ContactPhone, this.state.ContactEmail, eventID)
                .then(() => window.location.href = "#/event/" + this.props.match.params.id)
                .catch(Error => console.log(Error))
        }
    }
}

export default EditEvent;