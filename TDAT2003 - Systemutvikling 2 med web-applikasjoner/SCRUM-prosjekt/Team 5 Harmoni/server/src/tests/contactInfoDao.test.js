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
 * test for: addContactInfo() in eventDao.js
 */
test("test: addContactInfo()", done =>{
    function callback(status, data){
        console.log(
            "Test addContactInfo eventDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.affectedRows).toBe(1);
        done();
    }

    let contactInfo = {name: "hei sveis", phone: "00000000", email: "hwudijwdhwojndw@sohfsoidhjs.nckjw", eventID: 1};
    eventDao.addContactInfo(contactInfo, callback);
});

/**
 * test for: getContactInfo() in eventDao.js
 */
test("test: getContactInfoForEvent()", done =>{
    function callback(status, data){
        console.log(
            "Test getContactInfoForEvent eventDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data[0].name).toBe("Metallica");
        expect(data[0].phone).toBe("2386724692");
        done();
    }
    eventDao.getContactInfoForEvent(2, callback);
});

/**
 * test for: updateContactInfo() in eventDao.js
 */
test("test: updateContactInfo()", done =>{
    function callback2(status, data){
        console.log(
            "Test updateContactInfo eventDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data[0].name).toBe("hei sveis");
        expect(data[0].phone).toBe("00000001");
        done();
    }

    function callback(status, data){
        eventDao.getContactInfoForEvent(1, callback2);
    }

    let contactInfo = {name: "hei sveis", phone: "00000001", email: "hwudijwdhwojndw@sohfsoidhjs.nckjw"};
    eventDao.updateContactInfo(1, contactInfo, callback);
});

/**
 * test for: deleteEventDetails() in eventDao.js
 */
test("test: deleteEventDetails()", done =>{

    function callback2(status, data) {
        console.log(
            "Test deleteEventDetails eventDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.affectedRows).toBe(1);
        done();
    }

    function callback(status, data){
        eventDao.deleteEventDetails(6, callback2);
    }
    // dummy function to send into query in dao.js, we do not want it to print extra or complicate our code
    function dummy(status, data){

    }

    let contactInfo = {name: "hei sveis", phone: "00000000", email: "hwudijwdhwojndw@sohfsoidhjs.nckjw", eventID: 6};
    eventDao.addContactInfo(contactInfo, dummy);
    let ticket = {eventID: 6, ticketID: 3, amount: 20, price: 100};
    eventDao.addTicket(ticket, callback);
});
