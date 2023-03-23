import { logout, register } from "./api/users.js";
import { page, render } from "./lib.js";
import { getUserData } from "./utils.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { catalogPage } from "./views/catalog.js";
import { registerPage } from "./views/register.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { profilePage } from "./views/profile.js";

const main = document.querySelector("main");
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", onLogout);

page(decorateContext);
page("/", homePage);
page("/catalog", catalogPage);
page("/catalog/:id", detailsPage);
page("/edit/:id", editPage);
page("/create", createPage);
page("/profile", profilePage);
page("/login", loginPage);
page("/register", registerPage);

updateNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = renderMain;
    ctx.updateNav = updateNav;
    next();
}

function renderMain(template) {
    render(template, main);
}

function updateNav() {
    const user = getUserData();

    if (user) {
        document.querySelector(".user").style.display = "block";
        document.querySelector(".guest").style.display = "none";
        document.querySelector(".user span").textContent = `Welcome, ${user.username}(${user.email})`;
    } else {
        document.querySelector(".user").style.display = "none";
        document.querySelector(".guest").style.display = "block";
    }
}

function onLogout() {
    logout();
    updateNav();
    page.redirect("/");
}
