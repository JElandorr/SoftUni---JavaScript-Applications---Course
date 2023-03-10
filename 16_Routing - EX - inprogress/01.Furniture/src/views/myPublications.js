import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { itemCardTemplate } from "./card.js";
import { getApi } from "../data/api.js";

const url = `http://localhost:3030/data/catalog`;

const userId = localStorage.getItem("user");

const urlById = `http://localhost:3030/data/catalog?where=_ownerId%3D%22${userId}%22`;

const myPublicationsTemplate = (catalog) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>My Furniture</h1>
            <p>This is a list of your publications.</p>
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

    const result = Object.values(catalogData.filter((item) => item._ownerId == localStorage.ownerId));

    console.log(result);

    return result;
}

export const myPublicationsView = (context) =>
    getFurniture().then((furniture) => render(myPublicationsTemplate(furniture), document.querySelector(".container")));
