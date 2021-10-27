/**
 * module used child classes to execute mysql queries, the children are:
 * AdminDao, EventDao, and UserDao
 * @module Dao
 */

module.exports = class Dao {
    constructor(pool) {
        this.pool = pool;
    }

    /**
     * method that execute a sql query in the database
     * @param sql sql query in text form
     * @param params parameters to use in query
     * @param callback function that gives info
     */
    query(sql, params, callback) {
        this.pool.getConnection((err, connection) => {
            console.log("dao: connected to database");
            if (err) {
                console.log("dao: error connecting");
                callback(500, {error: "feil ved ved oppkobling"});
            } else {
                console.log("dao: running sql: " + sql);
                connection.query(sql, params, (err, rows) => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        callback(500, err);
                    } else {
                        console.log("dao: returning rows");
                        callback(200, rows);
                    }
                });
            }
        });
    }
};


