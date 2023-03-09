const url = "http://localhost:3030/jsonstore/collections/books";

export async function getBooks() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error);
        }

        if (response.status === 204) {
            return response;
        }

        const data = await response.json();

        return data;
    } catch (error) {
        alert(error.message);
        throw new Error(error);
    }
}

export async function getBook(id) {
    const urlId = `/${id}`;

    try {
        const response = await fetch(url + urlId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error);
        }

        if (response.status === 204) {
            return response;
        }

        const data = await response.json();

        return data;
    } catch (error) {
        alert(error.message);
        throw new Error(error);
    }
}

export async function deleteBook(id) {
    const urlId = `/${id}`;

    try {
        const response = await fetch(url + urlId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error);
        }

        if (response.status === 204) {
            return response;
        }

        const data = await response.json();

        return data;
    } catch (error) {
        alert(error.message);
        throw new Error(error);
    }
}

export async function addBook(data) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error);
        }

        if (response.status === 204) {
            return response;
        }

        const newBook = await response.json();

        return newBook;
    } catch (error) {
        alert(error.message);
        throw new Error(error);
    }
}

export async function editBook(data, id) {
    const urlId = `/${id}`;

    try {
        const response = await fetch(url + urlId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error);
        }

        if (response.status === 204) {
            return response;
        }

        const newBook = await response.json();

        return newBook;
    } catch (error) {
        alert(error.message);
        throw new Error(error);
    }
}
