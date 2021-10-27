const Dao = require("./dao.js");


/**
 * Data-access object for admin actions
 * @module adminDao
 */
module.exports = class adminDao extends Dao{

    /**
     * Finds role based on string sent in
     * @function getRole
     * @param {String} role
     * @returns {Object} - Returns object containing the role_id requested
     */
    getRole(role, callback){
        super.query("SELECT role_id FROM Role WHERE role=?", [role], callback);
    }

    /**
     * Updates user with new name, phone and email based on the users ID
     * @function updateUser
     * @param user
     * @param callback
     */
    updateUser(user, callback){
        let val = [user.name, user.phone, user.email, user.user_id];
        super.query(
            'UPDATE User SET name = ?, phone = ?, email = ? where user_id = ?',
            val,
            callback
        );
    }


    /**
     * Retrieves role based on roleID passed
     * @function getRoleById
     * @param {int} roleID
     * @returns {Object} - Object containing the name of the role requested.
     */
    getRoleById(roleID, callback){
        super.query("SELECT role FROM Role WHERE role_id=?", [roleID], callback);
    }

    /**
     * Retrieves all roles
     * @function getRoles
     * @returns {Object} - Returns a response object containing a list of all Role objects
     */
    getRoles(callback){
        super.query("SELECT role FROM Role", [], callback);
    }

    /**
     * Retrieves user based on userID
     * @function getUser
     * @param {int} userID
     * @returns {Object} - Returns a User object containing user credentials
     */
    getUser(userID, callback){
        super.query("SELECT * FROM User WHERE user_id=?", [userID], callback);
    }

    /**
     * Retrieves all users
     * @function getUsers
     * @returns {Object} - Returns an Object containing all User objects
     */
    getUsers(callback){
        super.query("SELECT user_id, name, email, phone, role_id, approved FROM User ORDER BY user_id", [], callback);
    }

    /**
     * Assigns a role to specified user
     * @function assignRole
     * @param {int} userID
     * @param {int} roleID
     */
    assignRole(userID, roleId, callback){
        super.query("UPDATE User SET role_id=? WHERE user_id=?", [parseInt(roleId), parseInt(userID)], callback);
    }

    /**
     * Approves specified user
     * @function approveUser
     * @param {int} userID
     */
    approveUser(userID, callback){
        super.query("UPDATE User SET approved=1 WHERE user_id=?", [userID], callback);
    }

    /**
     * Deletes specified user
     * @function deleteUser
     * @param {int} userID
     */
    deleteUser(userID, callback){
        super.query("DELETE FROM Comment WHERE user_id = ?", [userID], callback2);
        super.query("DELETE FROM User WHERE user_id=?", [userID], callback);
    }

    /**
     * Disapproves specified user
     * @function disapproveUser
     * @param {int} userID
     */
    disapproveUser(userID, callback){
        super.query("UPDATE User SET approved=0 WHERE user_id=?", [userID], callback);
    }

};

/**
 * Dummy function to reduce load on DB
 * @function callback2
 */
function callback2(){

}