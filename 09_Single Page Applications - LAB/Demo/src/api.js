// const host = `http://localhost:3030`; https://atlas-bsc-events-default-rtdb.europe-west1.firebasedatabase.app/events/.json
const host = `https://atlas-bsc-events-default-rtdb.europe-west1.firebasedatabase.app`;

export async function request(method, url, data) {
    const userData = JSON.parse(sessionStorage.getItem("userData"));

    const options = {
        method,
        headers: {},
    };

    if (data !== undefined) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(data);
    }

    // if (userData != null) {
    //     options.headers["X-Authorization"] = userData.accessToken;
    // }

    try {
        const response = await fetch(host + url, options);

        if (!response.ok) {
            const error = response.json();
            // console.log("error.message", error.message);
            throw new Error(error.message);
        }

        if (response.status == 204) {
            return response;
        } else {
            return await response.json();
        }
    } catch (error) {
        alert(error.message);
        throw error;
    }
}

export async function get(url) {
    return request("get", url);
}

export async function post(url, data) {
    return request("post", url, data);
}

export async function put(url, data) {
    return request("put", url, data);
}
