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
 * test for: getTicket() in eventDao.js
 */
test("test: getTicket()", done =>{

    function callback(status, data){
        console.log(
            "Test getTicket eventDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBe(5);
        expect(data[0].name).toBe("Standard");
        done();
    }

    eventDao.getTicket(callback);
});

/**
 * test for: addTicket() in eventDao.js
 */
test("test: addTicket()", done =>{

    function callback(status, data){
        console.log(
            "Test addTicket eventDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.affectedRows).toBe(1);
        done();
    }

    let event_ticket = {eventID: 1, ticketID: 3, amount: 20, price: 100};
    eventDao.addTicket(event_ticket, callback);
});

/**
 * test for: getTicketById() in eventDao.js
 */
test("test: getTicketById()", done =>{

    function callback(status, data){
        console.log(
            "Test getTicketById eventDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBe(1);
        expect(data[0].name).toBe("VIP");
        done();
    }

    eventDao.getTicketById(3,callback);
});

/**
 * test for: getTicketFromEvent() in eventDao.js
 */
test("test: getTicketFromEvent()", done =>{

    function callback(status, data){
        console.log(
            "Test getTicketFromEvent eventDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBe(2);
        expect(data[0].name).toBe("VIP");
        done();
    }

    eventDao.getTicketFromEvent(2,callback);
});

/**
 * test for: deleteTicketForEvent() in eventDao.js
 */
test("test: deleteTicketForEvent()", done =>{

    function callback(status, data){
        console.log(
            "Test deleteTicketForEvent eventDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.affectedRows).toBe(2);
        done();
    }

    eventDao.deleteTicketsForEvent(2,callback);
});