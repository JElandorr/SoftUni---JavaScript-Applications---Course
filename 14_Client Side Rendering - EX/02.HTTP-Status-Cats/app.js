import { html, render } from "./node_modules/lit-html/lit-html.js";
import { cats } from "./catSeeder.js";

const section = document.getElementById("allCats");

const catsData = [];

cats.forEach((cat) => {
    catsData.push(cat);
});

console.log("catsData", catsData);

let flagShowDetails = false;

const ul = html`<ul>
    ${catsData.map(
        (cat) => html` <li>
            <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap" />
            <div class="info">
                <button class="showBtn" @click=${onShow}>Show status code</button>
                <div class="status" style="display: none" id="${cat.id}">
                    <h4>Status Code: ${cat.statusCode}</h4>
                    <p>${cat.statusMessage}</p>
                </div>
            </div>
        </li>`
    )}
</ul>`;

function onShow(e) {
    let cat = e.target.parentNode;
    let btn = e.target;

    // console.log("e.target", e.target);

    let result = cat.querySelector(".status").style.display;

    if (result == "block") {
        cat.querySelector(".status").style.display = "none";
        e.target.textContent = "Show status code";
    } else {
        cat.querySelector(".status").style.display = "block";
        e.target.textContent = "Hide status code";
    }
}

render(ul, section);
