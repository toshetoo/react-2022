import { getUsers } from "./user-http-utils";
import { parseBool } from "./bool-utils";

export function getLoggedUser() {
    const user = JSON.parse(localStorage.getItem('loggedUser'));
    if (user)
        user.isAdmin = parseBool(user.isAdmin);

    return user;

}

export async function login(loginCreds) {
    const users = (await getUsers()).data;
    // const response = await getUsers();
    // const users = response.data;

    const foundUser = users
        .find(user => user.email === loginCreds.email && user.password === loginCreds.password);

    if (!foundUser) {
        throw new Error('Invalid email/password');
    }

    localStorage.setItem('loggedUser', JSON.stringify(foundUser));
    return foundUser;

}

export function logout() {
    return new Promise((resolve) => {
        localStorage.removeItem('loggedUser');
        resolve();
    });
}