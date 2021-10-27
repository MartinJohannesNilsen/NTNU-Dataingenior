let mysql = require("mysql");
const AdminDao = require("../dao/adminDao.js");
let runsqlfile = require("./runsqlfile.js");

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


/**
 * @param mysql pool
 * @type {module.adminDao|*}
 */
let adminDao = new AdminDao(pool);


/**
 * tests getUser: get user where user_id = 1
*/
test("get User with id 1", done =>{
    function callback(status, data) {
        console.log(
            "Test getUser adminDao. callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBe(1);
        expect(data[0].user_id).toBe(1);
        expect(data[0].name).toBe("test1");
        done();
    }

    adminDao.getUser(1, callback);
});


/**
  *  tests getUsers: get all users
*/
test("get Users from DB", done =>{
    function callback(status, data) {
        console.log(
            "Test getUsers adminDao. callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBeGreaterThanOrEqual(3);
        expect(data[0].user_id).toBe(1);
        expect(data[1].user_id).toBe(2);
        expect(data[0].name).toBe("test1");
        expect(data[0].approved).toBe(0);
        done();
    }

    adminDao.getUsers(callback);
});


/**
  *  tests assignRole: assigns role 2 to user where user_id = 1
*/
test("test assigning roles", done =>{

    function callback2(status, data) {
        console.log(
            "Test assignRole adminDao. callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data[0].user_id).toBe(1);
        expect(data[0].role_id).toBe(2);
        done();
    }

    function callback(status, data){
        adminDao.getUser(1, callback2);
    }

    adminDao.assignRole(1, 2, callback);
});


/**
  *  tests approveUser: approves user where user_id = 2
*/
test("test approving user", done =>{

    function callback2(status, data) {
        console.log(
            "Test approveUser adminDao. callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data[0].user_id).toBe(1);
        expect(data[0].approved).toBe(1);

        done();
    }

    function callback(status, data){
        adminDao.getUser(1, callback2);
    }

    adminDao.approveUser(1, callback);
});


/**
 *   delete user: deletes user where user_id = 3
*/
test("delete user", done =>{

    function callback(status, data) {
        console.log(
            "Test deleteUser adminDao. callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.affectedRows).toBe(1);
        done();
    }

    adminDao.deleteUser(3, callback);
});


/**
  *  disapproveUser: disapproves user where user_id = 1
 */
test("disapprove user", done =>{

    function callback2(status, data) {
        console.log(
            "Test disapprove adminDao. callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data[0].approved).toBe(0);
        done();
    }

    function callback(){
        adminDao.getUser(1, callback2);
    }

    adminDao.disapproveUser(1, callback);
});


/**
  *  getRole: get all users were role = admin
 */
test("get Role", done =>{

    function callback(status, data) {
        console.log(
            "Test getRole adminDao. callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data[0].role_id).toBe(1);
        done();
    }

    adminDao.getRole("admin", callback);
});


/**
  *  getRole by ID: Returns role from user where id = 3
 */
test("getRole by ID", done =>{

    function callback(status, data) {
        console.log(
            "Test getRole by ID adminDao. callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data[0].role).toBe('Økonomisjef');
        done();
    }

    adminDao.getRoleById(3, callback);
});


/**
  *  getRoles: Get all roles from the Role table
 */
test("get Roles", done =>{

    function callback(status, data) {
        console.log(
            "Test getRoles adminDao. callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBe(18);
        done();
    }

    adminDao.getRoles( callback);
});

