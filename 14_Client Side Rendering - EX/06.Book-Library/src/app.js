import { html, render } from "../node_modules/lit-html/lit-html.js";
import { addBook, getBooks, getBook, editBook, deleteBook } from "./api.js";

const body = document.querySelector("body");

const loadBtn = html`<button id="loadBooks" @click=${load}>LOAD ALL BOOKS</button>`;

let tableSection = html`
    <table @click=${action}>
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
`;

let page = html`${loadBtn}${tableSection}${add()}`;

renderNow(page, body);

function renderNow(result, dest) {
    render(result, dest);
}

async function load() {
    const books = Object.entries(await getBooks());

    // console.log("books", books);
    // console.log("books", books[0][0]);

    const bookData = [];
    books.map((book) => {
        let index = 0;
        book[index + 1].id = book[index];
        bookData.push(book[index + 1]);
        index++;
    });

    // console.log("bookData", bookData);

    tableSection = html`
        <table @click=${action}>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                ${html`${bookData.map(
                    (book) => html`
                        <tr id=${book.id}>
                            <td>${book.title}</td>
                            <td>${book.author}</td>
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    `
                )}`}
            </tbody>
        </table>
    `;

    page = html`${loadBtn}${tableSection}${add()}`;

    renderNow(page, body);
}

function action(e) {
    // console.log("e.target", e.target);
    if (e.target.textContent == "Edit") {
        // console.log("e.target.parentNode", e.target.parentNode.parentNode.id);
        edit(e.target.parentNode.parentNode.id);
    } else if (e.target.textContent == "Delete") {
        del(e.target.parentNode.parentNode.id);
    }
}

async function edit(id) {
    const book = await getBook(id);

    console.log("book", book);

    const editSection = html`
        <form id="edit-form">
            <input type="hidden" name="id" />
            <h3>Edit book</h3>
            <label>TITLE</label>
            <input type="text" name="title" value=${book.title} />
            <label>AUTHOR</label>
            <input type="text" name="author" value=${book.author} />
            <input type="submit" value="Save" @click=${(e) => onEdit(e, id)} />
        </form>
    `;

    page = html`${loadBtn}${tableSection}${editSection}`;

    renderNow(page, body);
}

function del(id) {
    deleteBook(id);

    page = html`${loadBtn}${tableSection}${add()}`;

    load();
}

function add() {
    let addSection = html`
        <form id="action-form">
            <h3>Add book</h3>
            <label>TITLE</label>
            <input type="text" name="title" placeholder="Title..." />
            <label>AUTHOR</label>
            <input type="text" name="author" placeholder="Author..." />
            <input type="submit" value="Submit" @click=${onAdd} />
        </form>
    `;

    return addSection;
}

function onAdd(e) {
    e.preventDefault();

    const form = document.getElementById("action-form");

    const formData = new FormData(form);

    if (!(formData.get("title") == "" || formData.get("author") == "")) {
        const book = {
            title: formData.get("title"),
            author: formData.get("author"),
        };

        addBook(book);

        load();
    } else {
        return;
    }

    form.reset();

    // console.log("book", book);
    load();
}

function onEdit(e, id) {
    e.preventDefault();

    const form = document.getElementById("edit-form");

    const formData = new FormData(form);

    if (!(formData.get("title") == "" || formData.get("author") == "")) {
        const book = {
            title: formData.get("title"),
            author: formData.get("author"),
        };
        editBook(book, id);
        load();
    } else {
        return;
    }
    // console.log("book", book);
}
