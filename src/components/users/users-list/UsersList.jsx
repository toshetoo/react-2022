import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../../../utils/services/user-http-utils";
import { UserCard } from "../user-card/UserCard";

export function UsersList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers()
            .then((response) => {
                setUsers(response.data);
            });
    }, []);

    const onDelete = (id) => {
        deleteUser(id).then(() => {
            setUsers((prevState) => {
                return prevState.filter(user => user.id !== id);
            });
        });
    }

    return (
        <div className="users-list" style={{ display: 'flex' }}>
            {users.map(user => <UserCard key={user.id} user={user} onDelete={onDelete} />)}
        </div>
    );
}