import { post } from "./api.js";
import { showHome } from "./home.js";
import { checkUserNav } from "./utils.js";

const section = document.getElementById("login");
const form = section.querySelector("form");
const inputFields = section.querySelectorAll("input");
form.addEventListener("submit", onSubmit);
section.remove();

let context = null;

export function showLogin(inContext) {
    context = inContext;
    context.render(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);

    form.reset();

    const loginData = {
        email: formData.get("email").trim(),
        password: formData.get("password").trim(),
    };

    if (loginData.email == "") {
        return alert("All fields are required!");
    }

    if (loginData.password == "") {
        return alert("All fields are required!");
    }

    const resData = await post("/users/login", loginData);
    console.log("resData", resData);

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
