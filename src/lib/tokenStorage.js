export const setToken = (tokenString) => {
    localStorage.setItem("renti-user", tokenString);
};

export const getToken = () => {
    return localStorage.getItem("renti-user");
};

export const deleteToken = () => {
    localStorage.removeItem("renti-user");
};
