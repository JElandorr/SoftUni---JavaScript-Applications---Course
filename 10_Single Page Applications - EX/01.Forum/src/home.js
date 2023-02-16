import { showDetails } from "./details.js";

const section = document.getElementById("homeView");
section.querySelector("div.topic-title").addEventListener("click", showDetails);
const form = section.querySelector("form");
form.addEventListener("submit", onSubmit);
section.querySelector("[name='cancel']").addEventListener("click", clearForm);
const container = section.querySelector(".topic-container");
clearForm();
section.remove();

export async function showHome(ev) {
    ev && ev.preventDefault();
    document.querySelector("main").replaceChildren("Loading...");

    try {
        const response = await fetch("http://localhost:3030/jsonstore/collections/myboard/posts");
        if (response.ok != true) {
            const error = await response.json();
            throw new Error(error.message);
        }
        const data = await response.json();
        console.log("data", data);

        const fragment = document.createDocumentFragment();

        fragment.replaceChildren(...Object.values(data).map(createPostElement));

        container.replaceChildren(fragment);
    } catch (error) {
        alert(error.message);
    }

    document.querySelector("main").replaceChildren(section);
}

function createPostElement(post) {
    const div = document.createElement("div");
    div.className = `topic-name-wrapper`;
    div.innerHTML = `
        <div class="topic-name">
            <a href="#" class="normal" id="${post._id}">
                <h2>${post.title}</h2>
            </a>
            <div class="columns">
                <div>
                    <p>Date: <time>${post.dateCreated}</time></p>
                    <div class="nick-name">
                        <p>Username: <span>${post.username}</span></p>
                    </div>
                </div>
            </div>
        </div>
    `;
    return div;
}

async function onSubmit(ev) {
    ev.preventDefault();

    const formData = new FormData(form);

    const topic = {
        title: formData.get("topicName").trim(),
        username: formData.get("username").trim(),
        post: formData.get("postText").trim(),
        dateCreated: new Date(),
    };

    // console.log("topic", topic);

    try {
        if (topic.title == "") {
            throw new Error("A Title of you new topic is required!");
        }
        if (topic.post == "") {
            throw new Error("Post can not be empty!");
        }
        if (topic.username == "") {
            topic.username = "Anonymous";
        }

        const response = await fetch("http://localhost:3030/jsonstore/collections/myboard/posts", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(topic),
        });

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const resData = await response.json();
        console.log("resData", resData);

        clearForm();
        showHome();
    } catch (error) {
        alert(error.message);
    }
}

function clearForm() {
    form.reset();
}
