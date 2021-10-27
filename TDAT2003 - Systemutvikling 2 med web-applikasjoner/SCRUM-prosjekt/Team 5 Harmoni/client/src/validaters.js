/*
*   
*/
export function validateEmail(email) {
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

export function validatePhone(phone) {
    return phone.match(/^\d{8}$/);
}

export function validateTickets(ticket) {
    return /^\d{1,9}$/.test(ticket);
}

export function validateInput(input){
    return /^(.|\n){1,254}$/.test(input)
}
