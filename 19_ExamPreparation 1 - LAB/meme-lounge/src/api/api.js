import { notify } from "../notify.js";
import { getUserData, clearUserData } from "../utils.js";

const host = "http://localhost:3030";

async function request(url, method, data) {
    const options = {
        method,
        headers: {},
    };

    if (data) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(data);
    }

    const user = getUserData();

    if (user) {
        options.headers["X-Authorization"] = user.accessToken;
    }

    try {
        const response = await fetch(host + url, options);

        if (!response.ok) {
            if (response.status == 403) {
                clearUserData();
            }
            const error = await response.json();
            throw new Error(error.message);
        }

        if (response.status == 204) {
            return response;
        }

        const data = await response.json();

        return data;
    } catch (error) {
        notify(error.message);
    }
}

export async function get(url) {
    return request(url, "get");
}

export async function post(url, data) {
    return request(url, "post", data);
}

export async function put(url, data) {
    return request(url, "put", data);
}

export function del(url) {
    return request(url, "delete");
}
