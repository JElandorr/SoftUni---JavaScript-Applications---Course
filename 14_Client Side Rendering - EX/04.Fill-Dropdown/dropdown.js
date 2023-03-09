import { html, render } from "./node_modules/lit-html/lit-html.js";

const url = "http://localhost:3030/jsonstore/advanced/dropdown";

const select = document.getElementById("menu");
const form = document.querySelector("form");

async function getItems() {
    try {
        const response = await fetch(url);

        console.log("response", response);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error);
        }

        if (response.status == 204) {
            return response;
        }

        const data = await response.json();

        console.log("data", data);

        return data;
    } catch (error) {
        alert(error);
    }
}

const dropDownListData = Object.values(await getItems());

let menuItems = html`${dropDownListData.map((item) => html`<option value=${item._id}>${item.text}</option>`)}`;

render(menuItems, select);

document.querySelector('input[type="submit"]').addEventListener("click", addItem);

async function addItem(e) {
    e.preventDefault();
    // console.log("TODO:...");
    const inputField = document.getElementById("itemText");
    const inputData = {
        text: inputField.value,
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inputData),
        });

        if (response.ok) {
            const data = await response.json();

            dropDownListData.push(data);

            menuItems = html`${dropDownListData.map((item) => html`<option value=${item._id}>${item.text}</option>`)}`;

            render(menuItems, select);

            form.reset();
        }

        console.log("data", data);
    } catch (error) {}
}
