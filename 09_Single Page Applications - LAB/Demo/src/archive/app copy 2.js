document.querySelector("nav").addEventListener("click", onNavigate);

showView("home");

const sections = {
    homeBtn: "home",
    catalogBtn: "catalog",
    aboutBtn: "about",
};

function onNavigate(event) {
    event.preventDefault();
    // console.log("event.target", event.target);
    // console.log("event.target.tagName", event.target.tagName);

    if (event.target.tagName == "A") {
        document.querySelectorAll("section").forEach((s) => (s.style.display = "none"));

        const sectionId = sections[event.target.id];
        document.getElementById(sectionId).style.display = "";
        showView(sectionId);
    }
}

function showView(id) {
    document.querySelectorAll("section").forEach((s) => (s.style.display = "none"));
    document.getElementById(id).style.display = "";
}
