const section = document.getElementById("about");
section.remove();

export function showAbout() {
    document.querySelector("main").replaceChildren(section);
}
