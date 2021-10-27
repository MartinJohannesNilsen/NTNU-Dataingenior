import Axios from "axios";
import {authenticationHeader} from "./auth";
//Axios.interceptors.response.use(response => response.data);
let ipAdress = process.env.REACT_APP_HOSTNAME || "localhost";


/**
 * User class
 * @class User
 * @param {number} user_id 
 * @param {string} name 
 * @param {string} email 
 * @param {string} phone 
 * @param {File} profile_photo 
 * @param {string} password 
 * @param {number} roleId 
 * @param {boolean} approved 
 */
export class User {
    user_id;
    name;
    email;
    phone;
    profile_photo;
    password;
    roleid;
    approved;
    constructor(user_id, name, email, phone, profile_photo, password,roleId, approved) {
        this.user_id = user_id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.profile_photo = profile_photo;
        this.password = password;
        this.roleid = roleId;
        this.approved = approved;
    }
}


/**
 * Service object for use in calls to backend regarding user data and actions
 * User service
 */
export class UserService {
    /**
     *
     * @param {user} user 
     */
    registerUser(user){
        return Axios.post("http://" + ipAdress + ":8080/users", user);
    }

    /**
     *
     * @param {string} email 
     * @param {string} pw 
     */
    validate(email, pw){
        return Axios.post("http://" + ipAdress + ":8080/validate", {"email":  email, "password" : pw});
    }


    /**
     * Updates password for specified user
     * @param {string} email 
     * @param {string} password 
     * @param {string} newPassword 
     * @param {int} user_id 
     */
    updatePassword(email, password, newPassword, user_id){
        console.log("User service: " + email);
        return Axios.put("http://" + ipAdress + ":8080/users/" + user_id + "/edit/password",
            {
                "email": email,
                "password": password,
                "newPassword": newPassword
            }, {headers: authenticationHeader()}
        );
    }

    /**
     * Resets and sends a new password to the specified users email.
     * @param {string} email 
     */
    forgotPassword(email) {
        return Axios.post("http://" + ipAdress + ":8080/users/reset_password",
            {
                "email" : email
            }
        )
    }

    /**
     * 
     * @param {user} user 
     */
    updateUser(user){
        return Axios.put("http://" + ipAdress + ":8080/profile/" + user.user_id + '/edit', user, {headers: authenticationHeader()});
    }

    /**
     *
     * @param {number} userID 
     * @returns {Object} - Returns a User object with all user credentials.
     */
    getUser(userID){
        return Axios.get("http://" + ipAdress + ":8080/users/" + userID, {headers: authenticationHeader()}).then(response => {
            let a = response.data[0];
            return new User(
                a.user_id,
                a.name,
                a.email,
                a.phone,
                a.profile_photo,
                a.password,
                a.roleid,
                a.approved
            );

        }).catch(error => console.log(error));
    }
}

export default UserService;