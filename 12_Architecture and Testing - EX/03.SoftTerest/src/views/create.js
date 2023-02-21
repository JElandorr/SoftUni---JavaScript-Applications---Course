import { createIdea } from "../api/data.js";

const section = document.getElementById("createPage");
const form = section.querySelector("form");
form.addEventListener("submit", onSubmit);

let innerContext = null;

export function showCreate(context) {
    innerContext = context;
    context.showSection(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const ideaData = {
        title: formData.get("title"),
        description: formData.get("description"),
        img: formData.get("imageURL"),
    };

    await createIdea(ideaData);
    form.reset();
    innerContext.goTo("/catalog");
}
