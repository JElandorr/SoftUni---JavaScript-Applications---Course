function attachEvents() {
    // console.log("TODO...");

    document.getElementById("submit").addEventListener("click", onSendMessage);
    document.getElementById("refresh").addEventListener("click", onRefreshMessages);
}

attachEvents();

const url = "http://localhost:3030/jsonstore/messenger";

async function onSendMessage() {
    const author = document.querySelector('[name="author"]');
    const content = document.querySelector('[name="content"]');

    const data = {
        author: author.value.trim(),
        content: content.value.trim(),
    };

    try {
        if (data.author == "") {
            throw new Error("Author field is required!");
        }

        if (data.content == "") {
            throw new Error("Sending an empty message is not allowed!");
        }

        const response = await fetch(url, {
            method: "post",
            headers: {
                "COntent-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = response.json();
            throw new Error(error.message);
        }

        const resData = response.json();
        // console.log("resData", resData);
        onRefreshMessages();
        author.value = "";
        content.value = "";
    } catch (error) {
        alert(error.message);
    }
}

async function onRefreshMessages() {
    const textarea = document.getElementById("messages");
    textarea.value = "";

    try {
        const response = await fetch(url);
        // console.log("response", response);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const data = await response.json();
        // console.log("data", data);

        let comments = [];

        Object.values(data).forEach((entry) => {
            comments.push(`${entry.author}: ${entry.content}`);
        });

        textarea.value = comments.join(`\n`);
    } catch (error) {
        alert(error.message);
    }
}
