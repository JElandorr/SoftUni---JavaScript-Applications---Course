const section = document.getElementById("home");
section.remove();

export function showHome(context) {
    context.render(section);
}
