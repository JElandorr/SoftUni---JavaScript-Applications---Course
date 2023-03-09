async function request(url, method, data) {
    const apiOptions = {
        method,
        headers: {},
    };

    if (data) {
        if (localStorage.length != 0) {
            apiOptions.headers = {
                "Content-Type": "application/json",
                "X-Authorization": `${localStorage.getItem("user")}`,
            };
        } else {
            apiOptions.headers = { "Content-Type": "application/json" };
        }

        apiOptions.body = JSON.stringify(data);
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

        const data = await response.json();

        // console.log(data);

        return data;
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
