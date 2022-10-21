import { getUsers } from "./user-http-utils";

export function getLoggedUser() {
    return JSON.parse(localStorage.getItem('loggedUser'));
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