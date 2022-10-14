import axios from 'axios';

const apiUrl = 'http://localhost:3005/users';

export function getUsers() {
    return axios.get(apiUrl);
}

export function saveUser(userObj) {
    return axios.post(apiUrl, userObj);
}