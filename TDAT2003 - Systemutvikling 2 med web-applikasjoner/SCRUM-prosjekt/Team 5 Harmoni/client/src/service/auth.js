//Credit user imgx64 from StackOverflow || https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
let parseJwt =  (token) => {
    if(token !== null && typeof token !== "undefined"){
        let base64Url = token.split('.')[1];
        if (base64Url === undefined) { //The token will not be valid format and is therefore automatically rejected
            return null;
        }
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } else{
        return null;
    }
};

export let authenticationHeader = function authenticationHeader() {
    let token = window.localStorage.getItem("token");

    if (token) {
        return {Authorization : "Bearer " + token}
    } else return {}
};

export const auth = {
    authenticated: false,
    role: "",
    user_id : "",
    authenticate(){
        let response = parseJwt(localStorage.getItem("token"));
        if(response !== null && response.role !== undefined){
            this.authenticated = true;
            this.role = response.role.slice(1, response.role.length-1);
            this.user_id = response.user_id;
        } else{
            this.authenticated = false;
            this.role = "";
        }
    }
};

export let authenticate = auth.authenticate.bind(auth);