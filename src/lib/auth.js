import jwtDecode from "jwt-decode";
import { getToken, deleteToken } from "./tokenStorage";
import endpoints from "../config/endpoints";
import { post } from "../util/request";

const checkAuth = () => {
    // return true if a user is logged in, if not returns false
    const token = getToken();
    if (token) {
        try {
            const tokenExp = jwtDecode(token).exp;
            const currDate = Date.now() / 1000 | 0;
            // check to ensure that the token is much longer than an hour from
            // expiring, if it's not then re ask the user to re auth
            if (tokenExp && currDate < tokenExp && (tokenExp - currDate) >= 7200) {
                return true;
            }
        }
        catch (err) {
            return false;
        }
    }
    return false;
};

const getCurrentUser = () => {
    // returns the current user information if a user is logged in, if not
    // return undefined
    return checkAuth() ? jwtDecode(getToken()) : undefined;
};

const login = (username, password) => {
    return post(endpoints.signin, {
        username: username,
        password: password
    });
};

const logout = () => {
    // deletes user token from localstorage
    return deleteToken();
};

export { login, checkAuth, logout, getCurrentUser };
