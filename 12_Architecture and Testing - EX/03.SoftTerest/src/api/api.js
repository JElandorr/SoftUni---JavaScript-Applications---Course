const host = "http://localhost:3030";

async function request(url, method = "get", data) {
    const options = {
        method,
        headers: {},
    };

    if (data != undefined) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(data);
    }

    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        const token = user.accessToken;
        options.headers["X-Authorization"] = token;
    }

    try {
        const response = await fetch(host + url, options);

        if (response.ok != true) {
            const error = await response.json();
            throw new Error(error.message);
        }

        if (response.status == 204) {
            return response;
        }

        return response.json();
    } catch (error) {
        alert(error.message);
        throw error;
    }
}

async function get(url) {
    return request(url);
}

async function post(url, data) {
    return request(url, "post", data);
}

async function put(url, data) {
    return request(url, "put", data);
}

async function del(url, data) {
    return request(url, "delete", data);
}

export { get, post, put, del as delete };
