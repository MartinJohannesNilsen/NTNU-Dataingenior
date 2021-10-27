let mysql = require("mysql");

const UserDao = require("../dao/UserDao.js");

let pool = mysql.createPool({
    connectionLimit: 1,
    host: "mysql",
    user: "root",
    password: "secret",
    database: "supertestdb",
    debug: false,
    multipleStatements: true
});

let userDao = new UserDao(pool);

/**
 * registerUser: Registers a new user
 */
test("that we can register a user", done => {
    function callback(status, data) {
        console.log("Test registerUser userDao. callback: status = " + status + ", data= " + JSON.stringify(data));
        expect(data.affectedRows).toBeGreaterThanOrEqual(1);
        done();
    }
    userDao.registerUser(
        {
            name: "Test testesen", email: "test@test.no", phone: "88888888", profile_photo: "test.jpg", password: "hei123"
        }, callback
    );
});

/*
test("get hash", done => {
    function callback(status, data) {
        console.log("Test callback: status = " + status + ", data= " + JSON.stringify(data));
        expect(data.length).toBe(1);
        expect(data[0].password_hash).toBe('3856f5086eb7138f2e4e3d42d8569ce4f4b66a83cbce3192da65ee129e8c01d2832057b4bd8f124a2a47d376de0c1808cabc2e467275cc9f7b8a059d618c04bd');
        done();
    }
    userDao.getUser(
        "test4@tester.no", callback
    );
});

*/

/**
 * getUser: Returns user based on e-mail
 */
test("get user", done => {
    function callback(status, data) {
        console.log("Test getUser userDao. callback: status = " + status + ", data= " + JSON.stringify(data));
        expect(data.length).toBe(1);
        expect(data[0].user_id).toBe(5);
        expect(data[0].name).toBe("test5");
        expect(data[0].approved).toBe(0);
        done();
    }
    userDao.getUser(
        "test5@tester.no", callback
    );
});

/**
 *  getApprovedUser: Returns a user based on email only if the user is approved
 */
test("get the approved user", done => {
    function callback(status, data) {
        console.log("Test getApprovedUser userDao callback: status = " + status + ", data= " + JSON.stringify(data));
        expect(data.length).toBe(1);
        expect(data[0].user_id).toBe(4);
        expect(data[0].name).toBe('test4');
        expect(data[0].role_id).toBe(4);
        expect(data[0].role).toBe('Barsjef');
        done();
    }
    userDao.getApprovedUser(
        "test4@tester.no", callback
    );
});

/**
 * UpdateProfile: updates the name, phone and email for user with user_id = 2
 */
test('Changing contact information', done => {
    function callback2(status, data) {
        console.log('Test updateProfile userDao. callback: status=' + status + ', data=' + JSON.stringify(data));
        expect(data[0].user_id).toBe(2);
        expect(data[0].name).toBe('Grete');
        expect(data[0].phone).toBe('09876543');
        expect(data[0].email).toBe('new@mail.com');
        done();
    }

    function callback(status, data){
        userDao.getUser('new@mail.com', callback2);
    }

    userDao.updateProfile({ name: 'Grete', phone: '09876543', email : 'new@mail.com', user_id: 2 }, callback);
});


/**
 * changePassword: Changes the password of user with user_id = 8
 */
test("changing password", done => {
    function callback2(status, data) {
       console.log("Test changePassword userDao. callback: status = " + status + ", data= " + JSON.stringify(data));

       expect(data[0].password_hash).toEqual(expect.not.stringMatching("75cf568134bd7a6a937592fb8f9aa5425a03e8d36edb2e894b187b4d0893d2e2eac917768a56a3fb16bdc7055d603e3be23ccb8e97c9cb5612d345218ec96279"));
       done();
    }
    function callback(status, data){
        userDao.getUser("test6@tester.no", callback2);
    }

    let json = {user_id: 6, password: "hei1234"};
    userDao.changePassword(json, callback);
});