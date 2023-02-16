const section = document.getElementById("about");
section.remove();

export function showAbout(context) {
    context.render(section);
}
