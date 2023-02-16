import { post } from "./api.js";
import { showHome } from "./home.js";
import { checkUserNav } from "./utils.js";

const section = document.getElementById("register");
const form = section.querySelector("form");
const inputFields = section.querySelectorAll("input");
form.addEventListener("submit", onSubmit);
section.remove();

let context = null;

export function showRegister(inContext) {
    context = inContext;
    context.render(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);

    console.log("formData", formData);

    form.reset();

    const registerData = {
        username: formData.get("username").trim(),
        email: formData.get("email").trim(),
        password: formData.get("password").trim(),
    };

    const repass = formData.get("repass").trim();

    if (registerData.username == "" || registerData.email == "" || registerData.password == "") {
        throw new Error("All fields are required!");
    }

    if (registerData.password != repass) {
        throw new Error("Passwords don't match");
    }

    const resData = await post("/users/register/.json", registerData);
    const userData = {
        email: resData.email,
        userName: resData.username,
        accessToken: resData.accessToken,
        id: resData._id,
    };

    sessionStorage.setItem("userData", JSON.stringify(userData));

    checkUserNav();
    context.goTo("homeBtn");
}
