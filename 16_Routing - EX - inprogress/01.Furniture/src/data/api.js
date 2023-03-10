async function request(url, method, data) {
    const apiOptions = {
        method,
        headers: {},
    };

    if (data) {
        apiOptions.headers["Content-Type"] = "application/json";
        apiOptions.body = JSON.stringify(data);
    }

    // console.log(localStorage.getItem("user"));
    // const user = localStorage.getItem("user");

    if (localStorage.getItem("user")) {
        const token = localStorage.getItem("user");
        apiOptions.headers["X-Authorization"] = token;
    }

    try {
        const response = await fetch(url, apiOptions);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        if (response.status == 204) {
            return response;
        }

        const responseData = await response.json();

        // console.log(responseData);

        return responseData;
    } catch (error) {
        alert(error.message);
        throw new Error(error);
    }
}

export const getApi = (url) => {
    return request(url, "GET");
};

export const postApi = (url, data) => {
    return request(url, "POST", data);
};

export const putApi = (url, data) => {
    return request(url, "POST", data);
};

export const deleteApi = (url, data) => {
    return request(url, "DELETE", data);
};
