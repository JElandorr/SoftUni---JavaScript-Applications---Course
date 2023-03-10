import page from "../node_modules/page/page.mjs";
import { html, render } from "../node_modules/lit-html/lit-html.js";
import { loginView } from "./views/login.js";
import { registerView } from "./views/register.js";
import { catalogView } from "./views/catalog.js";
import { createView } from "./views/create.js";
import { myPublicationsView } from "./views/myPublications.js";

import { logout } from "./views/logout.js";

// if (localStorage.getItem("user")) {
//     page("/", catalogView);
// } else {
//     page("/", loginView);
// }

page("/login", loginView);
page("/register", registerView);
page("/catalog", catalogView);
page("/myPublications", myPublicationsView);
page("/create", createView);
page.start();

document.getElementById("logoutBtn").addEventListener("click", logout);

export const updateInfo = () => {
    let userDiv = document.getElementById("user");
    let guestDiv = document.getElementById("guest");

    if (localStorage.length == 0) {
        userDiv.style.display = "none";
        guestDiv.style.display = "inline";
    } else {
        userDiv.style.display = "inline";
        guestDiv.style.display = "none";
    }
};

updateInfo();
