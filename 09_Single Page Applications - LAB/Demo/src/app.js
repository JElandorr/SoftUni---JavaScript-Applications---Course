import { showHome } from "./home.js";
import { showCatalog } from "./catalog.js";
import { showAbout } from "./about.js";
import { showLogin } from "./login.js";
import { showRegister } from "./register.js";
import { checkUserNav, onLogout } from "./utils.js";
import { showCreate } from "./create.js";
import { render } from "./dom.js";

document.querySelector("nav").addEventListener("click", onNavigate);

const sections = {
    homeBtn: showHome,
    catalogBtn: showCatalog,
    aboutBtn: showAbout,
    loginBtn: showLogin,
    registerBtn: showRegister,
    createBtn: showCreate,
    logoutBtn: onLogout,
};

checkUserNav();

goTo("homeBtn");

function onNavigate(event) {
    event.preventDefault();

    if (event.target.tagName == "A") {
        const view = event.target.id;

        if (goTo(view)) {
            event.preventDefault();
        }
    }
}

function goTo(viewName) {
    const view = sections[viewName];

    if (typeof view == "function") {
        view({
            render,
            goTo,
            checkUserNav,
        });

        return true;
    } else {
        return false;
    }
}
