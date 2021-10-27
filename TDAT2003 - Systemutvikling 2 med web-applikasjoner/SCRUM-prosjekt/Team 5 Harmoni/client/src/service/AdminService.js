import axios from 'axios';
import {authenticationHeader} from "./auth";

let ipAdress = process.env.REACT_APP_HOSTNAME || "localhost";

/**
 * Class to handle admin service
 * @type {service}
 */
class AdminService{

    /**
     * 
     * @param {string} name 
     * @param {string} email 
     * @param {string} phone 
     * @param {number} userID 
     */
    updateUser(name, email, phone, userID) {
        return axios.put("http://localhost:8080/admin/" + userID + "/edit", {
            name: name,
            email: email,
            phone: phone,
            user_id: userID,
        }, {headers: authenticationHeader()}).then(response => response.data);
    }
    /**
     * Get all roles
     */
    getRoles(){
        return axios.get("http://" + ipAdress + ":8080/roles", {headers: authenticationHeader()}).then(response => response.data);
    }
    /**
     * Get role by id
     * @param {number} roleID 
     */
    getRoleByID(roleID){
        return axios.get("http://" + ipAdress + ":8080/role/" + roleID, {headers: authenticationHeader()}).then(response => response.data);
    }
    /**
     * 
     * @param {number} role 
     */
    getRole(role){
        return axios.get("http://" + ipAdress + ":8080/roles/" + role, {headers: authenticationHeader()}).then(response => response.data);
    }
    /**
     * 
     * @param {number} userID 
     * @param {number} roleID 
     */
    assignRole(userID, roleID){
        return axios.post("http://" + ipAdress + ":8080/users/" + userID + "/role/", {roleID: roleID}, {headers: authenticationHeader()}).then(response => response.data);
    }
    /**
     * 
     * @param {number} userID 
     */
    getUser(userID){
        return axios.get("http://" + ipAdress + ":8080/users/" + userID, {headers: authenticationHeader()}).then(response => response.data);
    }
    /**
     * Get all users
     */
    getUsers(){
        return axios.get("http://" + ipAdress + ":8080/users/", {headers: authenticationHeader()}).then(response => response.data);
    }
    /**
     * Delete one user
     * @param {number} userID 
     */
    deleteUser(userID){
        return axios.delete("http://" + ipAdress + ":8080/users/" + userID, {headers: authenticationHeader()}).then(response => response.data);
    }
    /**
     * Approve one user
     * @param {number} userID 
     */
    approveUser(userID){
        return axios.put("http://" + ipAdress + ":8080/users/" + userID + "/approve", {}, {headers: authenticationHeader()}).then(response => response.data);
    }
    /**
     * Disapprove one user
     * @param {number} userID 
     */
    disapproveUser(userID){
        return axios.put("http://" + ipAdress + ":8080/users/" + userID + "/disapprove", {}, {headers: authenticationHeader()}).then(response => response.data);
    }

}


export let adminService = new AdminService();