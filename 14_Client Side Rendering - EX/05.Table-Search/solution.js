import { html, render } from "./node_modules/lit-html/lit-html.js";

import { loadData } from "./api.js";
import { rowTemplate } from "./studentT.js";

const table = document.querySelector("table tbody");
const tableData = Object.values(await loadData());
const searchBtn = document.querySelector("#searchBtn");
searchBtn.addEventListener("click", onClick);

render(rowTemplate(tableData), table);
