const section = document.getElementById("detailsView");

const postElement = {
    title: document.getElementById(`details-title`),
    username: document.getElementById(`details-username`),
    dateCreated: document.getElementById(`details-time`),
    post: document.getElementById(`details-content`),
};

const form = document.querySelector(".answer form");
form.addEventListener("submit", onSubmit);

const commentList = document.getElementById(`user-comment`);
section.remove();

export function showDetails(ev) {
    ev.preventDefault();

    let target = ev.target;
    console.log("ev.target", ev.target);
    if (target.tagName == "H2") {
        target = target.parentElement;
    }

    if (target.tagName == "A") {
        const postId = target.id;
        showPost(postId);
    }
}

async function showPost(postId) {
    document.querySelector("main").replaceChildren("Loading...");

    // console.log("postId", postId);

    try {
        const [responsePost, responseComments] = await Promise.all([
            fetch(`http://localhost:3030/jsonstore/collections/myboard/posts/${postId}`),
            fetch(`http://localhost:3030/jsonstore/collections/myboard/comments`),
        ]);

        if (responsePost.ok != true) {
            const errorPost = await response.json();
            throw new Error(`Error Post: ${errorPost.message}`);
        }

        if (responseComments.ok != true) {
            const errorComments = await response.json();
            throw new Error(`Error COmments: ${errorComments.message}`);
        }

        const [responsePostData, responseCommentsData] = await Promise.all([
            responsePost.json(),
            responseComments.json(),
        ]);

        console.log("responsePostData", responsePostData);
        console.log("responseCommentsData", responseCommentsData);

        commentList.replaceChildren(
            ...Object.values(responseCommentsData)
                .filter((c) => c.postId == postId)
                .map(createCommentElement)
        );

        form.id = postId;
        form.reset();

        postElement.title.textContent = responsePostData.title;
        postElement.username.textContent = responsePostData.username;
        postElement.post.textContent = responsePostData.post;
        postElement.dateCreated.textContent = responsePostData.dateCreated;
        document.querySelector("main").replaceChildren(section);
    } catch (error) {
        alert(error.message);
    }
}

async function onSubmit(event) {
    event.preventDefault();
    console.log("postId", form.id);

    const formData = new FormData(form);

    const comment = {
        username: formData.get("username").trim(),
        postText: formData.get("postText").trim(),
        postId: form.id,
        dateCreated: new Date(),
    };

    try {
        if (comment.username == "") {
            throw new Error("Username field is required!");
        }
        if (comment.postText == "") {
            throw new Error("Comment can not be empty!");
        }
        const response = await fetch(`http://localhost:3030/jsonstore/collections/myboard/comments`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(comment),
        });

        if (response.ok != true) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const resData = await response.json();
        form.reset();
        console.log("resData", resData);
        showPost(resData.postId);
    } catch (error) {
        alert(error.message);
    }
}

function createCommentElement(comment) {
    const div = document.createElement("div");
    div.className = "topic-name-wrapper";
    div.innerHTML = `
            <div class="topic-name">
                <p><strong>${comment.username}</strong> commented on <time>${comment.dateCreated}</time></p>
                <div class="post-content">
                    <p>${comment.postText}</p>
                </div>
            </div>
    `;
    return div;
}
