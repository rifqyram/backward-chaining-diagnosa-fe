import PropTypes from "prop-types";
import {ServiceContext} from "../context/ServiceContext.jsx";
import {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {authAction} from "../slices/authSlice.js";

const ProtectedRoute = ({children}) => {
    const dispatch = useDispatch();
    const {authService} = useContext(ServiceContext);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const roles = ['Admin', 'Super Admin'];
                const result = await authService.getUserInfo();
                if (!roles.includes(result.data.role)) navigate('/');
                dispatch(authAction(() => result.data));
            } catch (e) {
                if (e.response.status === 401 || e.response.status === 403) {
                    authService.logout();
                    navigate('/login');
                }
            }
        };
        verifyAuth();
    }, [authService, dispatch, navigate]);

    return children;
};

export default ProtectedRoute;

ProtectedRoute.propTypes = {
    children: PropTypes.element,
}