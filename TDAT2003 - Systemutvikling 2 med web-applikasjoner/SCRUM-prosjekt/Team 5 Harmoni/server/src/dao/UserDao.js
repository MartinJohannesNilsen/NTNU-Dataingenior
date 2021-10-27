const dao = require('./dao.js');
let crypto = require('crypto');
let bcrypt = require('bcrypt');
const saltRounds = 10;


/**
 * Module for use in DB calls regarding retrieval of user data and functionality
 * @module UserDao
 */
module.exports = class UserDao extends dao {

    /**
     * @function registerUser
     * @param {Object} json - JSON object containing user info for registration: name, email, phone, profile photo
     */
    registerUser(json, callback) {
        let val = [json.name, json.email, json.phone, json.profile_photo];
        /** Hashes password and sends the hashed password to the DB */
        bcrypt.hash(json.password, saltRounds)
            .then((resp) => {
                val.push(resp);
                super.query(
                    "INSERT into User (name, email, phone, profile_photo, password_hash) values (?, ?, ?, ?, ?)",
                    val,
                    callback
                );
            })
            .catch((err) => {
                console.error(err);
            });
    }

    /** @function getUser */
    getUser(email, callback) {
        super.query("SELECT * from User join Role on User.role_id = Role.role_id where email = ? ", email, callback);
    }

    /** @function getApprovedUser - Retrieves the user matching the specified email if it is approved */
    getApprovedUser(email, callback) {
        super.query("SELECT * from User JOIN Role on User.role_id = Role.role_id where email = ? AND approved = 1", email, callback)
    }


    /** 
     * Changes password to the provided password
     * @function changePassword
     * @param {Object} json - JSON object containing user_id and password.
     */
    changePassword(json, callback) {
        let val = [json.user_id];
        /** Hashing password and pushing it to the front of the val array for use in query */
        bcrypt.hash(json.password, saltRounds).then(res => {
            val.unshift(res); // Hashing and then inserting at the beginning of val for use in the query.
            super.query(
                "UPDATE User SET password_hash = ? WHERE user_id = ?",
                val,
                callback
            )
        }).catch((err) => {
            console.error(err);
        });
    }


    /**
     * Updates user in DB with provided attributes
     * @function updateProfile
     * @param {Object} user - Object containing all user info
     */
    updateProfile(user, callback) {
        if (user.profile_photo === "") {
            let val = [user.name, user.phone, user.email, user.user_id];
            super.query(
                'UPDATE User SET name = ?, phone = ?, email = ? where user_id = ?',
                val,
                callback
            );
        } else {
            let val = [user.name, user.phone, user.email, user.profile_photo, user.user_id];
            super.query(
                "UPDATE User set name = ?, phone = ?, email = ?, profile_photo = ? where user_id = ?",
                val,
                callback
            )
        }

    }
};
