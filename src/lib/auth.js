import jwtDecode from "jwt-decode";
import tokenStorage from "./tokenStorage";
import endpoints from "../config/endpoints";
import { post } from "../util/request";

const checkAuth = () => {
    let token = tokenStorage.getToken();
    if (token) {
        try {
            let tokenExp = jwtDecode(token).exp;
            let currDate = Date.now() / 1000 | 0;
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

const login = (username, password) => {
    return post(endpoints.signin, {
        username: username,
        password: password
    });
};

const logout = () => {
    return tokenStorage.deleteToken();
};

export { login, checkAuth, logout };
