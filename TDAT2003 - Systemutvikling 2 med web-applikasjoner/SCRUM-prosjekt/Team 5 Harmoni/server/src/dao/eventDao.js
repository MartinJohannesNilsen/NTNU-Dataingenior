const Dao = require("./dao.js");


/** 
 * Data access object for admin functionality and actions
 * @module eventDao
 */
module.exports = class adminDao extends Dao{

    /**
     * @function getAllEvents
     */
    getAllEvents(callback){
        super.query(" SELECT * FROM Event ORDER BY date", [], callback);
    }

    /** 
     * Get all events marked as archived 
     * @function getAllArchived
     */
    getAllArchived(callback){
        super.query(" SELECT * FROM Event WHERE filed = 1 ORDER BY date", [], callback);
    }

    /**
     * Get all events marked as active
     * @function getAllActive
     */
    getAllActive(callback){
        super.query(
            "Select * FROM Event WHERE pending = 0 and filed = 0 and canceled = 0 and date > now() ORDER BY date ",
            [],
            callback
        );
    }

    /**
     * Get all events marked as not filed
     * @function getNonFiledEvents
     */
    getNonFiledEvents(callback){
        super.query(" SELECT * FROM Event WHERE filed = 0 ORDER BY date", [], callback);
    }

    /**
     * Get all events marked as cancelled
     * @function getAllCancelled
     */
    getAllCancelled(callback){
        super.query("SELECT * FROM Event WHERE canceled = 1 ORDER BY date", [], callback);
    }

    /**
     * @function getEventByID
     * @param {int} eventID
     */
    getEventByID(eventID, callback){
        super.query("SELECT Event.event_id, Event.category_id, Event.name, Event.description, Event.date, Event.place, Event.img_url, Event.artists, Event.tech_rider, Event.hospitality_rider, Event.contract, Event.personnel, Event.filed, Event.pending, Event.canceled, Category.name as category_name FROM Event left join Category on Event.category_id= Category.category_id WHERE Event.event_id=?", [eventID], callback);
    }

    /**
     * Insert new event with given attributes
     * @function addEvent
     * @param {Object} event - Event object containing all event attributes
     */
    addEvent(event, callback){
        super.query("INSERT INTO Event(name, description, date, place, category_id, img_url, artists, tech_rider, hospitality_rider, personnel, contract) VALUES (?,?,?,?,?,?,?,?,?,?,?)", [event.name, event.description, event.date, event.place, event.categoryID, event.img_url, event.artists, event.tech_rider, event.hospitality_rider, event.personnel, event.contract], callback)
    }

    /**
     * @function getCategories
     */
    getCategories(callback){
        super.query("SELECT * FROM Category", [], callback);
    }

    /**
     * @function getTicket
     */
    getTicket(callback){
        super.query("SELECT * FROM Ticket_Category", [], callback)
    }

    /**
     * Add specified ticket type and amount for the desired event
     * @function addTicket
     * @param {Object} ticket - Ticket object containing id, price and amount
     */
    addTicket(ticket, callback){
        super.query("INSERT INTO Event_Ticket(event_id, ticket_category_id, price, number) VALUES (?, ?, ?, ?)", [ticket.eventID, ticket.ticketID, ticket.price, ticket.amount], callback)
    }

    /**
     * Delete all comments relating to specified event
     * @function deleteEventComments
     */
    deleteEventComments(eventID, callback){
        super.query("DELETE FROM Comment WHERE event_id = ?", [eventID], callback);
    }

    /**
     * Delete details (contact info and tickets) from specified event
     * @function deleteEventDetails
     */
    deleteEventDetails(eventID, callback){
        super.query("DELETE FROM Contact_Info WHERE event_id = ?", [eventID], callback);
        super.query("DELETE FROM Event_Ticket WHERE event_id = ?", [eventID], callback2);
    }

    /**
     * @function deleteEvent
     * @param {int} eventID
     */
    deleteEvent(eventID, callback){
        super.query("DELETE FROM Event WHERE event_id = ?", [eventID], callback)
    }

    /**
     * Add contact info for a person relating to specified event
     * @function addContactInfo
     * @param {Object} contactInfo - Contact info containing credentials and the id for the desired event
     */
    addContactInfo(contactInfo, callback){
        super.query("INSERT INTO Contact_Info(name, phone, email, event_id) VALUES (?, ?, ?, ?)", [contactInfo.name, contactInfo.phone, contactInfo.email, contactInfo.eventID], callback)
    }

    /**
     * Updates filed status to true for specified event
     * @function updateFiled
     * @param {int} eventID
     */
    updateFiled(eventID, callback){
        console.log("EVENT " + eventID[0]);
        super.query("UPDATE Event SET filed = 1 WHERE event_id = ?", [eventID], callback)
    }

    /**
     * Updates pending status to false for specified event
     * @function updatePending
     * @param {int} eventID
     */
    updatePending(eventID, callback){
        super.query("UPDATE Event SET pending = 0 WHERE event_id = ?", [eventID], callback)
    }

    /**
     * Updates the cancelled status of specified event to true
     * @function updateCancel
     * @param {int} eventID
     */
    updateCancel(eventID, callback){
        super.query("UPDATE Event SET canceled = 1 WHERE event_id = ?", [eventID], callback)
    }

    /**
     * Get category of specified event
     * @function getCategoryFromEvent
     * @param {int} eventID
     * @returns {Object} - Returns object containing the category of the specified event
     */
    getCategoryFromEvent(eventID, callback){
        super.query("SELECT category_id FROM Event WHERE event_id = ?", [eventID], callback)
    }

    /**
     * @function getContactInfoForEvent
     * @param {int} eventID
     */
    getContactInfoForEvent(eventID, callback){
        super.query("SELECT * FROM Contact_Info WHERE event_id = ?", [eventID], callback)
    }

    /**
     * Retrieves name of ticket category specified by id
     * @function getTicketById
     * @param {int} ticketID
     */
    getTicketById(ticketID, callback){
        super.query("SELECT name FROM Ticket_Category WHERE ticket_category_id = ?", [ticketID], callback)
    }

    /**
     * Retrieve all tickets related to specified event
     * @function getTicketFromEvent
     * @param {int} eventID
     * @returns {Object} - Returns an object containing ticket types and the amount of each ticket type relating to the event
     */
    getTicketFromEvent(eventID, callback){
        super.query("SELECT event_id, Event_Ticket.ticket_category_id, price, number, name FROM Event_Ticket left join Ticket_Category on Event_Ticket.ticket_category_id = Ticket_Category.ticket_category_id WHERE event_id = ? order by price asc", [eventID], callback)
    }

    /**
     * Update event with specified id and attributes
     * @function updateEvent
     * @param {int} eventID
     * @param {Object} eventInfo - Object containing event attributes
     */
    updateEvent(eventID, eventInfo, callback){
        super.query("UPDATE Event SET name = ?, description = ?, date = ?, place = ?, category_id = ?, img_url = ?, artists = ?, tech_rider = ?, hospitality_rider = ?, contract = ?, personnel = ? WHERE event_id = ?", [eventInfo.name, eventInfo.description, eventInfo.date, eventInfo.place, eventInfo.categoryID, eventInfo.img_url, eventInfo.artists, eventInfo.tech_rider, eventInfo.hospitality_rider, eventInfo.contract, eventInfo.personnel, eventID], callback)
    }

    /**
     * Updates contact info relating to specified event
     * @function updateContactInfo
     * @param {int} eventID
     * @param {Object} contactInfo - Object containing contact info
     */
    updateContactInfo(eventID, contactInfo, callback){
        super.query("UPDATE Contact_Info SET name = ?, phone = ?, email = ? WHERE event_id = ?", [contactInfo.name, contactInfo.phone, contactInfo.email, eventID], callback)
    }

    /**
     * @function deleteTicketsForEvent
     * @param {int} eventID
     */
    deleteTicketsForEvent(eventID, callback){
        super.query("DELETE FROM Event_Ticket WHERE event_id = ?", [eventID], callback)
    }

    /**
     * Retrieves all comments relating to specified event
     * @function getComments
     * @param {int} eventID
     * @returns {Object} - Returns object containing array of all comments
     */
    getComments(eventID, callback){
        super.query("select name, comment, date from Comment left join User on User.user_id = Comment.user_id where event_id = ? order by date ASC",[eventID],callback)
    }

    /**
     * Add comment to specified event
     * @function addComment
     * @param {Object} comment - Object containing comment id, event id and comment data
     */
    addComment(comment, callback){
        super.query("insert into Comment (event_id, user_id, comment, date) values (?,?,?, now())", [comment.eventID, comment.userID, comment.commentText], callback);
    }
};

function callback2(){

}