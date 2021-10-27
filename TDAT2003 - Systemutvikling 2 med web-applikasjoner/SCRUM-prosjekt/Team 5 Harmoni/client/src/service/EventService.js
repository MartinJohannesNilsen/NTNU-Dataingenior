import axios from 'axios';
import {authenticationHeader} from "./auth";
let ipAdress = process.env.REACT_APP_HOSTNAME || "localhost";

/**
 * Event
 */
export class event {
    /**
     * 
     * @param {string} name 
     * @param {string} date 
     * @param {string} description 
     * @param {string} place 
     * @param {number} category_id 
     * @param {string} artists 
     * @param {file} tech_rider 
     * @param {file} hospitality_rider 
     * @param {file} personnel 
     * @param {string} img_url 
     * @param {file} contract 
     */
    constructor(name, date, description, place, category_id, artists, tech_rider, hospitality_rider, personnel, img_url, contract){
        this.name = name;
        this.date = date;
        this.place = place;
        this.category_id = category_id;
        this.artists = artists;
        this.tech_rider = tech_rider;
        this.hospitality_rider = hospitality_rider;
        this.personnel = personnel;
        this.img_url = img_url;
        this.description = description;
        this.contract = contract;
    }
}
/**
 * Event service
 */

class EventService{
    /**
     * 
     * @param {file} file 
     */
    uploadImage(file) {
        return axios.post("http://" + ipAdress + ":8080/filesUpload", file);
    }

    /**
     * 
     * @param {string} name 
     * @param {string} date 
     * @param {string} description 
     * @param {string} place 
     * @param {number} categoryID 
     * @param {string} artists 
     * @param {file} tech_rider 
     * @param {file} hospitality_rider 
     * @param {file} personnel 
     * @param {string} img_url 
     * @param {file} contract 
     */
    addEvents(name, date, description, place, categoryID, artists, tech_rider, hospitality_rider, personnel, img_url, contract){
        let newEvent = {name: name, date: date, description: description, place: place, categoryID: categoryID, artists: artists, tech_rider: tech_rider, hospitality_rider: hospitality_rider, personnel: personnel, img_url: img_url, contract: contract};
        console.log("Trying to add event");
        return axios.post("http://" + ipAdress + ":8080/event", newEvent, {headers: authenticationHeader()}).then(response => response.data);
    }
    /**
     * 
     */
    getAllEvents(){
        return axios.get("http://" + ipAdress + ":8080/event/all").then(response => response.data);
    }

    getAllArchived(){
        return axios.get("http://" + ipAdress + ":8080/event/archived", {headers: authenticationHeader()}).then(response => response.data);
    }

    getCancelled(){
        return axios.get("http://" + ipAdress + ":8080/event/cancelled", {headers: authenticationHeader()}).then(response => response.data);
    }

    getAllActive(){
        return axios.get("http://" + ipAdress + ":8080/event/active", {headers: authenticationHeader()}).then(response => response.data);
    }

    getNonFiledEvents(){
        return axios.get("http://" + ipAdress + ":8080/event/nonfiled", {headers: authenticationHeader()}).then(response => response.data);
    }
    /**
     * 
     * @param {number} eventID 
     */
    getEventById(eventID){
        return axios.get("http://" + ipAdress + ":8080/event/" + eventID, {headers: authenticationHeader()}).then(response => response.data);
    }
    /**
     * 
     * @param {number} eventID 
     */
    deleteEvent(eventID){
        console.log("Inne i delete metode");
        return axios.delete("http://" + ipAdress + ":8080/event/" + eventID, {headers: authenticationHeader()}).then(response => response.data);
    }

    deleteEventComments(eventID){
        console.log("Inne i delete metode");
        return axios.delete("http://" + ipAdress + ":8080/event/" + eventID + "/comments", {headers: authenticationHeader()}).then(response => response.data);
    }

    deleteEventDetails(eventID){
        console.log("Inne i delete metode");
        return axios.delete("http://" + ipAdress + ":8080/event/" + eventID + "/details", {headers: authenticationHeader()}).then(response => response.data);
    }

    getCategories(){
        return axios.get("http://" + ipAdress + ":8080/categories", {headers: authenticationHeader()}).then(response => response.data);
    }

    getTicket(){
        return axios.get("http://" + ipAdress + ":8080/tickets", {headers: authenticationHeader()}).then(response => response.data);
    }
    /**
     * 
     * @param {number} ticketID 
     * @param {number} eventID 
     * @param {number} amount 
     * @param {number} price
     */
    addTicket(ticketID, eventID, amount, price){
        let newTicket = {ticketID: ticketID, eventID: eventID, amount: amount, price: price};
        return axios.post("http://" + ipAdress + ":8080/tickets", newTicket, {headers: authenticationHeader()}).then(response => response.data)
    }
    /**
     * 
     * @param {string} name 
     * @param {number} phone 
     * @param {string} email 
     * @param {number} eventID 
     */
    addContactInfo(name, phone, email, eventID){
        let newContactInfo = {name: name, phone: phone, email: email, eventID: eventID};
        return axios.post("http://" + ipAdress + ":8080/contactinfo", newContactInfo, {headers: authenticationHeader()}).then(response => response.data)
    }
    /**
     * 
     * @param {number} eventID 
     */
    updateFiled(eventID){
        console.log(eventID + "!!!");
        return axios.put("http://" + ipAdress + ":8080/event/" + eventID + "/archived", eventID, {headers: authenticationHeader()}).then(response => response.data);
    }
    /**
     * 
     * @param {number} eventID 
     */
    updatePending(eventID){
        console.log(eventID + "!!!");
        return axios.put("http://" + ipAdress + ":8080/event/" + eventID + "/pending", eventID, {headers: authenticationHeader()}).then(response => response.data);
    }
    /**
     * 
     * @param {number} eventID 
     */
    updateCancel(eventID){
        console.log("Er i event service");
        return axios.put("http://" + ipAdress + ":8080/event/" + eventID + "/cancel", eventID, {headers: authenticationHeader()}).then(response => response.data);
    }
    /**
     * 
     * @param {number} eventID 
     */
    getCategoryFromEvent(eventID){
        return axios.get("http://" + ipAdress + ":8080/category/" + eventID, {headers: authenticationHeader()}).then(response => response.data[0]);
    }
    /**
     * 
     * @param {number} eventID 
     */
    getContactinfoForEvent(eventID){
        return axios.get("http://" + ipAdress + ":8080/contactinfo/" + eventID, {headers: authenticationHeader()}).then(response => response.data[0]);
    }
    /**
     * 
     * @param {number} eventID 
     */
    getContactinfoForEventV2(eventID){
        return axios.get("http://" + ipAdress + ":8080/contactinfo/" + eventID).then(response => response.data[0]);
    }
    /**
     * 
     * @param {number} ticketID 
     */
    getTicketById(ticketID){
        return axios.get("http://" + ipAdress + ":8080/tickets/" + ticketID, {headers: authenticationHeader()}).then(response => response.data[0]);
    }
    /**
     * 
     * @param {number} eventID 
     */
    getTicketFromEvent(eventID){
        return axios.get("http://" + ipAdress + ":8080/event/tickets/" + eventID, {headers: authenticationHeader()}).then(response => response.data);
    }
    /**
     * 
     * @param {number} eventID 
     * @param {string} name 
     * @param {string} date 
     * @param {string} description 
     * @param {string} place 
     * @param {number} categoryID 
     * @param {string} artists 
     * @param {file} tech_rider 
     * @param {file} hospitality_rider 
     * @param {file} personnel 
     * @param {string} img_url 
     * @param {file} contract 
     */
    updateEvent(eventID, name, date, description, place, categoryID, artists, tech_rider, hospitality_rider, personnel, img_url, contract){
        let eventInfo = {name: name, date: date, description: description, place: place, categoryID: categoryID, artists: artists, tech_rider: tech_rider, hospitality_rider: hospitality_rider, personnel: personnel, img_url: img_url, contract: contract};
        return axios.put("http://" + ipAdress + ":8080/event/" + eventID + "/edit", eventInfo, {headers: authenticationHeader()}).then(response => response.data)
    }
    /**
     * 
     * @param {string} name 
     * @param {number} phone 
     * @param {string} email 
     * @param {number} eventID 
     */
    updateContactInfo(name, phone, email, eventID){
        let contactInfo = {name: name, phone: phone, email: email};
        return axios.put("http://" + ipAdress + ":8080/event/contactinfo/" + eventID, contactInfo, {headers: authenticationHeader()}).then(response => response.data)
    }
    /**
     * 
     * @param {number} eventID 
     */
    deleteTicketsForEvent(eventID){
        return axios.delete("http://" + ipAdress + ":8080/event/tickets/" + eventID, {headers: authenticationHeader()}).then(response => response.data)
    }
    /**
     * 
     * @param {number} eventID 
     * @param {number} userID 
     * @param {string} commentText 
     */
    addComment(eventID, userID, commentText){
        let comment = {eventID: eventID, userID: userID, commentText: commentText};
        return axios.post("http://" + ipAdress + ":8080/event/comments", comment, {headers: authenticationHeader()}).then(response => response.data)
    }
    /**
     * 
     * @param {number} eventID 
     */
    getComments(eventID){
        return axios.get("http://" + ipAdress + ":8080/event/comments/" + eventID, {headers: authenticationHeader()}).then(response => response.data)
    }
}

export let eventService = new EventService();
