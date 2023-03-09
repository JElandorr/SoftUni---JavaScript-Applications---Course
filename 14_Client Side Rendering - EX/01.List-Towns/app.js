import { html, render } from "./node_modules/lit-html/lit-html.js";

const form = document.querySelector("form");
const btn = document.getElementById("btnLoadTowns");
btn.addEventListener("click", onClick);

const divRoot = document.getElementById("root");

let townsArr = [];

function onClick(e) {
    e.preventDefault();
    // console.log("clicked!");

    const input = document.getElementById("towns").value;

    // console.log("input", input);

    const towns = input.split(", ");

    // console.log("towns", towns);

    towns.forEach((element) => {
        townsArr.push(element);
    });

    // console.log("townsArr", townsArr);

    const ul = html`<ul>
        ${townsArr.map((town) => html`<li>${town}</li>`)}
    </ul>`;

    form.reset();

    render(ul, divRoot);
}
