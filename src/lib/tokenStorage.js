export function setToken(tokenString) {
    localStorage.setItem("renti-user", tokenString);
};

export function getToken() {
    return localStorage.getItem("renti-user");
};

export function deleteToken() {
    localStorage.removeItem("renti-user");
};
