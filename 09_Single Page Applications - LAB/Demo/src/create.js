import { post } from "./api.js";

const section = document.getElementById("create");
const form = section.querySelector("form");
const inputFields = section.querySelectorAll("input");
form.addEventListener("submit", onSubmit);
section.remove();

let context = null;

export function showCreate(inContext) {
    context = inContext;
    context.render(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);

    form.reset();

    const userData = JSON.parse(sessionStorage.getItem("userData"));
    // console.log("userData", userData);
    // console.log("userData.id", userData.id);

    const movieData = {
        title: formData.get("title").trim(),
        img: formData.get("poster").trim(),
        description: formData.get("description").trim(),
        user: userData.id,
    };

    if (movieData.title == "" || movieData.img == "" || movieData.description == "") {
        return alert("All fields are required!");
    }

    const resData = await post("/data/movies", movieData);
    // console.log("resData", resData);

    context.goTo("catalogBtn");
}
