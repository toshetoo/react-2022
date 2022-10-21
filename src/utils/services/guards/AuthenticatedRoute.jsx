import { getLoggedUser } from "../services/auth-http-utils";
import { Navigate } from "react-router";

export function AuthenticatedRoute({ children }) {
    const user = getLoggedUser();

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
}