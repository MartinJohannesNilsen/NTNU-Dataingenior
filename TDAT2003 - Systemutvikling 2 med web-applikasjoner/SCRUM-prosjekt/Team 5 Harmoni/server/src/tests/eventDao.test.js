let mysql = require("mysql");
const EventDao = require("../dao/eventDao.js");
let runsqlfile = require("./runsqlfile.js");

// GitLab CI Pool
// GitLab CI Pool
let pool = mysql.createPool({
    connectionLimit: 1,
    host: "mysql",
    user: "root",
    password: "secret",
    database: "supertestdb",
    debug: false,
    multipleStatements: true
});

let eventDao = new EventDao(pool);

/**
 * test for: getEventById() in eventDao.js
 */
test("test: getEventById()", done =>{
    function callback(status, data) {
        console.log(
            "Test getEvent eventDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBe(1);
        expect(data[0].event_id).toBe(1);
        expect(data[0].name).toBe("the Donn party");
        done();
    }

    eventDao.getEventByID(1, callback);
});

/**
* test for: getAllEvents() in eventDao.js
*/
test("test: getAllEvents()", done =>{
    function callback(status, data) {
        console.log(
            "Test getAllEvents eventDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBeGreaterThanOrEqual(6);
        expect(data[0].event_id).toBe(2);
        done();
    }

    eventDao.getAllEvents(callback);
});

/**
 * test for: getAllArchived() in eventDao.js
 */
test("test: getAllArchived()", done =>{
    function callback2(status, data) {
        console.log(
            "Test getAllArchived eventDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data[0].filed).toBe(1);
        expect(data.length).toBeGreaterThanOrEqual(2);
        done();
    }

    function callback(){
        eventDao.getAllArchived(callback2);
    }

    eventDao.updateFiled(3,callback);

});

/**
 * test for: getNonFiledEvents() in eventDao.js
 */
test("test: getNonFiledEvents()", done =>{

    function callback(status, data){
        console.log(
            "Test getNonFiledEvents eventDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBeGreaterThanOrEqual(4);
        expect(data[0].name).toBe("Metallica metal");
        expect(data[1].filed).toBe(0);
        done();
    }

    eventDao.getNonFiledEvents(callback);
});

/**
 * test for: getAllActive() in eventDao.js
 */
test("test: getAllActive()", done =>{
    function callback(status, data) {
        console.log(
            "Test getAllActive eventDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data[0].pending).toBe(0);
        expect(data.length).toBeGreaterThanOrEqual(1);
        done();
    }
        eventDao.getAllActive(callback);
});

/**
 * test for: getAllCancelled() in eventDao.js
 */
test("test: getAllCancelled()", done =>{
    function callback2(status, data) {
        console.log(
            "Test getAllCancelled eventDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data[0].canceled).toBe(1);
        expect(data.length).toBeGreaterThanOrEqual(2);
        done();
    }

    function callback(status, data){
        eventDao.getAllCancelled(callback2);
    }

    eventDao.updateCancel(4,callback);
});


/**
 * test for: addEvent() in eventDao.js
 */
test("test: addEvent()", done =>{
    function callback2(status, data) {
        console.log(
            "Test addEvent eventDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data[0].filed).toBe(0);
        expect(data[0].name).toBe("Just added");
        done();
    }

    function callback(status, data){
        eventDao.getEventByID(data.insertId,callback2);
    }
    let event = {name : "Just added", date:  "2020-01-20 20:45:00",description:  "the DB test made this", place : "Sukkerhuset", categoryID: 1, artists : "Javascript, mysql, ci, nodeJs ", tech_rider:  "nintendo switch", hospitality_rider: "potato chips", personnel: "Team 5", img_url: "eagle.png", contract: "everyone agrees"};
    eventDao.addEvent(event, callback);
});

/**
 * test for: updateFiled() in eventDao.js
 */
test("test: updateFiled", done =>{
    function callback2(status, data) {
        console.log(
            "Test updateFiled eventDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data[0].filed).toBe(1);
        done();
    }

    function callback(){
        eventDao.getEventByID(2, callback2)
    }

    eventDao.updateFiled(2,callback);
});

/**
 * test for: updatePending() in eventDao.js
 */
test("test: updatePending", done =>{
    function callback2(status, data) {
        console.log(
            "Test updatePending eventDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data[0].pending).toBe(0);
        done();
    }

    function callback(){
        eventDao.getEventByID(2, callback2)
    }

    eventDao.updatePending(2,callback);
});

/**
 * test for: updateCancel() in eventDao.js
 */
test("test: updateCancel", done =>{
    function callback2(status, data) {
        console.log(
            "Test updateCancel eventDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data[0].canceled).toBe(1);
        done();
    }

    function callback(){
        eventDao.getEventByID(2, callback2)
    }

    eventDao.updateCancel(2,callback);
});

/**
 * test for: deleteEventDetails() in eventDao.js
 */
test("test: deleteEvent()", done =>{

    function callback2(status, data) {
        console.log(
            "Test deleteEvent eventDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.affectedRows).toBe(1);
        done();
    }

    function callback(status, data){
        eventDao.deleteEventDetails(8, dummy);
        eventDao.deleteEventComments(8, dummy);
        eventDao.deleteEvent(8, callback2);
    }
    // dummy function to send into query in dao.js, we do not want it to print extra or complicate our code
    function dummy(status, data){

    }

    let event = {name : "to be deleted", date:  "2020-01-20 20:45:00",description:  "the DB test made this to be deleted", place : "Sukkerhuset", artists : "Javascript, mysql, ci, nodeJs ", tech_rider:  "nintendo switch", hospitality_rider: "potato chips", personnel: "Team 5", img_url: "eagle.png", categoryID: 1};
    eventDao.addEvent(event, dummy);
    let contactInfo = {name: "hei sveis", phone: "00000000", email: "hwudijwdhwojndw@sohfsoidhjs.nckjw", eventID: 8};
    eventDao.addContactInfo(contactInfo, dummy);
    let ticket = {eventID: 8, ticketID: 3, amount: 20, price: 100};
    eventDao.addTicket(ticket, dummy);
    let comment = {eventID: 8, userID: 2, commentText: "testing testing 1 2 1 2 "};
    eventDao.addComment(comment, callback);
});


/**
 * test for: updateEvent() in eventDao.js
 */
test("test: updateEvent", done =>{
    function callback2(status, data) {
        console.log(
            "Test updateEvent eventDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data[0].name).toBe("oppdatert");
        expect(data[0].img_url).toBe("oppdatert.jpg");
        done();
    }

    function callback(){
        eventDao.getEventByID(7, callback2)
    }
    let event = {name: "oppdatert", description: "dette arrangementet er oppdatert", date: "2020-10-12 16:45:00", place: "Sukkerhuset", categoryID: 3, img_url: "oppdatert.jpg", artists: "ny og bedre..", tech_rider: "mere bedre", hospitality_rider: "oppgrader til vin", contract: "kontrakt", personnel: "flere folk"}
    eventDao.updateEvent(7, event, callback);
});
