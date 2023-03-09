import page from "../node_modules/page/page.mjs";
import { html, render } from "../node_modules/lit-html/lit-html.js";
import { loginView } from "./views/login.js";
import { catalogView } from "./views/catalog.js";

// page("/", loginView);
page("/login", loginView);
page("/catalog", catalogView);
page.start();

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
