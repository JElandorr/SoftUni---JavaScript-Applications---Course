console.log("My requests...");

document.getElementById("loadBooks").addEventListener("click", loadBooks);
const url = `http://localhost:3030/jsonstore/collections/books`;
const table = document.querySelector("tbody");
const submitBtn = document.querySelector("form button");
submitBtn.addEventListener("click", () => createBook(event));
const titleField = document.querySelector('[name="title"]');
const authorField = document.querySelector('[name="author"]');

async function loadBooks() {
    table.innerHTML = "";

    try {
        const response = await fetch(url);

        if (!response.ok) {
            const err = response.json();
            throw new Error(err.message);
        }

        const resData = await response.json();

        const workData = JSON.parse(JSON.stringify(resData));

        // console.log("resData", resData);
        // console.log("workData", workData);

        Object.entries(workData).forEach(([id, book]) => {
            const tr = document.createElement("tr");
            const tdTitle = document.createElement("td");
            tdTitle.textContent = book.title;
            const tdAuthor = document.createElement("td");
            tdAuthor.textContent = book.author;
            const tdButtons = document.createElement("td");

            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.addEventListener("click", () => onEdit(event, id));

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => onDelete(event, id));

            tdButtons.appendChild(editBtn);
            tdButtons.appendChild(deleteBtn);
            tr.appendChild(tdTitle);
            tr.appendChild(tdAuthor);
            tr.appendChild(tdButtons);
            table.appendChild(tr);
        });
    } catch (error) {
        alert(error.message);
    }
}

async function createBook(event) {
    event.preventDefault();
    const bookForm = document.querySelector("form");

    const formData = new FormData(bookForm);

    const bookData = {
        title: formData.get("title").trim(),
        author: formData.get("author").trim(),
    };

    try {
        if (bookData.title == "") {
            throw new Error("Book title field is required!");
        }

        if (bookData.author == "") {
            throw new Error("Book author field is required!");
        }

        const response = await fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookData),
        });

        if (!response.ok) {
            const error = response.json();
            throw new Error(error.message);
        }

        const resData = await response.json();

        const workData = JSON.parse(JSON.stringify(resData));

        titleField.value = "";
        authorField.value = "";

        loadBooks();
    } catch (error) {
        alert(error.message);
    }
}

async function onEdit(e, id) {
    e.preventDefault();
    console.log("onEdit");
    console.log("id", id);

    try {
        const formField = document.querySelector("form h3");
        formField.textContent = `Edit FORM`;
        submitBtn.textContent = `Save`;
    } catch (error) {
        alert(error.message);
    }
}

async function onDelete(e, id) {
    e.preventDefault();
    console.log("onDelete");
    console.log("id", id);

    try {
        const response = await fetch(`${url}/${id}`, {
            method: "delete",
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const resData = await response.json();

        loadBooks();
    } catch (error) {
        alert(error.message);
    }
}
