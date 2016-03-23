const statusMiddleware = (response) => {
    if (response.ok) {
        return response;
    } else {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
};

const jsonResponseMiddleware = (response) => {
    return response.json();
};

const get = (url, jsonData) => {
    let urlQuery = jsonData ? $.param(jsonData) : "";
    url = url + "?" + urlQuery;
    return fetch(url, {
        method: "get",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(statusMiddleware)
        .then(jsonResponseMiddleware);
};

const post = (url, jsonData) => {
    return fetch(url, {
        method: "post",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonData)
    })
        .then(statusMiddleware)
        .then(jsonResponseMiddleware);
};

const put = (url, jsonData) => {
    return fetch(url, {
        method: "put",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonData)
    })
        .then(statusMiddleware)
        .then(jsonResponseMiddleware);
};

const remove = (url, jsonData) => {
    return fetch(url, {
        method: "delete",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonData)
    })
        .then(statusMiddleware)
        .then(jsonResponseMiddleware);
};

export { get, post, put, remove };
