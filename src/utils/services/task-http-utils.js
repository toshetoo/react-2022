import axios from "axios";
import { getLoggedUser } from "./auth-http-utils";

const apiUrl = 'http://localhost:3005/tasks';

export function getTasks() {
    const loggedUser = getLoggedUser();

    if (loggedUser.isAdmin)
        return axios.get(apiUrl);

    const url = `${apiUrl}?authorId=${loggedUser.id}`;
    // http://localhost:3005/tasks?authorId=4
    return axios.get(url);
}

export function getTaskById(id) {
    return axios.get(`${apiUrl}/${id}`);
}

export function saveTask(taskObject) {
    if (taskObject.id) {
        // 'http://localhost:3005/tasks/3'
        return axios.put(`${apiUrl}/${taskObject.id}`, taskObject);
    }

    const loggedUser = getLoggedUser();
    taskObject.createdDate = new Date().toLocaleString();
    taskObject.authorId = loggedUser.id;
    taskObject.authorName = `${loggedUser.firstName} ${loggedUser.lastName}`;
    return axios.post(apiUrl, taskObject);
}

export function deleteTask(id) {
    return axios.delete(`${apiUrl}/${id}`);
}