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
 * test for: getCategories() in eventDao.js
 */
test("test: getCategories()", done =>{

    function callback(status, data){
        console.log(
            "Test getCategories eventDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBe(3);
        expect(data[0].name).toBe("forelesning");
        done();
    }

    eventDao.getCategories(callback);
});

/*
test("test: addCategory()", done =>{

    function callback(status, data){
        console.log(
            "Test addCategory(Event_Category) eventDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.affectedRows).toBe(1);
        done();
    }

    let category = {eventID : 1, categoryID: 2};
    eventDao.addCategories(category, callback);
});
*/

/**
 * test for: getCategoryFromEvent() in eventDao.js
 */
test("test: getCategoryFromEvent()", done =>{
    function callback(status, data) {
        console.log(
            "Test getCategoryFromEvent for event 1 eventDao callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBe(1);
        expect(data[0].category_id).toBe(2);
        done();
    }

    eventDao.getCategoryFromEvent(2, callback);

});
