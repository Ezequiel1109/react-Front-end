import { useSelector } from "react-redux";
import { selectIsAuth } from "../features/selectors";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
    const Auth = useSelector(selectIsAuth);
    return Auth ? children : <Navigate to="/login" replace />;
};