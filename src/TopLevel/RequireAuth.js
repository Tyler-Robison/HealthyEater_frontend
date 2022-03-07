import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";

/** "Higher-Order Component" for private routes.
 *
 * In routing component, use these instead of <Route ...>. This component
 * will check if there is a valid current user and only continues to the
 * route if so. If no user is present, redirects to login form.
 */

const RequireAuth = ({ children, redirectTo }) => {
    const { currentUser } = useContext(GlobalContext)

    return currentUser ? children : <Navigate to={redirectTo} />;
}

export default RequireAuth;