import { showHome } from "../home.js";
import { showCatalog } from "../catalog.js";
import { showAbout } from "../about.js";

document.querySelector("nav").addEventListener("click", onNavigate);

showHome();

const sections = {
    homeBtn: showHome,
    catalogBtn: showCatalog,
    aboutBtn: showAbout,
};

function onNavigate(event) {
    event.preventDefault();

    if (event.target.tagName == "A") {
        const view = sections[event.target.id];

        if (typeof view == "function") {
            view();
        }
    }
}
