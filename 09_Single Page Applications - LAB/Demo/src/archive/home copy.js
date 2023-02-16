const section = document.getElementById("home");
section.remove();

export function showHome() {
    document.querySelector("main").replaceChildren(section);
}
