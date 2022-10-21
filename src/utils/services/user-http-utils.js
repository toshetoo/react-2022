import axios from 'axios';

const apiUrl = 'http://localhost:3005/users';

export function getUsers() {
    return axios.get(apiUrl);
}

export function getUserById(id) {
    return axios.get(`${apiUrl}/${id}`);
}

export function saveUser(userObj) {

    if (!userObj.photo) {
        userObj.photo = `https://picsum.photos/200/300?random=${Math.random()}`
    }

    if (userObj.id) {
        return axios.put(`${apiUrl}/${userObj.id}`, userObj);
    }

    return axios.post(apiUrl, userObj);
}

export function deleteUser(id) {
    // http://localhost:3005/users/1
    return axios.delete(`${apiUrl}/${id}`);
}