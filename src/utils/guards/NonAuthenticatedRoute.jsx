import { getLoggedUser } from "../services/auth-http-utils";
import { useNavigate, Navigate } from "react-router";
import { UsersList } from "../../components/users/users-list/UsersList";

export function NonAuthenticatedRoute({ children }) {
    const user = getLoggedUser();

    if (user) {
        return <Navigate to="/users" />;
    }

    return children;
}