let mysql = require("mysql");
let runsqlfile = require("./runsqlfile.js");

// GitLab CI Pool
module.exports = async () => {
    let pool = mysql.createPool({
        connectionLimit: 1,
        host: "mysql",
        user: "root",
        password: "secret",
        database: "supertestdb",
        debug: false,
        multipleStatements: true
    });

    function done() {
        pool.end();
    }

    runsqlfile("./teardown.sql", pool, done);
};
