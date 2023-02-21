import { login } from "../api/users.js";

const section = document.getElementById("loginPage");
const form = section.querySelector("form");
form.addEventListener("submit", onSubmit);

let innerContext = null;

export function showLogin(context) {
    innerContext = context;
    context.showSection(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const userData = {
        email: formData.get("email"),
        password: formData.get("password"),
    };

    await login(userData);
    form.reset();
    innerContext.updateNav();
    innerContext.goTo("/");
}
