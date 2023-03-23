const container = document.querySelector(".notification");
const span = container.querySelector("span");

export function notify(message) {
    container.style.display = "block";
    span.textContent = message;

    setTimeout(() => (container.style.display = "none"), 3000);
}
