document.querySelector("nav").addEventListener("click", onNavigate);

showView("home");

const sections = {
    homeBtn: showHome,
    catalogBtn: showCatalog,
    aboutBtn: showAbout,
};

function onNavigate(event) {
    event.preventDefault();
    // console.log("event.target", event.target);
    // console.log("event.target.tagName", event.target.tagName);

    if (event.target.tagName == "A") {
        document.querySelectorAll("section").forEach((s) => (s.style.display = "none"));

        const view = sections[event.target.id];
        if (typeof view == "function") {
            view();
        }
    }
}

function showHome() {
    showView("home");
}

function showCatalog() {
    showView("catalog");
}

function showAbout() {
    showView("about");
}

function showView(id) {
    document.querySelectorAll("section").forEach((s) => (s.style.display = "none"));
    document.getElementById(id).style.display = "";
}
