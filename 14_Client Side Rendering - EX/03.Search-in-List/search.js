import { html, render } from "./node_modules/lit-html/lit-html.js";
import { towns } from "./towns.js";

const townsDiv = document.getElementById("towns");
const resultDiv = document.getElementById("result");

const searchBtn = document.querySelector("article button");
searchBtn.addEventListener("click", onSearch);

const townsCards = towns.map((town) => html`<li id=${town}>${town}</li>`);

const ul = html`<ul>
    ${townsCards}
</ul>`;

render(ul, townsDiv);

function onSearch() {
    let townsLis = document.querySelectorAll("article div ul li");

    townsLis.forEach((town) => {
        town.removeAttribute("class");
    });

    let input = document.getElementById("searchText");
    let text = input.value;
    let result = towns.filter((town) => {
        if (town.includes(text)) {
            let match = document.getElementById(`${town}`);
            match.setAttribute("class", "active");
            return town;
        }
    });

    let resultHTML = document.getElementById("result");
    resultHTML.textContent = `${result.length} matches found`;
}
