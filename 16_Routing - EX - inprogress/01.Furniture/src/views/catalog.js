import page from "../../node_modules/page/page.mjs";
import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { updateInfo } from "../app.js";
import { getApi } from "../data/api.js";
import { itemCardTemplate } from "./card.js";

// import { itemCardTemplate } from "./card.js";

const url = `http://localhost:3030/data/catalog`;

let catalogTemplate = (catalog) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Welcome to Furniture System</h1>
            <p>Select furniture from the catalog to view details.</p>
        </div>
    </div>
    <div class="row space-top">
        ${catalog.map((item) => {
            return itemCardTemplate(item);
        })}
    </div>
`;

async function getFurniture() {
    const catalogData = await getApi(url);
    // const catalog = Object.values(catalogData);
    console.log(catalogData);

    return catalogData;
}
// console.log(catalog);
// console.log(Object.values(catalog));

export const catalogView = (context) =>
    getFurniture().then((furniture) => render(catalogTemplate(furniture), document.querySelector(".container")));
