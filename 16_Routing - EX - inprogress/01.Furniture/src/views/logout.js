import page from "../../node_modules/page/page.mjs";
import { updateInfo } from "../app.js";
import { getApi } from "../data/api.js";

const url = `http://localhost:3030/users/logout`;

export async function logout() {
    const result = await getApi(url);
    console.log(result);
    localStorage.clear();
    page.redirect("/catalog");
    updateInfo();
}
